"use client"
import { useFormik } from 'formik'
import React, { useRef, useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import CustomEditor from "../../blogs/customEditor";
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import { createAbout, getAboutDetail } from '../../../api/services/home';

const CreateAbout = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  
  // Edit mode data
  const id = location.state?.id;

  useEffect(() => {
    if(id) {
        setLoading(true);
        getAboutDetail({ id: id })((res) => {
            setLoading(false);
            if(res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
                const data = res.data;
                formik.setValues({
                    title: data?.title || '',
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
        title: '',
        description: ''
    },
    validationSchema: Yup.object().shape({
        title: Yup.string().required('Required'),
    }),
    validate: (values) =>{
        let errors = {};
        return errors;
    },
    onSubmit: values => {
        const editor=editorRef.current;        
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
            title: values?.title,
            description: ckContent || values.description,
        };

        if(id){
            props.id = id;
        }

        setLoading(true);
        createAbout(props)((response) => {
            setLoading(false);
            if (response?.status && (response?.status_code == 200 || response?.status_code == 201)) {
                toast.success(response?.message || (id ? "About updated successfully" : "About created successfully"));
                navigate("/home/about");
            } else {
                toast.error(response?.message || "Something went wrong");
            }
        });
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
                                <div className='back_btn_wrap' onClick={() => navigate("/home/about")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit About" : "Create About"}</h4>
                                </div>
                            </div>                                                    
                        </Col>
                        <Col md={12}>
                            <div className='volunteer-activity-form'>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row>
                                        {/* Title */}
                                        <div className='col-lg-6'>
                                            <Form.Group className="mb-3" controlId="title">
                                                <Form.Label>Title<span className='required'><sup>*</sup></span></Form.Label>
                                                <div className='input-border'>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Title"
                                                        name='title'
                                                        value={formik.values?.title}
                                                        onChange={formik.handleChange}
                                                        isValid={(formik.touched.title) && !formik.errors.title}
                                                        isInvalid={(formik.touched.title) && !!formik.errors.title}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
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
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/home/about")}
                                            >
                                                Cancel
                                            </Button>
                                            <Button disabled={loading} type='submit' style={{background: 'linear-gradient(92deg, #57d89e9f, #03693b)', border: "none", outline: "none", marginLeft: '15px'}} >
                                                {loading ? "Loading..." : <>{id ? "Update" : "Create"}</>}
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

export default CreateAbout
