"use client"
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import { createStats, getStatsDetail } from '../../../api/services/ourImpact';

const CreateStats = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  
  // Edit mode data
  const id = location.state?.id;
  
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
        name: '',
        prefix: '',
        value: '',
        suffix: '',
  });

  useEffect(() => {
    if (id) {
        getStatsDetail({ id: id })((response) => {
            if (response?.status && response?.status_code === 200) {
                const data = response.data;
                setInitialValues({
                    name: data.stats_name || '',
                    prefix: data.prefix || '',
                    value: data.value || '',
                    suffix: data.suffix || '',
                });
            }
        });
    }
  }, [id]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
        name: Yup.string().required('Name is required'),
        value: Yup.number().typeError('Must be a number').required('Value is required'),
    }),
    onSubmit: values => {
        setLoading(true);
        let payload = {  
            stats_name: values.name,
            prefix: values.prefix,
            value: values.value,
            suffix: values.suffix,
        };

        if(id){
            payload.id = id;
        }

        createStats(payload)((res) => {
            setLoading(false);
            if (res?.status && (res?.status_code == 200 || res?.status_code == 201)) {
                toast.success(res.message);
                navigate("/our-impact/stats");
            } else {
                toast.error(res.message);
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
                                <div className='back_btn_wrap' onClick={() => navigate("/our-impact/stats")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit Stats" : "Create Stats"}</h4>
                                </div>
                            </div>                                                    
                        </Col>
                        <Col md={12}>
                            <div className='volunteer-activity-form'>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row>                              
                                        {/* Name */}
                                        <div className='col-lg-12'>
                                            <Form.Group className="mb-3" controlId="name">
                                                <Form.Label>Name <span className='required'><sup>*</sup></span></Form.Label>
                                                <Form.Control
                                                        type="text"
                                                        placeholder="Name"
                                                        name='name'
                                                        value={formik.values?.name}
                                                        onChange={formik.handleChange}
                                                        isValid={(formik.touched.name) && !formik.errors.name}
                                                        isInvalid={(formik.touched.name) && !!formik.errors.name}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                                            </Form.Group>
                                        </div>

                                        <div className='col-lg-12'>
                                            <Form.Label>Stats Value</Form.Label>
                                            <Row>
                                                {/* Prefix */}
                                                <div className='col-lg-4'>
                                                    <Form.Group className="mb-3" controlId="prefix">
                                                        <Form.Control
                                                                type="text"
                                                                placeholder="Prefix (eg: $)"
                                                                name='prefix'
                                                                value={formik.values?.prefix}
                                                                onChange={formik.handleChange}
                                                            />
                                                    </Form.Group>
                                                </div>
                                                {/* Value */}
                                                <div className='col-lg-4'>
                                                    <Form.Group className="mb-3" controlId="value">
                                                        <Form.Control
                                                                type="text"
                                                                placeholder="Value (eg: 100)"
                                                                name='value'
                                                                value={formik.values?.value}
                                                                onChange={formik.handleChange}
                                                                isValid={(formik.touched.value) && !formik.errors.value}
                                                                isInvalid={(formik.touched.value) && !!formik.errors.value}
                                                            />
                                                            <Form.Control.Feedback type="invalid">{formik.errors.value}</Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                                {/* Suffix */}
                                                <div className='col-lg-4'>
                                                    <Form.Group className="mb-3" controlId="suffix">
                                                        <Form.Control
                                                                type="text"
                                                                placeholder="Suffix (eg: % or +)"
                                                                name='suffix'
                                                                value={formik.values?.suffix}
                                                                onChange={formik.handleChange}
                                                            />
                                                    </Form.Group>
                                                </div>
                                            </Row>
                                        </div>
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section mt-4'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/our-impact/stats")}
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

export default CreateStats
