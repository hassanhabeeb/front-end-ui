"use client"
import { useFormik } from 'formik'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../layout';
import { createFooter, getFooterDetail } from '../../api/services/footer';
import { useState, useEffect } from 'react';

const CreateFooter = () => {
    
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
        description: ''
  });
  
  const id = location.state?.id;

  useEffect(() => {
    if (id) {
        getFooterDetail({ id: id })((res) => {
            if (res?.status && res?.status_code === 200) {
                setInitialValues({
                    description: res.data.description || ''
                });
            }
        });
    }
  }, [id]);


  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
        description: Yup.string().required('Description is required')
    }),
    onSubmit: values => {
        setLoading(true);
        const payload = {
            description: values.description
        }
        if (id) {
            payload.id = id;
        }

        createFooter(payload)((res) => {
            setLoading(false);
            if (res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
                toast.success(res.message);
                navigate("/footer");
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
                                <div className='back_btn_wrap' onClick={() => navigate("/footer")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit Footer" : "Create Footer"}</h4>
                                </div>
                            </div>                                                    
                        </Col>
                        <Col md={12}>
                            <div className='volunteer-activity-form'>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row>                              
                                        {/* Description */}
                                        <div className='col-lg-12 mb-3'>
                                            <Form.Group className="mb-3" controlId="description">
                                                <Form.Label>
                                                    Description <span className='required'><sup>*</sup></span>
                                                </Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={6}
                                                    placeholder="Enter footer description..."
                                                    name='description'
                                                    value={formik.values?.description}
                                                    onChange={formik.handleChange}
                                                    isValid={(formik.touched.description) && !formik.errors.description}
                                                    isInvalid={(formik.touched.description || formik.submitCount > 0) && !!formik.errors.description}
                                                    style={{ resize: 'vertical', minHeight: '150px' }}
                                                />
                                                <Form.Control.Feedback type="invalid">{formik.errors.description}</Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section mt-4'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/footer")}
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

export default CreateFooter
