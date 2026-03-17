"use client"
import { useFormik } from 'formik'
import React, { useState, useRef, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import paper_upload from '../../../assets/images/paper_upload.png'; 
import { createBannerVideo, getBannerVideoDetail } from '../../../api/services/home';


const CreateBannerVideo = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  
  // Edit mode data
  const id = location.state?.id;
  const [loading, setLoading] = useState(false);

  const [videoPreview, setVideoPreview] = useState(null);
  
  const formik = useFormik({
    initialValues: {
        title: '',
        video: null
    },
    validationSchema: Yup.object().shape({
        title: Yup.string().required('Required'),
    }),
    validate: (values) => {
        let errors = {};
        if (!id && !values.video) {
            errors.video = "Video is required";
        }
        return errors;
    },
    onSubmit: values => {
        const formData = new FormData();
        formData.append('title', values.title);
        
        if (values.video instanceof File) {
            formData.append('video', values.video);
        }

        if(id){
            formData.append('id', id);
        }

        setLoading(true);
        
        createBannerVideo(formData)(response => {
            setLoading(false);
            if(response?.status && (response?.status_code == 200 || response?.status_code == 201)){ 
                 toast.success(response?.message || (id ? "Banner Video updated successfully" : "Banner Video created successfully"));
                 navigate("/home/banner-video");
             }else{
                 toast.error(response?.message || "Something went wrong");
             }
        });
    }
  });    

  // Fetch detail for edit
  useEffect(() => {
        if (id) {
            getBannerVideoDetail({ id: id })((response) => {
                if (response?.status && (response?.status_code == 200 || response?.status_code == 201)) {
                    const data = response?.data;
                    formik.setValues({
                        title: data?.title || '',
                        video: null // Keep null, only update if user selects new file
                    });
                    if (data?.video) {
                        setVideoPreview(data?.video);
                    } else {
                        setVideoPreview(null);
                    } 
                }
            });
        }
    }, [id]);    

  // For Banner Video
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    const maxSizeInBytes = 20 * 1024 * 1024; // 20MB limit for video?
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];    

    if (file) {
        if (!validVideoTypes.includes(file.type)) {
            toast.error("Only mp4, webm, and ogg files are allowed!");
             if(fileInputRef.current) fileInputRef.current.value = "";
            return;
        }

        if (file.size > maxSizeInBytes) {
            toast.error("File size exceeds 20 MB limit", 'error');
             if(fileInputRef.current) fileInputRef.current.value = "";
            return;
        }

        formik.setFieldValue('video', file);
        setVideoPreview(URL.createObjectURL(file));
    }
  }

  const handleRemoveVideo = () => {
      setVideoPreview(null);
      formik.setFieldValue('video', null);
      if(fileInputRef.current) fileInputRef.current.value = "";
  }
  
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
                                <div className='back_btn_wrap' onClick={() => navigate("/home/banner-video")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit Banner Video" : "Create Banner Video"}</h4>
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
                                        
                                        {/* Banner Video */}
                                        <div className='col-lg-12 mb-5 mt-3'>
                                                <Form.Label>Banner Video <span className='required'><sup>*</sup></span>
                                                <span class="file-limit">(File size shouldn&apos;t exceed 20 MB)</span>
                                                </Form.Label>
                                                <Form.Group className="br_border mb-3">
                                                    {!videoPreview ? (
                                                        <>
                                                        <label htmlFor="fileInput" className="custom-file-upload-product"
                                                            style={{cursor: 'pointer'}}
                                                        >
                                                            <img src={paper_upload} className='upload_icon img-fluid' alt='Upload' />
                                                        </label>
                                                        <input
                                                            ref={fileInputRef}
                                                            id="fileInput"
                                                            className='file_type'
                                                            type="file"
                                                            accept="video/*"
                                                            onChange={handleVideoChange}
                                                        />
                                                        </>
                                                    ) : (
                                                        <div className="d-flex flex-column align-items-start justify-content-start gap-3">
                                                            <div className='pos-rel' style={{width: '100%', maxWidth: '400px', position: 'relative'}}>
                                                                <video 
                                                                    src={videoPreview} 
                                                                    className="img-fluid rounded" 
                                                                    controls
                                                                    style={{width: '100%'}}
                                                                />
                                                                <IoClose 
                                                                    className='icon_close' 
                                                                    style={{top: '10px', right: '10px', background: '#fff', borderRadius: '50%', padding: '2px', cursor: 'pointer', position: 'absolute', fontSize: '24px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', zIndex: 100}}
                                                                    onClick={handleRemoveVideo} 
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </Form.Group>
                                                <div className='invalid-feedbacks' style={{ color: '#DC3544' }}>{formik.touched.video && formik.errors.video}</div>
                                        </div> 
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/home/banner-video")}
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

export default CreateBannerVideo
