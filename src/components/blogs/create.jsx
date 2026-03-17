
"use client"
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from "react-datepicker";
import imageToBase64Browser from '../../utility/imageToBase64';
import { IoClose } from 'react-icons/io5';
import moment from 'moment';
import CustomEditor from "./customEditor";
import { useNavigate } from 'react-router-dom';
import Layout from '../layout';
import paper_upload from '../../assets/images/paper_upload.png';

const CreateBlog = () => {   
    
  const navigate = useNavigate();
  const editorRef = useRef();
  const [startDate, setStartDate] = useState(new Date());
  // For Banner image
  const [oldImages, setOldImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  // For meta OG image
  const [oldOGImages, setOldOGImages] = useState([]);
  const [uploadedOGImages, setUploadedOGImages] = useState([]);

  const formik = useFormik({
    initialValues: {
        title: '',
        url: '',
        postedBy:'',        
        date: moment().format('YYYY-MM-DD'),        
        images: [], 
        og_image: [],
        meta_title: '',
        meta_image_title: '',
        meta_description:'',
        meta_keywords: ''  
    },
    validationSchema: Yup.object().shape({
        title: Yup.string().required('Required'),
        url: Yup.string()
            .matches(/^[a-zA-Z0-9-]+$/, 'Use hyphens instead of special characters')
            .required('URL is required'),
        postedBy: Yup.string().required('Required'),    
        date: Yup.string().required('Required'),    
        meta_title: Yup.string().required('Required'),    
        meta_image_title: Yup.string().required('Required'),    
        meta_description: Yup.string().required('Required'),    
        meta_keywords: Yup.string().required('Required'),    
    }),
    validate: (values) =>{
        let errors = {};

        if(Array.isArray(values?.images) && !values?.images?.length){
            errors.images = "Please select image";
        }

        if(Array.isArray(values?.og_image) && !values?.og_image?.length){
            errors.og_image = "Please select OG image";
        }

        return errors;
    },
    onSubmit: values => {
        const editor=editorRef.current;        
        let ckContent = "";

        if (editor?.getData()) {
            ckContent = editor?.getData();
        }
        
        if(!ckContent){
            toast.error("Description required");
            return
        }

        let props = {  
            title: values?.title,
            urls: values?.url,
            posted_by: values?.postedBy,
            date: values?.date,
            description: ckContent,
            image: Array.isArray(values?.images) && values?.images?.length ? values?.images[0] : [],
            // Meta details
            og_image: Array.isArray(values?.og_image) && values?.og_image?.length ? values?.og_image[0] : [],
            meta_image_title: values?.meta_image_title,
            meta_title: values?.meta_title,
            meta_description: values?.meta_description,
            meta_keyword: values?.meta_keywords,
            is_active: true
        };

        // console.log("PROPS ***", props);
        
        navigate("/blogs");
        
    }
  });    
  // For blog image
  const handleImageChange = async (e) => {
    const files = Array.from(e?.target?.files);
    const maxSizeInBytes = 2 * 1024 * 1024;
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];    

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!validImageTypes.includes(file?.type)) {
            toast.error("Only jpg/jpeg and png files are allowed!");
            e.target.value = null;
            return;
        }

        if (file?.size > maxSizeInBytes) {
            toast.error("File size exceeds 2 MB limit", 'error');
            e.target.value = null;
            return;
        }
    }

    const images = await Promise.all(
        files.map(async (file) => {

            try {
                const response = await imageToBase64Browser(URL.createObjectURL(file));
                return `data:image/jpeg;base64,${response}`;
            } catch (error) {
                return null;
            }
        })
    );

    formik.setValues({
        ...formik.values,
        images: [...(formik.values?.images || []), ...images], // Ensure images is an array
    });

    e.target.value = null;
  }
  // For OG image
  const handleOGImageChange = async (e) => {
    const files = Array.from(e?.target?.files);
    const maxSizeInBytes = 2 * 1024 * 1024;
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];    

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!validImageTypes.includes(file?.type)) {
            toast.error("Only jpg/jpeg and png files are allowed!");
            e.target.value = null;
            return;
        }

        if (file?.size > maxSizeInBytes) {
            toast.error("File size exceeds 2 MB limit", 'error');
            e.target.value = null;
            return;
        }
    }

    const images = await Promise.all(
        files.map(async (file) => {

            try {
                const response = await imageToBase64Browser(URL.createObjectURL(file));
                return `data:image/jpeg;base64,${response}`;
            } catch (error) {
                return null;
            }
        })
    );

    formik.setValues({
        ...formik.values,
        og_image: [...(formik.values?.og_image || []), ...images], // Ensure images is an array
    });

    e.target.value = null;
  }
  // For blog image
  const handleDeleteImage = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);

    const newFormikImages = [...formik.values?.images];
    newFormikImages.splice(index, 1);
    formik.setFieldValue('images', newFormikImages);
  };
  // For OG image
  const handleDeleteOGImage = (index) => {
    const newImages = [...uploadedOGImages];
    newImages.splice(index, 1);
    setUploadedOGImages(newImages);

    const newFormikImages = [...formik.values?.og_image];
    newFormikImages.splice(index, 1);
    formik.setFieldValue('og_image', newFormikImages);
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
                                <div className='back_btn_wrap' onClick={() => navigate("/blogs")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>Create Blog</h4>
                                </div>
                            </div>                                                    
                        </Col>
                        <Col md={12}>
                            <div className='volunteer-activity-form'>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row>
                                        {/* Title */}
                                        <div className='col-lg-6'>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1em3">
                                                <Form.Label>Title<span className='required'><sup>*</sup></span></Form.Label>
                                                <div className='input-border'>
                                                    <Form.Control
                                                        type="text"
                                                        className=''
                                                        placeholder="Title"
                                                        name='title'
                                                        // disabled={"ViewEmp"}
                                                        value={formik.values?.title}
                                                        onChange={formik.handleChange}
                                                        isValid={(formik.touched.title) && !formik.errors.title}
                                                        isInvalid={(formik.touched.title) && !!formik.errors.title}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
                                                </div>
                                            </Form.Group>
                                        </div>                                    
                                        {/* Url */}
                                        <div className='col-lg-6'>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1em3">
                                                <Form.Label>URL<span className='required'><sup>*</sup></span></Form.Label>
                                                <div className='input-border'>
                                                    <Form.Control
                                                        type="text"
                                                        className=''
                                                        placeholder="Enter text using hyphens instead of spaces"
                                                        name='url'
                                                        // disabled={"ViewEmp"}
                                                        value={formik.values?.url}
                                                        onChange={formik.handleChange}
                                                        onKeyDown={(e) => {
                                                            if (e.key === ' ') {
                                                                e.preventDefault(); // Disable space key
                                                            }
                                                        }}
                                                        isValid={(formik.touched.url) && !formik.errors.url}
                                                        isInvalid={(formik.touched.url) && !!formik.errors.url}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.url}</Form.Control.Feedback>
                                                </div>
                                            </Form.Group>
                                        </div>     
                                        {/* Posted by */}
                                        <div className='col-lg-6 mt-2'>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1em3">
                                                <Form.Label>Posted by<span className='required'><sup>*</sup></span></Form.Label>
                                                <div className='input-border'>
                                                    <Form.Control
                                                        type="text"
                                                        className=''
                                                        placeholder="Posted by"
                                                        name='postedBy'
                                                        // disabled={"ViewEmp"}
                                                        value={formik.values?.postedBy}
                                                        onChange={formik.handleChange}
                                                        isValid={(formik.touched.postedBy) && !formik.errors.postedBy}
                                                        isInvalid={(formik.touched.postedBy) && !!formik.errors.postedBy}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.postedBy}</Form.Control.Feedback>
                                                </div>
                                            </Form.Group>
                                        </div>
                                        {/* Date */}
                                        <div className='col-lg-6 mt-2'>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1em3">
                                                <Form.Label>Date<span className='required'><sup>*</sup></span></Form.Label>
                                                <div className='input-border'>
                                                    <DatePicker                                                     
                                                        selected={formik.values.date ? new Date(formik.values.date) : null} // Convert to Date object if formatted
                                                        onChange={(date) => {
                                                            const formattedDate = moment(date).format("YYYY-MM-DD"); // Format to YYYY-MM-DD
                                                            formik.setFieldValue('date', formattedDate);
                                                        }}
                                                        maxDate={new Date()}
                                                        dateFormat="yyyy-MM-dd"
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.date}</Form.Control.Feedback>
                                                </div>
                                            </Form.Group>
                                        </div>                                  
                                        {/* Description  */}
                                        <div className='col-lg-12'>                                        
                                            <Form.Group>
                                                <Form.Label>Description <span className='required'><sup>*</sup></span></Form.Label>
                                            </Form.Group>
                                            {/* Custom Editor */}
                                            <CustomEditor editorRef={editorRef} />                                        
                                        </div>
                                        {/* Banner Image */}
                                        <div className='col-lg-12 mb-5'>
                                                <Form.Label>Banner Image <span className='required'><sup>*</sup></span>
                                                <span class="file-limit">(File size shouldn&apos;t exceed 2 MB)</span>
                                                </Form.Label>
                                                <Form.Group className="br_border mb-3">
                                                    <label htmlFor="fileInput" className="custom-file-upload-product"
                                                        style={{ pointerEvents: Array.isArray(formik?.values?.images) && formik?.values?.images?.length ? 'none' : 'auto'}}
                                                    >
                                                        <img src={paper_upload} className='upload_icon img-fluid' alt='Upload' />
                                                    </label>
                                                    <input
                                                        id="fileInput"
                                                        className='file_type'
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        disabled={Array.isArray(formik?.values?.images) && formik?.values?.images?.length ? true : false}
                                                    />
                                                    <div className="d-flex flex-row align-items-center justify-content-start gap-3">
                                                        {/* Old images */}
                                                        <div className="uploaded-images">
                                                            {oldImages?.map((image, i) =>
                                                                <div className='pos-rel' key={i}>
                                                                    <img src={image?.imageUrl} alt="product" className="uploaded-image" />
                                                                    <IoClose className='icon_close' />
                                                                </div>
                                                            )}
                                                        </div>
                                                        {/* Display uploaded images */}
                                                        <div className="uploaded-images">
                                                            {formik.values?.images?.map((image, index) => (
                                                                <div className='pos-rel' key={index}>
                                                                    <img key={index} src={image} alt={`Uploaded ${index}`} className="uploaded-image" />
                                                                    <IoClose className='icon_close' onClick={() => handleDeleteImage(index)} />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                                <div className='invalid-feedbacks' style={{ color: '#DC3544' }}>{formik.touched.images && formik.errors.images}</div>
                                        </div> 
                                        <h4>Blog Seo</h4> 
                                        <div className='col-lg-12'>
                                            <div class="br_bottom"></div>
                                        </div> 
                                        {/* Meta Title */}
                                        <div className='col-lg-12 mt-2'>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1em3">
                                                <Form.Label>Meta Title<span className='required'><sup>*</sup></span></Form.Label>
                                                <div className='input-border'>
                                                    <Form.Control
                                                        type="text"
                                                        className=''
                                                        placeholder="Enter Meta Title"
                                                        name='meta_title'
                                                        // disabled={"ViewEmp"}
                                                        value={formik.values?.meta_title}
                                                        onChange={formik.handleChange}
                                                        isValid={(formik.touched.meta_title) && !formik.errors.meta_title}
                                                        isInvalid={(formik.touched.meta_title) && !!formik.errors.meta_title}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.meta_title}</Form.Control.Feedback>
                                                </div>
                                            </Form.Group>
                                        </div>                               
                                        {/* Meta Description */}
                                        <div className='col-lg-12 mt-2'>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1em3">
                                                <Form.Label>Meta Description<span className='required'><sup>*</sup></span></Form.Label>
                                                <div className='input-border'>
                                                    <Form.Control
                                                        type="text"
                                                        className=''
                                                        placeholder="Enter Meta Description"
                                                        name='meta_description'
                                                        // disabled={"ViewEmp"}
                                                        value={formik.values?.meta_description}
                                                        onChange={formik.handleChange}
                                                        isValid={(formik.touched.meta_description) && !formik.errors.meta_description}
                                                        isInvalid={(formik.touched.meta_description) && !!formik.errors.meta_description}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.meta_description}</Form.Control.Feedback>
                                                </div>
                                            </Form.Group>
                                        </div>                               
                                        {/* Meta Keywords */}
                                        <div className='col-lg-12 mt-2'>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1em3">
                                                <Form.Label>
                                                    Meta Keywords
                                                    <span className='required'><sup>*</sup>  </span>
                                                    <span style={{fontSize: '12px', color:"red"}}>(seperated by , )</span>
                                                </Form.Label>
                                                <div className='input-border'>
                                                    <Form.Control
                                                        as='textarea'
                                                        rows={4}
                                                        className=''
                                                        placeholder="Enter Meta Keywords"
                                                        name='meta_keywords'                                                    
                                                        // disabled={"ViewEmp"}
                                                        value={formik.values?.meta_keywords}
                                                        onChange={formik.handleChange}
                                                        isValid={(formik.touched.meta_keywords) && !formik.errors.meta_keywords}
                                                        isInvalid={(formik.touched.meta_keywords) && !!formik.errors.meta_keywords}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.meta_keywords}</Form.Control.Feedback>
                                                </div>
                                            </Form.Group>
                                        </div> 
                                        {/* Image Title */}
                                        <div className='col-lg-12 mt-2'>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1em3">
                                                <Form.Label>Image Title<span className='required'><sup>*</sup></span></Form.Label>
                                                <div className='input-border'>
                                                    <Form.Control
                                                        type="text"
                                                        className=''
                                                        placeholder="Enter Image Title"
                                                        name='meta_image_title'
                                                        // disabled={"ViewEmp"}
                                                        value={formik.values?.meta_image_title}
                                                        onChange={formik.handleChange}
                                                        isValid={(formik.touched.meta_image_title) && !formik.errors.meta_image_title}
                                                        isInvalid={(formik.touched.meta_image_title) && !!formik.errors.meta_image_title}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.meta_image_title}</Form.Control.Feedback>
                                                </div>
                                            </Form.Group>
                                        </div> 
                                        {/* OG Image */}
                                        <div className='col-lg-12 mb-5'>
                                                <Form.Label>OG Image <span className='required'><sup>*</sup></span>
                                                <span class="file-limit">(File size shouldn&apos;t exceed 2 MB)</span>
                                                </Form.Label>
                                                <Form.Group className="br_border mb-3">
                                                    <label htmlFor="fileOGInput" className="custom-file-upload-product"
                                                        style={{ pointerEvents: Array.isArray(formik?.values?.og_image) && formik?.values?.og_image?.length ? 'none' : 'auto'}}
                                                    >
                                                        <img src={paper_upload} className='upload_icon img-fluid' alt='Upload' />
                                                    </label>
                                                    <input
                                                        id="fileOGInput"
                                                        className='file_type'
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleOGImageChange}
                                                        disabled={Array.isArray(formik?.values?.og_image) && formik?.values?.og_image?.length ? true : false}
                                                    />
                                                    <div className="d-flex flex-row align-items-center justify-content-start gap-3">
                                                        {/* Old OG images */}
                                                        <div className="uploaded-images">
                                                            {oldOGImages?.map((image, i) =>
                                                                <div className='pos-rel' key={i}>
                                                                    <img src={image?.imageUrl} alt="product" className="uploaded-image" />
                                                                    <IoClose className='icon_close' />
                                                                </div>
                                                            )}
                                                        </div>
                                                        {/* Display uploaded OG images */}
                                                        <div className="uploaded-images">
                                                            {formik.values?.og_image?.map((image, index) => (
                                                                <div className='pos-rel' key={index}>
                                                                    <img key={index} src={image} alt={`Uploaded ${index}`} className="uploaded-image" />
                                                                    <IoClose className='icon_close' onClick={() => handleDeleteOGImage(index)} />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                                <div className='invalid-feedbacks' style={{ color: '#DC3544' }}>{formik.touched.og_image && formik.errors.og_image}</div>
                                        </div>                               
                                        <div className='col-lg-12'>
                                            <div class="br_bottom"></div>
                                        </div>
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/blogs")}
                                            >
                                                Cancel
                                            </Button>
                                            <Button type='submit' style={{background: 'linear-gradient(92deg, #57d89e9f, #03693b)', border: "none", outline: "none", marginLeft: '15px'}} >
                                                Create Blog
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

export default CreateBlog