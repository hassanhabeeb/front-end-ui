"use client"
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import paper_upload from '../../../assets/images/paper_upload.png'; 
import { createImplementedBy, getImplementedByDetail } from '../../../api/services/ourImpact';

const CreateImplementedBy = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  
  // Edit mode data
  const id = location.state?.id;
  const [initialValues, setInitialValues] = useState({
      title: '',
      logo: null,
      preview: null,
  });

  useEffect(() => {
      if (id) {
          getImplementedByDetail({ id: id })((res) => {
              if (res?.status && (res?.status_code == 200 || res?.status_code == 201)) {
                  let data = res.data;
                  setInitialValues({
                      title: data.title || '',
                      logo: data.logo || null,
                      preview: data.logo || null,
                  });
              }
          });
      }
  }, [id]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
        title: Yup.string().required('Title is required'),
        // Logo validation is custom below
    }),
    validate: (values) => {
        let errors = {};
        if (!values.logo && !values.preview) {
             errors.logo = "Logo is required";
        }
        return errors;
    },
    onSubmit: async (values) => {
        setLoading(true);

        const toBase64 = (file) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

        let logoBase64 = values.logo;
        if (values.logo instanceof File) {
            logoBase64 = await toBase64(values.logo);
        }

        let payload = {
            title: values.title,
            logo: logoBase64,
        };

        if (id) {
            payload.id = id;
        }

        createImplementedBy(payload)((res) => {
            setLoading(false);
            if (res?.status && (res?.status_code == 200 || res?.status_code == 201)) {
                toast.success(res.message);
                navigate("/our-impact/implemented-by");
            } else {
                toast.error(res.message);
            }
        });
    }
  });    

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
            toast.error("Only jpeg, png, jpg, webp files are allowed!");
            return;
        }
        if (file.size > 2 * 1024 * 1024) { // 2MB
            toast.error("File size exceeds 2 MB");
            return;
        }

        formik.setFieldValue('logo', file);
        formik.setFieldValue('preview', URL.createObjectURL(file));
        formik.setFieldError('logo', null);
    }
  };

  // Handle remove image
  const handleRemoveImage = () => {
    formik.setFieldValue('logo', null);
    formik.setFieldValue('preview', null);
  };
  
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
                                <div className='back_btn_wrap' onClick={() => navigate("/our-impact/implemented-by")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit Implemented By" : "Create Implemented By"}</h4>
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

                                        {/* Logo Upload */}
                                        <div className='col-lg-12 mt-3'>
                                            <Form.Label>Logo <span className='required'><sup>*</sup></span>
                                            <span className="file-limit"> (Max 2MB)</span>
                                            </Form.Label>
                                            <Form.Group className="br_border mb-3">
                                                {!formik.values.preview ? (
                                                    <>
                                                    <label htmlFor="fileInput" className="custom-file-upload-product" style={{cursor: 'pointer'}}>
                                                        <img src={paper_upload} className='upload_icon img-fluid' alt='Upload' />
                                                    </label>
                                                    <input
                                                        id="fileInput"
                                                        className='file_type'
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                    />
                                                    </>
                                                ) : (
                                                    <div className="d-flex flex-column align-items-start justify-content-start gap-3">
                                                        <div className='pos-rel' style={{width: '100px', height: '100px', position: 'relative'}}>
                                                            <img 
                                                                src={formik.values.preview} 
                                                                className="img-fluid rounded" 
                                                                alt="Preview"
                                                                style={{width: '100%', height: '100%', objectFit: 'contain'}}
                                                            />
                                                            <IoClose 
                                                                className='icon_close' 
                                                                style={{top: '-8px', right: '-8px', background: '#fff', borderRadius: '50%', padding: '2px', cursor: 'pointer', position: 'absolute', fontSize: '18px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)'}}
                                                                onClick={handleRemoveImage} 
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </Form.Group>
                                            {formik.submitCount > 0 && formik.errors.logo && (
                                                <div className="text-danger small mt-1">
                                                    {formik.errors.logo}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section mt-4'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/our-impact/implemented-by")}
                                            >
                                                Cancel
                                            </Button>
                                            <Button type='submit' disabled={loading} style={{background: 'linear-gradient(92deg, #57d89e9f, #03693b)', border: "none", outline: "none", marginLeft: '15px'}} >
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

export default CreateImplementedBy
