
"use client"
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import paper_upload from '../../../assets/images/paper_upload.png';
import { IoClose } from 'react-icons/io5';
import imageToBase64Browser from '../../../utility/imageToBase64';
import { createKeyHealthPriorities, getKeyHealthPrioritiesDetail } from '../../../api/services/aboutUs';

const CreateKeyHealthPriorities = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  
  // Edit mode data
  const id = location.state?.id;

  // Initialize uploaded images if editing
  React.useEffect(() => {
      if (id) {
        setPageLoading(true);
        getKeyHealthPrioritiesDetail({ id: id })((res) => {
            if (res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
                const data = res.data;
                formik.setValues({
                    title: data.title || '',
                    icon: data.icon || null,
                    image: data.image || null
                });
            }
            setPageLoading(false);
        });
      }
  }, [id]);

  const formik = useFormik({
    initialValues: {
        title: '',
        icon: null,
        image: null
    },
    validationSchema: Yup.object({
        title: Yup.string().required('Title is required'),
    }),
    onSubmit: values => {
        if(!formik.values.icon) {
            toast.error("Icon is required");
            return;
        }

        if(!formik.values.image) {
            toast.error("Image is required");
            return;
        }

        setLoading(true);
        let props = {  
            title: values.title,
            icon: values.icon,
            image: values.image
        };

        if(id){
            props.id = id;
        }

        createKeyHealthPriorities(props)((res) => {
            setLoading(false);
            if (res?.status && (res?.status_code == 200 || res?.status_code == 201)) {
                toast.success(res.message);
                navigate("/about-us/key-health-priorities");
            } else {
                toast.error(res.message);
            }
        });
    }
  });    

  const handleIconChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            toast.error("Only JPG, PNG, and WEBP formats are allowed");
            return;
        }
        if (file.size > 1024 * 1024) { // 1MB limit for icon
             toast.error("Icon size should be less than 1MB");
             return;
        }
        
        try {
            const base64 = await imageToBase64Browser(URL.createObjectURL(file));
            const base64Image = `data:${file.type};base64,${base64}`;
            
            formik.setFieldValue('icon', base64Image);
        } catch (error) {
            console.error("Error converting icon:", error);
            toast.error("Error uploading icon");
        }
    }
  };

  const handleDeleteIcon = () => {
      formik.setFieldValue('icon', null);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            toast.error("Only JPG, PNG, and WEBP formats are allowed");
            return;
        }
        if (file.size > 2 * 1024 * 1024) { // 2MB limit for main image
             toast.error("Image size should be less than 2MB");
             return;
        }
        
        try {
            const base64 = await imageToBase64Browser(URL.createObjectURL(file));
            const base64Image = `data:${file.type};base64,${base64}`;
            
            formik.setFieldValue('image', base64Image);
        } catch (error) {
            console.error("Error converting image:", error);
            toast.error("Error uploading image");
        }
    }
  };

  const handleDeleteImage = () => {
      formik.setFieldValue('image', null);
  };

  return (
    <Layout>
        <Container fluid>
            <Toaster position="top-center" />
            <div className='create-activity-section'>
                    <Row>
                        <Col md={12}>
                            <div className='title-section mt-5 mb-4 d-flex align-items-center'>
                                <div className='back_btn_wrap' onClick={() => navigate("/about-us/key-health-priorities")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit Key Health Priorities" : "Create Key Health Priorities"}</h4>
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

                                        {/* Icon Upload */}
                                        <div className='col-lg-12 mb-4'>
                                            <Form.Label>Icon <span className='required'><sup>*</sup></span> <span style={{ fontSize: "12px", color: "#b9b9b9" }}>(Max 1MB)</span></Form.Label>
                                            <Form.Group className="br_border mb-3">
                                                <label htmlFor="iconInput" className="custom-file-upload-product"
                                                    style={{ cursor: formik.values.icon ? 'default' : 'pointer' }}
                                                >
                                                    <img src={paper_upload} className='upload_icon img-fluid' alt='Upload' />
                                                </label>
                                                <input
                                                    id="iconInput"
                                                    className='file_type'
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleIconChange}
                                                    disabled={!!formik.values.icon}
                                                />
                                                {formik.values.icon && (
                                                    <div className="d-flex flex-row align-items-center justify-content-start gap-3">
                                                        <div className="uploaded-images">
                                                            <div className='pos-rel'>
                                                                <img src={formik.values.icon} alt="uploaded" className="uploaded-image" style={{maxHeight: '100px', maxWidth: '100px', objectFit: 'contain', backgroundColor: "#d5d5d5"}} />
                                                                <IoClose className='icon_close' onClick={handleDeleteIcon} style={{cursor: 'pointer'}} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Form.Group>
                                            {formik.submitCount > 0 && !formik.values.icon && (
                                                <div className="text-danger small">Icon is required</div>
                                            )}
                                        </div>

                                        {/* Image Upload */}
                                        <div className='col-lg-12 mb-5'>
                                            <Form.Label>Image <span className='required'><sup>*</sup></span> <span style={{ fontSize: "12px", color: "#b9b9b9" }}>(Max 2MB)</span></Form.Label>
                                            <Form.Group className="br_border mb-3">
                                                <label htmlFor="fileInput" className="custom-file-upload-product"
                                                    style={{ cursor: formik.values.image ? 'default' : 'pointer' }}
                                                >
                                                    <img src={paper_upload} className='upload_icon img-fluid' alt='Upload' />
                                                </label>
                                                <input
                                                    id="fileInput"
                                                    className='file_type'
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    disabled={!!formik.values.image}
                                                />
                                                {formik.values.image && (
                                                    <div className="d-flex flex-row align-items-center justify-content-start gap-3">
                                                        <div className="uploaded-images">
                                                            <div className='pos-rel'>
                                                                <img src={formik.values.image} alt="uploaded" className="uploaded-image" style={{backgroundColor: "#d5d5d5"}}/>
                                                                <IoClose className='icon_close' onClick={handleDeleteImage} style={{cursor: 'pointer'}} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Form.Group>
                                            {formik.submitCount > 0 && !formik.values.image && (
                                                <div className="text-danger small">Image is required</div>
                                            )}
                                        </div>
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section mt-4'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/about-us/key-health-priorities")}
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

export default CreateKeyHealthPriorities
