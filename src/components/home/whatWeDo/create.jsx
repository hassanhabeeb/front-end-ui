"use client"
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { IoClose, IoAddCircleOutline } from 'react-icons/io5';
import { RiDeleteBin6Line } from "react-icons/ri";

import CustomEditor from "../../blogs/customEditor";
import { createWhatWeDo, getWhatWeDoDetail } from '../../../api/services/home';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import paper_upload from '../../../assets/images/paper_upload.png'; 

const CreateWhatWeDo = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  
  // Edit mode data
  const id = location.state?.id;

  const formik = useFormik({
    initialValues: {
        title: '',
        description: '',
        image_data: [{ title: '', image: null, preview: null }]
    },
    validationSchema: Yup.object().shape({
        title: Yup.string().required('Required'),
    }),
    validate: (values) =>{
        let errors = {};
        if (!values.image_data || values.image_data.length === 0) {
            errors.image_data = "At least one image is required";
        } else {
             const imageErrors = [];
             values.image_data.forEach((group, index) => {
                 const groupErrors = {};
                 if (!group.title || !group.title.trim()) {
                     groupErrors.title = 'Title is required';
                 }
                 if (!group.image && !group.preview) {
                     groupErrors.image = 'Image is required';
                 }
                 if (Object.keys(groupErrors).length > 0) {
                     imageErrors[index] = groupErrors;
                 }
             });
             if (imageErrors.length > 0) {
                 errors.image_data = imageErrors;
             }
        }
        return errors;
    },
    onSubmit: async (values) => {
        const editor = editorRef.current;
        let ckContent = "";

        if (editor?.getData()) {
            ckContent = editor?.getData();
        }

        if (!ckContent && !values.description) {
            if (!ckContent) {
                toast.error("Description required");
                return;
            }
        }

        setLoading(true);

        // Helper to read file as Base64
        const fileToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        };

        try {
            const images = await Promise.all(
                (values.image_data || []).map(async (group, index) => {
                    let imageContent = group.image;
                    if (group.image instanceof File) {
                        imageContent = await fileToBase64(group.image);
                    }

                    // For existing images, group.image matches the URL string or null
                    // If it's a new upload, it's now a base64 string
                    // Ensure we have a string if required

                    const imageObj = {
                        image_title: group.title,
                        image: imageContent // This will be the base64 string or the existing URL
                    };

                    if (group.id) {
                        imageObj.id = group.id;
                    }

                    return imageObj;
                })
            );

            // Payload construction matches:
            // {
            //   "title": "string",
            //   "description": "string",
            //   "images": [
            //     {
            //       "image_title": "string",
            //       "image": "string"
            //     }
            //   ]
            // }
            // Only include 'id' fields if updating

            const payload = {
                title: values.title,
                description: ckContent || values.description,
                images: images
            };

            if (id) {
                payload.id = parseInt(id);
            }

            createWhatWeDo(payload)((res) => {
                setLoading(false);
                if (res?.status && (res?.status_code == 200 || res?.status_code == 201)) {
                    toast.success(res?.message || (id ? "Entry updated successfully" : "Entry created successfully"));
                    navigate("/home/what-we-do");
                } else {
                    toast.error(res?.message || "Something went wrong");
                }
            });

        } catch (error) {
            console.error("Error preparing payload:", error);
            setLoading(false);
            toast.error("Failed to process images.");
        }
    }
  });

  useEffect(() => {
    if (id) {
        getWhatWeDoDetail({ id })(response => {
            if (response?.status && (response?.status_code === 200 || response?.status_code === 201)) {
                const data = response.data;
                formik.setValues({
                    title: data.title || '',
                    description: data.description || '',
                    image_data: data.images ? data.images.map(img => ({
                        id: img.id,
                        title: img.image_title || '',
                        image: img.image || null,
                        preview: img.image || null
                    })) : [{ title: '', image: null, preview: null }]
                });
            }
        });
    }
  }, [id]);    

  // Handle adding new image group
  const handleAddImageGroup = () => {
      const newGroup = { title: '', image: null, preview: null };
      formik.setFieldValue('image_data', [...formik.values.image_data, newGroup]);
  };

  // Handle removing image group
  const handleRemoveImageGroup = (index) => {
      const updatedGroups = formik.values.image_data.filter((_, i) => i !== index);
      formik.setFieldValue('image_data', updatedGroups);
  };

  // Handle image title change
  const handleImageTitleChange = (e, index) => {
      const { value } = e.target;
      const updatedGroups = [...formik.values.image_data];
      updatedGroups[index].title = value;
      formik.setFieldValue('image_data', updatedGroups);
  };

  // Handle image file change
  const handleImageChange = (e, index) => {
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

        const updatedGroups = [...formik.values.image_data];
        updatedGroups[index].image = file;
        updatedGroups[index].preview = URL.createObjectURL(file);
        formik.setFieldValue('image_data', updatedGroups);
        
        // Clear error if exists (optional, validate runs automatically)
    }
  };

  // Handle remove image from group
  const handleRemoveImage = (index) => {
    const updatedGroups = [...formik.values.image_data];
    updatedGroups[index].image = null;
    updatedGroups[index].preview = null;
    formik.setFieldValue('image_data', updatedGroups);
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
                                <div className='back_btn_wrap' onClick={() => navigate("/home/what-we-do")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit What We Do" : "Create What We Do"}</h4>
                                </div>
                            </div>                                                    
                        </Col>
                        <Col md={12}>
                            <div className='volunteer-activity-form'>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row>
                                        {/* Title */}
                                        <div className='col-lg-12'>
                                            <Form.Group className="mb-3" controlId="title">
                                                <Form.Label>Title <span className='required'><sup>*</sup></span></Form.Label>
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
                                                                          
                                        {/* Description  */}
                                        <div className='col-lg-12 my-3'>                                        
                                            <Form.Group>
                                                <Form.Label>Description <span className='required'><sup>*</sup></span></Form.Label>
                                            </Form.Group>
                                            <CustomEditor editorRef={editorRef} initialData={formik.values.description}/>                                        
                                        </div>

                                        {/* Dynamic Image Groups */}
                                        <div className='col-lg-12 mt-4'>
                                            <h5>Images Section</h5>
                                            <hr />
                                            {formik.values.image_data.map((group, index) => (
                                                <div key={index} className="p-3 mb-3 border rounded position-relative">
                                                     {formik.values.image_data.length > 1 && (
                                                        <div 
                                                            className="position-absolute" 
                                                            style={{ top: '10px', right: '10px', cursor: 'pointer', zIndex: 10, color: 'red' }}
                                                            onClick={() => handleRemoveImageGroup(index)}
                                                            title="Remove this group"
                                                        >
                                                            <RiDeleteBin6Line size={20} />
                                                        </div>
                                                    )}
                                                    
                                                    <Row>
                                                        {/* Image Title */}
                                                        <Col lg={6}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Image Title <span className='required'><sup>*</sup></span></Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Image Title"
                                                                    value={group.title}
                                                                    onChange={(e) => handleImageTitleChange(e, index)}
                                                                    isInvalid={formik.submitCount > 0 && formik.errors.image_data && formik.errors.image_data[index] && formik.errors.image_data[index].title}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {formik.errors.image_data && formik.errors.image_data[index] && formik.errors.image_data[index].title}
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>

                                                        {/* Image Upload */}
                                                        <Col lg={6}>
                                                            <Form.Label>Image <span className='required'><sup>*</sup></span>
                                                            <span class="file-limit"> (Max 2MB)</span>
                                                            </Form.Label>
                                                            <Form.Group className="br_border mb-3">
                                                                {!group.preview ? (
                                                                    <>
                                                                    <label htmlFor={`fileInput-${index}`} className="custom-file-upload-product" style={{cursor: 'pointer'}}>
                                                                        <img src={paper_upload} className='upload_icon img-fluid' alt='Upload' />
                                                                    </label>
                                                                    <input
                                                                        id={`fileInput-${index}`}
                                                                        className='file_type'
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={(e) => handleImageChange(e, index)}
                                                                    />
                                                                    </>
                                                                ) : (
                                                                    <div className="d-flex flex-column align-items-start justify-content-start gap-3">
                                                                        <div className='pos-rel' style={{width: '100px', height: '100px', position: 'relative'}}>
                                                                            <img 
                                                                                src={group.preview} 
                                                                                className="img-fluid rounded" 
                                                                                alt="Preview"
                                                                                style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                                                            />
                                                                            <IoClose 
                                                                                className='icon_close' 
                                                                                style={{top: '-8px', right: '-8px', background: '#fff', borderRadius: '50%', padding: '2px', cursor: 'pointer', position: 'absolute', fontSize: '18px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)'}}
                                                                                onClick={() => handleRemoveImage(index)} 
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Form.Group>
                                                            {formik.submitCount > 0 && formik.errors.image_data && formik.errors.image_data[index] && formik.errors.image_data[index].image && (
                                                                <div className="text-danger small mt-1">
                                                                    {formik.errors.image_data[index].image}
                                                                </div>
                                                            )}
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ))}
                                            <div className='text-end mb-5'>
                                                <Button 
                                                    variant="outline-success" 
                                                    onClick={handleAddImageGroup}
                                                    className="mt-2"
                                                    style={{ borderStyle: 'dashed' }}
                                                >
                                                    <IoAddCircleOutline size={20} className="me-1" />
                                                    Add Image Group
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section mt-4'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/home/what-we-do")}
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

export default CreateWhatWeDo
