"use client"
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import { createSteps, getStepsDetail } from '../../../api/services/ourImpact';

const CreateSteps = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  
  // Edit mode data
  const id = location.state?.id;  

  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
        step1: '',
        step2: '',
        step3: '',
        step4: '',
        step5: '',
        step6: '',
  });

  useEffect(() => {
    if (id) {
        getStepsDetail({ id: id })((response) => {
            if (response?.status && response?.status_code === 200) {
                const data = response.data;
                setInitialValues({
                    step1: data.step_1 || '',
                    step2: data.step_2 || '',
                    step3: data.step_3 || '',
                    step4: data.step_4 || '',
                    step5: data.step_5 || '',
                    step6: data.step_6 || '',
                });
            }
        });
    }
  }, [id]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
        step1: Yup.string().required('Step 1 is required'),
        step2: Yup.string().required('Step 2 is required'),
        step3: Yup.string().required('Step 3 is required'),
        step4: Yup.string().required('Step 4 is required'),
        step5: Yup.string().required('Step 5 is required'),
        step6: Yup.string().required('Step 6 is required'),
    }),
    onSubmit: values => {
        setLoading(true);
        let payload = {  
            step_1: values.step1,
            step_2: values.step2,
            step_3: values.step3,
            step_4: values.step4,
            step_5: values.step5,
            step_6: values.step6,
        };

        if(id){
            payload.id = id;
        }

        createSteps(payload)((res) => {
            setLoading(false);
            if (res?.status && (res?.status_code == 200 || res?.status_code == 201)) {
                toast.success(res.message);
                navigate("/our-impact/steps");
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
                                <div className='back_btn_wrap' onClick={() => navigate("/our-impact/steps")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit Steps" : "Create Steps"}</h4>
                                </div>
                            </div>                                                    
                        </Col>
                        <Col md={12}>
                            <div className='volunteer-activity-form'>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row>                              
                                        {/* Step 1 */}
                                        <div className='col-lg-6'>
                                            <Form.Group className="mb-4" controlId="step1">
                                                <Form.Label>Step 1 <span className='required'><sup>*</sup></span></Form.Label>
                                                <Form.Control
                                                        type="text"
                                                        placeholder="Value"
                                                        name='step1'
                                                        value={formik.values?.step1}
                                                        onChange={formik.handleChange}
                                                        isValid={(formik.touched.step1) && !formik.errors.step1}
                                                        isInvalid={(formik.touched.step1) && !!formik.errors.step1}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.step1}</Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        {/* Step 2 */}
                                        <div className='col-lg-6'>
                                            <Form.Group className="mb-4" controlId="step2">
                                                <Form.Label>Step 2 <span className='required'><sup>*</sup></span></Form.Label>
                                                <Form.Control
                                                        type="text"
                                                        placeholder="Value"
                                                        name='step2'
                                                        value={formik.values?.step2}
                                                        onChange={formik.handleChange}
                                                        isValid={(formik.touched.step2) && !formik.errors.step2}
                                                        isInvalid={(formik.touched.step2) && !!formik.errors.step2}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.step2}</Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        {/* Step 3 */}
                                        <div className='col-lg-6'>
                                            <Form.Group className="mb-4" controlId="step3">
                                                <Form.Label>Step 3 <span className='required'><sup>*</sup></span></Form.Label>
                                                <Form.Control
                                                        type="text"
                                                        placeholder="Value"
                                                        name='step3'
                                                        value={formik.values?.step3}
                                                        onChange={formik.handleChange}
                                                        isValid={(formik.touched.step3) && !formik.errors.step3}
                                                        isInvalid={(formik.touched.step3) && !!formik.errors.step3}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.step3}</Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        {/* Step 4 */}
                                        <div className='col-lg-6'>
                                            <Form.Group className="mb-4" controlId="step4">
                                                <Form.Label>Step 4 <span className='required'><sup>*</sup></span></Form.Label>
                                                <Form.Control
                                                        type="text"
                                                        placeholder="Value"
                                                        name='step4'
                                                        value={formik.values?.step4}
                                                        onChange={formik.handleChange}
                                                        isValid={(formik.touched.step4) && !formik.errors.step4}
                                                        isInvalid={(formik.touched.step4) && !!formik.errors.step4}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.step4}</Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        {/* Step 5 */}
                                        <div className='col-lg-6'>
                                            <Form.Group className="mb-4" controlId="step5">
                                                <Form.Label>Step 5 <span className='required'><sup>*</sup></span></Form.Label>
                                                <Form.Control
                                                        type="text"
                                                        placeholder="Value"
                                                        name='step5'
                                                        value={formik.values?.step5}
                                                        onChange={formik.handleChange}
                                                        isValid={(formik.touched.step5) && !formik.errors.step5}
                                                        isInvalid={(formik.touched.step5) && !!formik.errors.step5}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.step5}</Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        {/* Step 6 */}
                                        <div className='col-lg-6'>
                                            <Form.Group className="mb-4" controlId="step6">
                                                <Form.Label>Step 6 <span className='required'><sup>*</sup></span></Form.Label>
                                                <Form.Control
                                                        type="text"
                                                        placeholder="Value"
                                                        name='step6'
                                                        value={formik.values?.step6}
                                                        onChange={formik.handleChange}
                                                        isValid={(formik.touched.step6) && !formik.errors.step6}
                                                        isInvalid={(formik.touched.step6) && !!formik.errors.step6}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.step6}</Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section mt-4'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/our-impact/steps")}
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

export default CreateSteps
