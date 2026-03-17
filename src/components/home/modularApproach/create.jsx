"use client"
import { useFormik } from 'formik'
import { useRef, useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack} from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import paper_upload from '../../../assets/images/paper_upload.png';
import { IoAddCircleOutline, IoClose } from 'react-icons/io5';
import imageToBase64Browser from '../../../utility/imageToBase64';
import CustomEditor from '../../blogs/customEditor';

import { createModularApproach, getModularApproachDetail } from '../../../api/services/home';

const CreateModularApproach = () => {
    
  const navigate = useNavigate();
  const location = useLocation();
  const editorRef = useRef(null);
  
  // Edit mode data: passing ID only now
  const id = location.state?.id;  

  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
      title: '',
      description: '',
      services: [{ localId: Math.random(), serviceTitle: '', serviceDescription: '', image: null }]
  });

  useEffect(() => {
    if (id) {
        getModularApproachDetail({ id: id })((response) => {
            if (response?.status && response?.status_code === 200) {
                const data = response.data;
                setInitialValues({
                    title: data.title || '',
                    description: data.description || '',
                    services: data.approach_services?.map(s => ({
                        localId: Math.random(),
                        id: s.id,
                        serviceTitle: s.service_title,
                        serviceDescription: s.service_description,
                        image: s.service_image
                    })) || [{ localId: Math.random(), serviceTitle: '', serviceDescription: '', image: null }]
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
        // Description validation handled manually on submit due to CKEditor
        services: Yup.array().of(
            Yup.object().shape({
                serviceTitle: Yup.string().required('Service Title is required'),                
                image: Yup.mixed().required('Image is required')
            })
        )
    }),
    onSubmit: values => {
        const editor = editorRef.current;
        let ckContent = "";

        if (editor?.getData()) {
            ckContent = editor?.getData();
        }

        if (!ckContent && !values.description) {
            toast.error("Description is required");
            return;
        }

        setLoading(true);

        const payload = {
            title: values.title,
            description: ckContent || values.description,
            services: values.services?.map(service => {
                const serviceData = {
                    service_title: service.serviceTitle,
                    service_description: service.serviceDescription,
                    service_image: service.image
                };
                if(service.id){
                    serviceData.id = service.id;
                }
                return serviceData;
            })
        };

        if(id) {
            payload.id = id;
        }

        createModularApproach(payload)((response) => {
            setLoading(false);
            if (response?.status && (response?.status_code === 200 || response?.status_code === 201)) {
                toast.success(response?.message || (id ? "Entry updated successfully" : "Entry created successfully"));
                navigate("/home/modular-approach");
            } else {
                toast.error(response?.message || "Something went wrong");
            }
        });
    }
  });    

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 2 * 1024 * 1024) { // 2MB limit
             toast.error("Image size should be less than 2MB");
             return;
        }
        
        try {
            const base64 = await imageToBase64Browser(URL.createObjectURL(file));
            const base64Image = `data:${file.type};base64,${base64}`;
            
            const updatedServices = [...formik.values.services];
            updatedServices[index].image = base64Image;
            formik.setFieldValue('services', updatedServices);
        } catch (error) {
            console.error("Error converting image:", error);
            toast.error("Error uploading image");
        }
    }
  };

  const handleDeleteImage = (index) => {
      const updatedServices = [...formik.values.services];
      updatedServices[index].image = null;
      formik.setFieldValue('services', updatedServices);
  };

  const handleServiceChange = (e, index, field) => {
      const updatedServices = [...formik.values.services];
      updatedServices[index][field] = e.target.value;
      formik.setFieldValue('services', updatedServices);
  };

  const addService = () => {
      const updatedServices = [...formik.values.services, { localId: Math.random(), serviceTitle: '', serviceDescription: '', image: null }];
      formik.setFieldValue('services', updatedServices);
  };

  const removeService = (index) => {
      const updatedServices = formik.values.services.filter((_, i) => i !== index);
      formik.setFieldValue('services', updatedServices);
  };

  return (
    <Layout>
        <Container fluid>
            <Toaster position="top-center" />
            <div className='create-activity-section'>
                    <Row>
                        <Col md={12}>
                            <div className='title-section mt-5 mb-4 d-flex align-items-center'>
                                <div className='back_btn_wrap' onClick={() => navigate("/home/modular-approach")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit Modular Approach" : "Create Modular Approach"}</h4>
                                </div>
                            </div>                                                    
                        </Col>
                        <Col md={12}>
                            <div className='volunteer-activity-form'>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row>                              
                                        {/* Main Title */}
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

                                        {/* Description (CKEditor) */}
                                        <div className="col-lg-12 mb-3">
                                            <Form.Group className="mb-3" controlId="description">
                                                <Form.Label>Description <span className='required'><sup>*</sup></span></Form.Label>
                                                <CustomEditor 
                                                    editorRef={editorRef}
                                                    initialData={formik.values.description}
                                                />
                                                {/* Error message handled via toast or check on submit */}
                                            </Form.Group>
                                        </div>

                                        {/* Services Loop */}
                                        <div className="col-lg-12">
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <h5 className="mb-0">Services</h5>                                                
                                            </div>
                                            
                                            {formik.values.services.map((service, index) => (
                                                <div key={service.localId} className="p-3 mb-4" style={{ borderRadius: "8px", border: "1px solid #e0e0e0", position: 'relative' }}>
                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                        <h6 className="mb-0">Service {index + 1}</h6>
                                                        {formik.values.services.length > 1 && (
                                                            <div 
                                                                title="Delete Service"
                                                                style={{ cursor: "pointer", color: "#dc3545" }}
                                                                onClick={() => removeService(index)}
                                                            >
                                                                <RiDeleteBin6Line size={20} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Service Title */}
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="mt-2">Service Title <span className='required'><sup>*</sup></span></Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder={`Service ${index + 1} Title`}
                                                            value={service.serviceTitle}
                                                            onChange={(e) => handleServiceChange(e, index, 'serviceTitle')}
                                                            isInvalid={formik.touched.services?.[index]?.serviceTitle && !!formik.errors.services?.[index]?.serviceTitle}
                                                        />
                                                         <Form.Control.Feedback type="invalid">
                                                            {formik.errors.services?.[index]?.serviceTitle}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    {/* Service Description */}
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="mt-2">Service Description</Form.Label>
                                                        <CustomEditor 
                                                            initialData={service.serviceDescription}
                                                            onChange={(data) => {
                                                                const updatedServices = [...formik.values.services];
                                                                updatedServices[index].serviceDescription = data;
                                                                formik.setFieldValue('services', updatedServices);
                                                            }}
                                                        />                                                         
                                                    </Form.Group>

                                                    {/* Service Image */}
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="mt-2">Image <span className='required'><sup>*</sup></span> (Max 2MB)</Form.Label>
                                                        <div className="br_border">
                                                            <label htmlFor={`fileInput-${index}`} className="custom-file-upload-product"
                                                                style={{ cursor: service.image ? 'default' : 'pointer' }}
                                                            >
                                                                <img src={paper_upload} className='upload_icon img-fluid' alt='Upload' />
                                                            </label>
                                                            <input
                                                                id={`fileInput-${index}`}
                                                                className='file_type'
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleImageChange(e, index)}
                                                                disabled={!!service.image}
                                                            />
                                                            {service.image && (
                                                                <div className="d-flex flex-row align-items-center justify-content-start gap-3">
                                                                    <div className="uploaded-images">
                                                                        <div className='pos-rel'>
                                                                            <img src={service.image} alt="uploaded" className="uploaded-image" />
                                                                            <IoClose className='icon_close' onClick={() => handleDeleteImage(index)} style={{cursor: 'pointer'}} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {formik.submitCount > 0 && formik.errors.services?.[index]?.image && (
                                                            <div className="text-danger small mt-1">{formik.errors.services[index].image}</div>
                                                        )}
                                                    </Form.Group>
                                                </div>
                                            ))}
                                            <div className='text-end mb-5'>
                                                <Button 
                                                    variant="outline-success" 
                                                    onClick={addService}
                                                    className="mt-2"
                                                    style={{ borderStyle: 'dashed' }}
                                                >
                                                    <IoAddCircleOutline size={20} className="me-1" />
                                                    Add Service
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section mt-4'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/home/modular-approach")}
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

export default CreateModularApproach
