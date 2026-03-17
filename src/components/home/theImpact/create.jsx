"use client"
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { IoAddCircleOutline } from 'react-icons/io5';
import { RiDeleteBin6Line } from "react-icons/ri";
import CustomEditor from "../../blogs/customEditor";
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import { createImpact, getImpactDetail } from '../../../api/services/home';

const CreateTheImpact = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  const editorRef = useRef(null);
  
  // Edit mode data
  const id = location.state?.id;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(id) {
        getImpactDetail({ id: id })((res) => {
            if(res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
                const data = res.data;
                formik.setValues({
                    subtitle: data?.subtitle || '',
                    description: data?.description || ''
                });
                
                if (editorRef.current) {
                    editorRef.current.setData(data?.description || '');
                }
            }
        });
    }
  }, [id]);

  const formik = useFormik({
    initialValues: {
        subtitle: '',
        description: ''
    },
    validationSchema: Yup.object({
        subtitle: Yup.string().required('Subtitle is required')
    }), 
    onSubmit: values => {
        const editor = editorRef.current;        
        let ckContent = "";

        if (editor?.getData()) {
            ckContent = editor?.getData();
        }
        
        if(!ckContent && !values.description){
             if(!ckContent) {
                 toast.error("Description required");
                 return
             }
        }

        let props = {  
            subtitle: values.subtitle,
            description: ckContent || values.description
        };

        if(id){
            props = {
                ...props,
                id: id
            }
        }

        setLoading(true);
        createImpact(props)((res) => {
            setLoading(false);
            if(res?.status && (res?.status_code === 200 || res?.status_code === 201)){
                toast.success(res?.message);
                navigate("/home/the-impact");
            }else{
                toast.error(res?.message);
            }
        })
    }
  });    
  
  return (
    <Layout>
        <Container fluid>
            <Toaster
                position="top-center"            
            />
            <div className='create-activity-section'>
                    <Row>
                        <Col md={12}>
                            <div className='title-section mt-5 mb-4 d-flex align-items-center'>
                                <div className='back_btn_wrap' onClick={() => navigate("/home/the-impact")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit The Impact" : "Create The Impact"}</h4>
                                </div>
                            </div>                                                    
                        </Col>
                        <Col md={12}>
                            <div className='volunteer-activity-form'>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row>                              
                                        {/* Subtitle */}
                                        <div className='col-lg-12'>
                                            <Form.Group className="mb-3" controlId="subtitle">
                                                <Form.Label>Subtitle <span className='required'><sup>*</sup></span></Form.Label>
                                                <div className='input-border'>
                                                    <Form.Control
                                                        type="text"
                                                        as={"textarea"}
                                                        rows={3}
                                                        placeholder="Subtitle"
                                                        name='subtitle'
                                                        value={formik.values?.subtitle}
                                                        onChange={formik.handleChange}
                                                        isValid={(formik.touched.subtitle) && !formik.errors.subtitle}
                                                        isInvalid={(formik.touched.subtitle) && !!formik.errors.subtitle}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.subtitle}</Form.Control.Feedback>
                                                </div>
                                            </Form.Group>
                                        </div>

                                        {/* Description  */}
                                        <div className='col-lg-12 my-3'>                                        
                                            <Form.Group>
                                                <Form.Label>Description <span className='required'><sup>*</sup></span></Form.Label>
                                            </Form.Group>
                                            <CustomEditor editorRef={editorRef} initialData={formik.values.description}/>                                                                           
                                        </div>
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section mt-4'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/home/the-impact")}
                                            >
                                                Cancel
                                            </Button>
                                            <Button type='submit' disabled={loading} style={{background: 'linear-gradient(92deg, #57d89e9f, #03693b)', border: "none", outline: "none", marginLeft: '15px'}} >
                                                {loading ? "Loading..." : id ? "Update" : "Create"}
                                            </Button>
                                        </div>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
            </div>
        </Container>
    </Layout>
  )
}

export default CreateTheImpact
