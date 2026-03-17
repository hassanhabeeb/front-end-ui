
"use client"
import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import CustomEditor from '../../blogs/customEditor';

import { createOurApproach, getOurApproachDetail } from '../../../api/services/aboutUs';

const CreateOurApproach = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  const descriptionEditorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  
  // Edit mode data
  const id = location.state?.id;

  // Initialize data if editing
  React.useEffect(() => {
      if (id) {
        setPageLoading(true);
        getOurApproachDetail({ id: id })((res) => {
            if (res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
                const data = res.data;
                formik.setValues({
                    title: data.title || '',
                    description: data.description || ''
                });
            }
            setPageLoading(false);
        });
      }
  }, [id]);

  const formik = useFormik({
    initialValues: {
        title: '',
        description: ''
    },
    validationSchema: Yup.object({
        title: Yup.string().required('Title is required')
    }),
    onSubmit: values => {
        let descriptionData = "";
        if (descriptionEditorRef.current) {
            descriptionData = descriptionEditorRef.current.getData();
        }

        if(!descriptionData) {
            toast.error("Description is required");
            return;
        }

        setLoading(true);
        let props = {  
            title: values.title,
            description: descriptionData
        };

        if(id){
            props.id = id;
        }

        createOurApproach(props)((res) => {
            setLoading(false);
            if (res?.status && (res?.status_code == 200 || res?.status_code == 201)) {
                toast.success(res.message);
                navigate("/about-us/our-approach");
            } else {
                toast.error(res.message);
            }
        });
    }
  });    

  return (
    <Layout>
        <Container fluid>
            <Toaster position="top-center" />
            <div className='create-activity-section'>
                    <Row>
                        <Col md={12}>
                            <div className='title-section mt-5 mb-4 d-flex align-items-center'>
                                <div className='back_btn_wrap' onClick={() => navigate("/about-us/our-approach")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit Our Approach" : "Create Our Approach"}</h4>
                                </div>
                            </div>                                                    
                        </Col>
                        <Col md={12}>
                            <div className='volunteer-activity-form'>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row>                              
                                        {/* Title */}
                                        <div className='col-lg-12 mb-3'>
                                            <Form.Group className="mb-3" controlId="title">
                                                <Form.Label>Title <span className='required'><sup>*</sup></span></Form.Label>
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
                                            </Form.Group>
                                        </div>

                                        {/* Description CKEditor */}
                                        <div className='col-lg-12 mb-4'>
                                            <Form.Group className="mb-3" controlId="description">
                                                <Form.Label>Description <span className='required'><sup>*</sup></span></Form.Label>
                                                <CustomEditor editorRef={descriptionEditorRef} initialData={formik.values.description}/>
                                            </Form.Group>
                                        </div>
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section mt-4'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/about-us/our-approach")}
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

export default CreateOurApproach
