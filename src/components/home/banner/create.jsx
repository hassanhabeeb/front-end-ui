"use client"
import { useFormik } from 'formik'
import React, { useRef } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import CustomEditor from "../../blogs/customEditor";
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import { createBanner, getBannerDetail } from '../../../api/services/home';
import { useEffect } from 'react';

const CreateBanner = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  const editorRef = useRef();
  const [loading, setLoading] = React.useState(false);
  
  // Edit mode data  
  const id = location.state?.id;
   
  const formik = useFormik({
    initialValues: {
        main_title: '',
        subtitle: '',
        description: ''
    },
    validationSchema: Yup.object().shape({
        main_title: Yup.string().required('Required'),
        subtitle: Yup.string().required('Required'),
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
             // If editorRef not ready yet or empty, check values.description (if prefilled)
             // But usually we sync them. For now, rely on editorRef or alert.
             if(!ckContent) {
                 toast.error("Description required");
                 return
             }
        }
        
        let props = {  
            main_title: values?.main_title,
            subtitle: values?.subtitle,
            description: ckContent || values.description,
        };

        // console.log("PROPS ***", props);
        if(id){
          props.id = id; 
        }

        setLoading(true);
        createBanner(props)(response => {
            setLoading(false);
             if(response?.status && (response?.status_code == 200 || response?.status_code == 201)){ 
                 toast.success(response?.message || (id ? "Banner updated successfully" : "Banner created successfully"));
                 navigate("/home/banner");
             }else{
                 toast.error(response?.message || "Something went wrong");
             }
        });
    }
  });

  useEffect(() => {
        if (id) {
            getBannerDetail({ id: id })((response) => {
                if (response?.status && (response?.status_code == 200 || response?.status_code == 201)) {
                    const data = response?.data;
                    formik.setValues({
                        main_title: data?.main_title || '',
                        subtitle: data?.subtitle || '',
                        description: data?.description || ''
                    });

                    // Setting description
                    setTimeout(() => {

                        if(editorRef?.current && editorRef?.current != null && editorRef?.current != undefined){
                            editorRef.current?.setData(data?.description || "");
                        }

                    }, 1000);
                }
            });
        }
    }, [id]);
  
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
                                <div className='back_btn_wrap' onClick={() => navigate("/home/banner")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit Banner" : "Create Banner"}</h4>
                                </div>
                            </div>                                                    
                        </Col>
                        <Col md={12}>
                            <div className='volunteer-activity-form'>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row>
                                        {/* Main Title */}
                                        <div className='col-lg-6'>
                                            <Form.Group className="mb-3" controlId="mainTitle">
                                                <Form.Label>Main Title<span className='required'><sup>*</sup></span></Form.Label>
                                                <div className='input-border'>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Main Title"
                                                        name='main_title'
                                                        value={formik.values?.main_title}
                                                        onChange={formik.handleChange}
                                                        isValid={(formik.touched.main_title) && !formik.errors.main_title}
                                                        isInvalid={(formik.touched.main_title) && !!formik.errors.main_title}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.main_title}</Form.Control.Feedback>
                                                </div>
                                            </Form.Group>
                                        </div>                                    
                                        {/* Subtitle */}
                                        <div className='col-lg-6'>
                                            <Form.Group className="mb-3" controlId="subtitle">
                                                <Form.Label>Subtitle<span className='required'><sup>*</sup></span></Form.Label>
                                                <div className='input-border'>
                                                    <Form.Control
                                                        type="text"
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
                                            {/* Custom Editor */}
                                            <CustomEditor editorRef={editorRef} initialData={formik.values.description}/>                                        
                                        </div>
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/home/banner")}
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

export default CreateBanner
