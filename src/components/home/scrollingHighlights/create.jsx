"use client"
import { useFormik } from 'formik'
import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import { createScrollingHighlights, getScrollingHighlightsDetail } from '../../../api/services/home';
import { useEffect, useState } from 'react';

const CreateScrollingHighlights = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  
  // Edit mode data  
  const id = location.state?.id;
  const [loading, setLoading] = useState(false);
  
  const formik = useFormik({
    initialValues: {
        title: '',
    },
    validationSchema: Yup.object().shape({
        title: Yup.string().required('Required'),
    }),
    onSubmit: values => {
        let props = {  
            title: values?.title,
        };

        if(id){
            props.id = id;
        }

        setLoading(true);
        createScrollingHighlights(props)(response => {
            setLoading(false);
            if(response?.status && (response?.status_code == 200 || response?.status_code == 201)){ 
                 toast.success(response?.message || (id ? "Scrolling Highlight updated successfully" : "Scrolling Highlight created successfully"));
                 navigate("/home/scrolling-highlights");
             }else{
                 toast.error(response?.message || "Something went wrong");
             }
        });
    }
  });    

  useEffect(() => {
        if (id) {
            getScrollingHighlightsDetail({ id: id })((response) => {
                if (response?.status && (response?.status_code == 200 || response?.status_code == 201)) {
                    const data = response?.data;
                    formik.setValues({
                        title: data?.title || '',
                    });
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
                                <div className='back_btn_wrap' onClick={() => navigate("/home/scrolling-highlights")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit Scrolling Highlight" : "Create Scrolling Highlight"}</h4>
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
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/home/scrolling-highlights")}
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

export default CreateScrollingHighlights
