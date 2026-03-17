import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import imageToBase64Browser from '../../utility/imageToBase64';
import { IoClose } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../layout';
import paper_upload from '../../assets/images/paper_upload.png';
import { createOrUpdateSeo, getSeoDetail } from '../../api/services/seo';
import Select from 'react-select';

const pageOptions = [
    { value: "home", label: "Home" },
    { value: "about_us", label: "About Us" },
    { value: "contact_us", label: "Contact Us" },
    { value: "our_impact", label: "Our Impact"},
    { value: "what_we_do", label: "What We Do"},
    { value: "how_we_work", label: "How We Work"}    
];

// Sort options alphabetically by label
pageOptions.sort((a, b) => a.label.localeCompare(b.label));

const CreateSeo = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(false);
  // For meta OG image
  const [oldOGImages, setOldOGImages] = useState([]);
  const [uploadedOGImages, setUploadedOGImages] = useState([]);

  // Getting seo detail
  useEffect(() => {
      const id = state?.id;

      if (!id) return;

      // Function to get seo 
      getSeoDetail({ id })((response) => {
          if (response && (response.status_code === 200 || response.status_code === 201)) {
              setData(response?.data || {});
          }
      });

  }, []);

  // Setting values
  useEffect(() => {
      if (!data?.id) return;

      formik.setValues({
          ...formik.values,
          id: data?.id,
          page: data?.page_name,
          meta_title: data?.meta_title,
          meta_description: data?.meta_description,
          meta_keywords: data?.meta_keywords,
          image_title: data?.meta_image_title,
          og_image: data?.og_image ? [data?.og_image] : [],
      });
  }, [data]);


  const formik = useFormik({
    initialValues: {
        id: '',
        page: '',
        meta_title: '',
        meta_description:'',
        meta_keywords: '',
        image_title: '',
        og_image: [],
    },
    validationSchema: Yup.object().shape({
        page: Yup.string().required('Required'),
        meta_title: Yup.string().required('Required'),    
        meta_description: Yup.string().required('Required'),    
        // Meta keywords is not strictly required by prompt asterisk but implies it's a field. Prompt says "4) Meta Keywords". I'll make it optional or required? Usually SEO needs it. I'll make it optional unless marked with *. Prompt: "1) Meta Title * ... 3) Meta Description * ... 5) Image Title*". Keywords has no *, but field 2 (Page) has *.
        // So Keywords is optional.
        image_title: Yup.string().required('Required'),    
    }),
    validate: (values) =>{
        let errors = {};

        if(Array.isArray(values?.og_image) && !values?.og_image?.length){
            errors.og_image = "Please select OG image";
        }

        return errors;
    },
    onSubmit: values => {
        let props = {  
            page_name: values?.page,
            meta_title: values?.meta_title,
            meta_description: values?.meta_description,
            meta_keywords: values?.meta_keywords,
            meta_image_title: values?.image_title,
            og_image: Array.isArray(values?.og_image) && values?.og_image?.length ? values?.og_image[0] : [],
            is_active: true
        };

        if(values?.id){
            props.id = values?.id;
        }

        setLoading(true);
        // console.log("PROPS ***", values);
        createOrUpdateSeo(props)(response => {
            setLoading(false);
            if (response?.status_code === 200 || response?.status_code === 201) {
                 toast.success(response?.message || (values?.id ? "SEO Details Updated Successfully" : "SEO Details Created Successfully"));
                setTimeout(() => {
                    navigate("/seo");
                }, 500);
            } else {      
                if(Array.isArray(response?.response?.data?.errors?.page_name) && response?.response?.data?.errors?.page_name[0]){
                    toast.error(response?.response?.data?.errors?.page_name[0]);
                }else if(response?.message){
                    toast.error(response?.message);
                }else{
                    toast.error("Something went wrong");
                }
            }
        });
    }
  });    

  // For OG image
  const handleOGImageChange = async (e) => {
    const files = Array.from(e?.target?.files);
    // 1MB limit
    const maxSizeInBytes = 1 * 1024 * 1024;
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];    

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!validImageTypes.includes(file?.type)) {
            toast.error("Only jpg/jpeg and png files are allowed!");
            e.target.value = null;
            return;
        }

        if (file?.size > maxSizeInBytes) {
            toast.error("File size exceeds 1 MB limit", 'error');
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
                                <div className='back_btn_wrap' onClick={() => navigate("/seo")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{state?.id ? "Edit Seo" : "Create Seo"}</h4>
                                </div>
                            </div>                                                    
                        </Col>
                        <Col md={12}>
                            <div className='volunteer-activity-form'>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row>
                                        {/* Meta Title */}
                                        <div className='col-lg-6'>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Meta Title<span className='required'><sup>*</sup></span></Form.Label>
                                                <div className='input-border'>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter Meta Title"
                                                        name='meta_title'
                                                        value={formik.values?.meta_title}
                                                        onChange={formik.handleChange}
                                                        isValid={(formik.touched.meta_title) && !formik.errors.meta_title}
                                                        isInvalid={(formik.touched.meta_title) && !!formik.errors.meta_title}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.meta_title}</Form.Control.Feedback>
                                                </div>
                                            </Form.Group>
                                        </div>                                    
                                        {/* Page */}
                                        <div className='col-lg-6'>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Page<span className='required'><sup>*</sup></span></Form.Label>
                                                <div className='input-border'>
                                                    <Select
                                                        name="page"
                                                        options={pageOptions}
                                                        value={pageOptions.find(opt => opt.value === formik.values.page) || null}
                                                        onChange={(option) => formik.setFieldValue('page', option?.value || '')}
                                                        onBlur={() => formik.setFieldTouched('page', true)}
                                                        placeholder="Select Page"
                                                        classNamePrefix="react-select"
                                                        styles={{
                                                            control: (base, state) => ({
                                                                ...base,
                                                                height: '43px',
                                                                minHeight: '43px',
                                                                fontSize: '14px',
                                                                borderRadius: '0 10px 10px 10px',
                                                                border: '1px solid',
                                                                borderColor: (formik.touched.page && formik.errors.page) ? '#dc3545' : (formik.touched.page && !formik.errors.page) ? '#198754' : '#ebebeb',
                                                                boxShadow: 'none',
                                                                '&:hover': {
                                                                     borderColor: (formik.touched.page && formik.errors.page) ? '#dc3545' : '#ebebeb'
                                                                },
                                                                '&:focus-within': {
                                                                     borderColor: '#dee2e6', // Match focus style from css
                                                                }
                                                            }),
                                                            valueContainer: (base) => ({
                                                                ...base,
                                                                paddingLeft: '12px',
                                                                height: '43px',
                                                                paddingTop: '0',
                                                                paddingBottom: '0',
                                                                display: 'flex',
                                                                alignItems: 'center'
                                                            }),
                                                            menu: (base) => ({
                                                                ...base,
                                                                zIndex: 100,
                                                                fontSize: '14px'
                                                            })
                                                        }}
                                                    />
                                                    
                                                    {/* Explicit feedback for Select */}
                                                    <Form.Control.Feedback type="invalid" style={{display: formik.touched.page && formik.errors.page ? 'block' : 'none'}}>
                                                        {formik.errors.page}
                                                    </Form.Control.Feedback>
                                                </div>
                                            </Form.Group>
                                        </div>     
                                        {/* Meta Description */}
                                        <div className='col-lg-12 mt-2'>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Meta Description<span className='required'><sup>*</sup></span></Form.Label>
                                                <div className='input-border'>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        placeholder="Enter Meta Description"
                                                        name='meta_description'
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
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    Meta Keywords
                                                    <span style={{fontSize: '12px', color: '#6c757d', marginLeft: '5px'}}>(separated by , )</span>
                                                </Form.Label>
                                                <div className='input-border'>
                                                    <Form.Control
                                                        as='textarea'
                                                        rows={3}
                                                        placeholder="Enter Meta Keywords"
                                                        name='meta_keywords'                                                    
                                                        value={formik.values?.meta_keywords}
                                                        onChange={formik.handleChange}
                                                    />
                                                </div>
                                            </Form.Group>
                                        </div> 
                                        {/* Image Title */}
                                        <div className='col-lg-12 mt-2 mb-2'>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Image Title<span className='required'><sup>*</sup></span></Form.Label>
                                                <div className='input-border'>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter Image Title"
                                                        name='image_title'
                                                        value={formik.values?.image_title}
                                                        onChange={formik.handleChange}
                                                        isValid={(formik.touched.image_title) && !formik.errors.image_title}
                                                        isInvalid={(formik.touched.image_title) && !!formik.errors.image_title}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.image_title}</Form.Control.Feedback>
                                                </div>
                                            </Form.Group>
                                        </div> 
                                        {/* OG Image */}
                                        <div className='col-lg-12 mb-5'>
                                                <Form.Label>OG Image <span className='required'><sup>*</sup></span>
                                                <span className="file-limit" style={{fontSize: '12px', color: '#6c757d', marginLeft: '5px'}}>(File size shouldn&apos;t exceed 1 MB)</span>
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
                                                        accept=".jpg,.jpeg,.png"
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
                                            <div className="br_bottom"></div>
                                        </div>
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/seo")}
                                            >
                                                Cancel
                                            </Button>
                                            <Button type='submit' disabled={loading} style={{background: 'linear-gradient(92deg, #57d89e9f, #03693b)', border: "none", outline: "none", marginLeft: '15px'}} >
                                                {loading ? "Loading..." : (state?.id ? "Update" : "Create")}
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

export default CreateSeo
