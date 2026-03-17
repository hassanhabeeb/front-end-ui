"use client"
import { useFormik } from 'formik'
import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../layout';
import { createContactDetails, getContactDetailsDetail } from '../../api/services/contactDetails';
import { useState, useEffect } from 'react';

const CreateContact = () => {
    
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
        email: '',
        phone: '',
        address: ''
  });
  
  const id = location.state?.id;

  useEffect(() => {
    if (id) {
        getContactDetailsDetail({ id: id })((res) => {
            if (res?.status && res?.status_code === 200) {
                setInitialValues({
                    email: res.data.email || '',
                    phone: res.data.phone_number || '',
                    address: res.data.address || ''
                });
            }
        });
    }
  }, [id]);


  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string()
            .matches(/^(?:\+?\d{1,4})?[\s-]?(?:\(?\d{1,4}\)?[\s-]?)?[\d\s-]{5,15}$/, { message: "Enter a valid mobile number", excludeEmptyString: true })
            .required("Phone Number is required"),
        address: Yup.string().required('Address is required')
    }),
    onSubmit: values => {
        setLoading(true);
        const payload = {
            email: values.email,
            phone_number: values.phone,
            address: values.address
        }
        if (id) {
            payload.id = location.state.id;
        }

        createContactDetails(payload)((res) => {
            setLoading(false);
            if (res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
                toast.success(res.message);
                navigate("/contact");
            } else {
                toast.error(res?.message || "Something went wrong");
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
                                <div className='back_btn_wrap' onClick={() => navigate("/contact")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit Contact" : "Create Contact"}</h4>
                                </div>
                            </div>                                                    
                        </Col>
                        <Col md={12}>
                            <div className='volunteer-activity-form'>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row>                              
                                        {/* Email */}
                                        <div className="col-lg-6 mb-3">
                                            <Form.Group className="mb-3" controlId="email">
                                                <Form.Label>Email <span className='required'><sup>*</sup></span></Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter Email"
                                                    name='email'
                                                    value={formik.values?.email}
                                                    onChange={formik.handleChange}
                                                    isValid={(formik.touched.email) && !formik.errors.email}
                                                    isInvalid={(formik.touched.email || formik.submitCount > 0) && !!formik.errors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                                            </Form.Group>
                                        </div>

                                        {/* Phone Number */}
                                        <div className='col-lg-6 mb-3'>
                                            <Form.Group className="mb-3" controlId="phone">
                                                <Form.Label>Phone Number <span className='required'><sup>*</sup></span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Phone Number"
                                                    name='phone'
                                                    value={formik.values?.phone}
                                                    onChange={(e) => {
                                                        const { value } = e.target;
                                                        if (/^[\d\s-+()]*$/.test(value) || value === "") {
                                                            formik.handleChange(e);
                                                        }
                                                    }}
                                                    isValid={(formik.touched.phone) && !formik.errors.phone}
                                                    isInvalid={(formik.touched.phone || formik.submitCount > 0) && !!formik.errors.phone}
                                                />
                                                <Form.Control.Feedback type="invalid">{formik.errors.phone}</Form.Control.Feedback>
                                            </Form.Group>
                                        </div>

                                        {/* Address */}
                                        <div className='col-lg-12 mb-3'>
                                            <Form.Group className="mb-3" controlId="address">
                                                <Form.Label>Address <span className='required'><sup>*</sup></span></Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    placeholder="Enter Address"
                                                    name='address'
                                                    value={formik.values?.address}
                                                    onChange={formik.handleChange}
                                                    isValid={(formik.touched.address) && !formik.errors.address}
                                                    isInvalid={(formik.touched.address || formik.submitCount > 0) && !!formik.errors.address}
                                                />
                                                <Form.Control.Feedback type="invalid">{formik.errors.address}</Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section mt-4'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/contact")}
                                            >
                                                Cancel
                                            </Button>
                                            <Button disabled={loading} type='submit' style={{background: 'linear-gradient(92deg, #57d89e9f, #03693b)', border: "none", outline: "none", marginLeft: '15px'}} >
                                                {loading ? "Loading..." : (id ? "Update" : "Create")}
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

export default CreateContact
