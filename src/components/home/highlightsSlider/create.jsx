"use client"
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import paper_upload from '../../../assets/images/paper_upload.png';
import { IoClose } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import { createHighlightsSlider, getHighlightsSliderDetail } from '../../../api/services/home';

const CreateHighlightsSlider = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  
  const id = location.state?.id; 
  
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
        title: '',
        image: null
    },
    validationSchema: Yup.object({
        title: Yup.string()
            .required('Title is required')            
            .max(10, 'Title cannot exceed 10 characters')
    }),
    validate: (values) => {
        let errors = {};
        if (!values.image && !preview) {
            errors.image = "Image is required";
        }
        return errors;
    },
    onSubmit: async (values) => {
        let props = {  
            title: values.title,
        };

        setLoading(true);

        const fileToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        };

        try {
            if (values.image instanceof File) {
                props.image = await fileToBase64(values.image);
            } else if (typeof values.image === 'string') {
                 // Already a string (url or base64)
                 props.image = values.image;
            } else if (id && !values.image && preview) {                
                props.image = preview;
            }

            if (id) {
                props.id = id;
            }

            createHighlightsSlider(props)((response) => {
                setLoading(false);
                if (response?.status && (response?.status_code == 200 || response?.status_code == 201)) {
                    toast.success(response?.message || (id ? "Entry updated successfully" : "Entry created successfully"));
                    navigate("/home/highlights-slider");
                } else {
                    toast.error(response?.message || "Something went wrong");
                }
            });
        } catch (error) {
             setLoading(false);
             console.error("Error submitting form:", error);
             toast.error("Failed to submit form");
        }
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

        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
             if (img.width < 1300 || img.height < 700) {
                toast.error("Image dimensions must be at least 1300x700 px");
             } else {
                 formik.setFieldValue('image', file);
                 setPreview(URL.createObjectURL(file));
             }
        };
    }
  };

  const handleRemoveImage = () => {
      formik.setFieldValue('image', null);
      setPreview(null);
  }

  useEffect(() => {
    if (id) {
        // If we have ID but no passed data (e.g. refresh), fetch details
        setLoading(true);
        getHighlightsSliderDetail({ id: id })((response) => {
            setLoading(false);
            if (response?.status && (response?.status_code == 200 || response?.status_code == 201)) {
                const data = response?.data;
                formik.setValues({
                    title: data?.title || '',
                    image: null // We don't set file object here
                });
                setPreview(data?.image || null);
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
                                <div className='back_btn_wrap' onClick={() => navigate("/home/highlights-slider")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit Highlight" : "Create Highlight"}</h4>
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
                                                <div className='input-border'>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter title (max 10 alphabets)"
                                                        name='title'
                                                        value={formik.values?.title}
                                                        maxLength={10}
                                                        onChange={(e) => {
                                                            const onlyAlphabets = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                                            formik.setFieldValue('title', onlyAlphabets);
                                                        }}
                                                        isValid={(formik.touched.title) && !formik.errors.title}
                                                        isInvalid={(formik.touched.title) && !!formik.errors.title}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
                                                </div>
                                            </Form.Group>
                                        </div>

                                        {/* Image Upload */}
                                        <Col lg={6}>
                                            <Form.Label>Image <span className='required'><sup>*</sup></span>
                                            <span class="file-limit"> (Max 2MB)</span>
                                            </Form.Label>
                                            <Form.Group className="br_border mb-3">
                                                {!preview ? (
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
                                                                src={preview} 
                                                                className="img-fluid rounded" 
                                                                alt="Preview"
                                                                style={{width: '100%', height: '100%', objectFit: 'cover'}}
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
                                            {formik.submitCount > 0 && formik.errors.image && (
                                                <div className="text-danger small mt-1">
                                                    {formik.errors.image}
                                                </div>
                                            )}
                                        </Col>
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section mt-4'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/home/highlights-slider")}
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

export default CreateHighlightsSlider
