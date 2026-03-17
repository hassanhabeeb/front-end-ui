
"use client"
import { useFormik } from 'formik'
import React, { useRef, useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import CustomEditor from '../../blogs/customEditor';
import paper_upload from '../../../assets/images/paper_upload.png';
import { IoClose } from 'react-icons/io5';
import imageToBase64Browser from '../../../utility/imageToBase64';
import { createOurAnswer, getOurAnswerDetail } from '../../../api/services/aboutUs';

const CreateOurAnswer = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  const subtitleEditorRef = useRef(null);
  const descriptionEditorRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  
  // Edit mode data
  const id = location.state?.id;

  // Initialize uploaded image if editing
  useEffect(() => {
      if (id) {
        setPageLoading(true);
        getOurAnswerDetail({ id: id })((res) => {
            if (res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
                const data = res.data;
                formik.setValues({
                    title: data.title || '',
                    subtitle: data.subtitle || '',
                    description: data.description || '',
                    image: data.image || null
                });
                setUploadedImage(data.image);

                if (subtitleEditorRef.current) {
                    subtitleEditorRef.current.setData(data.subtitle || '');
                }
                if (descriptionEditorRef.current) {
                    descriptionEditorRef.current.setData(data.description || '');
                }
            }
            setPageLoading(false);
        });
      }
  }, [id]);

  const formik = useFormik({
    initialValues: {
        title: '',
        subtitle: '',
        description: '',
        image: null
    },
    validationSchema: Yup.object({
        title: Yup.string().required('Title is required'),
        // Subtitle, Description, and Image are handled manually/via refs
    }),
    onSubmit: values => {
        let subtitleData = "";
        if (subtitleEditorRef.current) {
            subtitleData = subtitleEditorRef.current.getData();
        }

        let descriptionData = "";
        if (descriptionEditorRef.current) {
            descriptionData = descriptionEditorRef.current.getData();
        }

        if(!subtitleData) {
            toast.error("Subtitle is required");
            return;
        }

        if(!formik.values.image) {
            toast.error("Image is required");
            return;
        }

        if(!descriptionData) {
            toast.error("Description is required");
            return;
        }

        setLoading(true);
        let props = {  
            title: values.title,
            subtitle: subtitleData,
            description: descriptionData,
            image: values.image
        };

        if(id){
            props.id = id;
        }

        createOurAnswer(props)((res) => {
            setLoading(false);
            if (res?.status && (res?.status_code == 200 || res?.status_code == 201)) {
                toast.success(res.message);
                navigate("/about-us/our-answer");
            } else {
                toast.error(res.message);
            }
        });
    }
  });    

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 2 * 1024 * 1024) { // 2MB limit
             toast.error("File size should be less than 2MB");
             return;
        }
        
        try {
            const base64 = await imageToBase64Browser(URL.createObjectURL(file));
            const base64Image = `data:${file.type};base64,${base64}`;
            
            setUploadedImage(base64Image);
            formik.setFieldValue('image', base64Image);
        } catch (error) {
            console.error("Error converting image:", error);
            toast.error("Error uploading image");
        }
    }
  };

  const handleDeleteImage = () => {
      setUploadedImage(null);
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
                                <div className='back_btn_wrap' onClick={() => navigate("/about-us/our-answer")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit Our Answer" : "Create Our Answer"}</h4>
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

                                        {/* Subtitle CKEditor */}
                                        <div className='col-lg-12 mb-4'>
                                            <Form.Group className="mb-3" controlId="subtitle">
                                                <Form.Label>Subtitle <span className='required'><sup>*</sup></span></Form.Label>
                                                <CustomEditor editorRef={subtitleEditorRef} initialData={formik.values.subtitle}/>
                                            </Form.Group>
                                        </div>

                                        {/* Image Upload */}
                                        <div className='col-lg-12 mb-5'>
                                            <Form.Label>Image <span className='required'><sup>*</sup></span> (Max 2MB)</Form.Label>
                                            <Form.Group className="br_border mb-3">
                                                <label htmlFor="fileInput" className="custom-file-upload-product"
                                                    style={{ cursor: uploadedImage ? 'default' : 'pointer' }}
                                                >
                                                    <img src={paper_upload} className='upload_icon img-fluid' alt='Upload' />
                                                </label>
                                                <input
                                                    id="fileInput"
                                                    className='file_type'
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    disabled={!!uploadedImage}
                                                />
                                                {uploadedImage && (
                                                    <div className="d-flex flex-row align-items-center justify-content-start gap-3">
                                                        <div className="uploaded-images">
                                                            <div className='pos-rel'>
                                                                <img src={uploadedImage} alt="uploaded" className="uploaded-image" />
                                                                <IoClose className='icon_close' onClick={handleDeleteImage} style={{cursor: 'pointer'}} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Form.Group>
                                            {formik.submitCount > 0 && !uploadedImage && (
                                                <div className="text-danger small">Image is required</div>
                                            )}
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
                                                onClick={() => navigate("/about-us/our-answer")}
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

export default CreateOurAnswer
