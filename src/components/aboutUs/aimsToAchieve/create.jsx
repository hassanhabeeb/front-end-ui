
"use client"
import { useFormik } from 'formik'
import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import paper_upload from '../../../assets/images/paper_upload.png';
import { IoAddCircleOutline, IoClose } from 'react-icons/io5';
import { RiDeleteBin6Line } from "react-icons/ri";
import imageToBase64Browser from '../../../utility/imageToBase64';
import CustomEditor from '../../blogs/customEditor';
import { createAimsToAchieve, getAimsToAchieveDetail } from '../../../api/services/aboutUs';

const CreateAimsToAchieve = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  
  // Edit mode data
  const id = location.state?.id;

  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
        title: '',
        outcomes: [
            { localId: Math.random(), title: '', description: '', image: null }
        ]
  });

  useEffect(() => {
    if (id) {
        getAimsToAchieveDetail({ id: id })((response) => {
            if (response?.status && response?.status_code === 200) {
                const data = response.data;
                const aimsList = data.aims || data.aims_to_achieve_list || [];
                setInitialValues({
                    title: data.title || '',
                    outcomes: aimsList.map(item => ({
                        localId: Math.random(),
                        id: item.id,
                        title: item.target_title || item.title,
                        description: item.target_description || item.description,
                        image: item.target_image || item.image
                    })) || [{ localId: Math.random(), title: '', description: '', image: null }]
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
        outcomes: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required('Title is required'),
                description: Yup.string().required('Description is required'),
                image: Yup.mixed().required('Image is required')
            })
        )
    }),
    onSubmit: values => {
        setLoading(true);
        let payload = {  
            title: values.title,
            aims: values.outcomes.map(outcome => {
                let aimData = {
                    target_title: outcome.title,
                    target_description: outcome.description,
                    target_image: outcome.image
                };
                if(outcome.id){
                    aimData.id = outcome.id;
                }
                return aimData;
            })
        };

        if(id) {
            payload.id = id;
        }

        createAimsToAchieve(payload)((res) => {
            setLoading(false);
            if (res?.status && (res?.status_code == 200 || res?.status_code == 201)) {
                toast.success(res.message);
                navigate("/about-us/aims-to-achieve");
            } else {
                toast.error(res.message);
            }
        });
    }
  });    

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            toast.error("Only JPG, PNG, and WEBP formats are allowed");
            return;
        }
        if (file.size > 2 * 1024 * 1024) { // 2MB limit
             toast.error("Image size should be less than 2MB");
             return;
        }
        
        try {
            const base64 = await imageToBase64Browser(URL.createObjectURL(file));
            const base64Image = `data:${file.type};base64,${base64}`;
            
            const updatedOutcomes = [...formik.values.outcomes];
            updatedOutcomes[index].image = base64Image;
            formik.setFieldValue('outcomes', updatedOutcomes);
        } catch (error) {
            console.error("Error converting image:", error);
            toast.error("Error uploading image");
        }
    }
  };

  const handleDeleteImage = (index) => {
      const updatedOutcomes = [...formik.values.outcomes];
      updatedOutcomes[index].image = null;
      formik.setFieldValue('outcomes', updatedOutcomes);
  };

//   const handleOutcomeChange = (e, index, field) => {
//       const updatedOutcomes = [...formik.values.outcomes];
//       updatedOutcomes[index][field] = e.target.value;
//       formik.setFieldValue('outcomes', updatedOutcomes);
//   };

  const handleEditorChange = (data, index) => {
      const updatedOutcomes = [...formik.values.outcomes];
      updatedOutcomes[index].description = data;
      formik.setFieldValue('outcomes', updatedOutcomes);
  };

  const addOutcome = () => {
    const updatedOutcomes = [...formik.values.outcomes, { localId: Math.random(), title: '', description: '', image: null }];
    formik.setFieldValue('outcomes', updatedOutcomes);
  };

  const removeOutcome = (index) => {
    const updatedOutcomes = formik.values.outcomes.filter((_, i) => i !== index);
    formik.setFieldValue('outcomes', updatedOutcomes);
  };

  return (
    <Layout>
        <Container fluid>
            <Toaster position="top-center" />
            <div className='create-activity-section'>
                    <Row>
                        <Col md={12}>
                            <div className='title-section mt-5 mb-4 d-flex align-items-center'>
                                <div className='back_btn_wrap' onClick={() => navigate("/about-us/aims-to-achieve")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit Aims to Achieve" : "Create Aims to Achieve"}</h4>
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
                                                <Form.Label>Main Title <span className='required'><sup>*</sup></span></Form.Label>
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

                                        {/* Target Outcomes Loop */}
                                        <div className="col-lg-12">
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <h5 className="mb-0">Target Outcomes</h5>
                                            </div>
                                            {formik.values.outcomes.map((outcome, index) => (
                                                <div key={outcome.localId || index} className="p-3 mb-4" style={{ borderRadius: "8px", border: "1px solid #e0e0e0" }}>
                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                        <h6 className="mb-0">Outcome {index + 1}</h6>
                                                        {formik.values.outcomes.length > 1 && (
                                                            <div 
                                                                title="Delete Outcome"
                                                                style={{ cursor: "pointer", color: "#dc3545" }}
                                                                onClick={() => removeOutcome(index)}
                                                            >
                                                                <RiDeleteBin6Line size={20} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Outcome Title */}
                                                    <Form.Group className="mb-3 mt-4">
                                                        <Form.Label>Title <span className='required'><sup>*</sup></span></Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder={`Outcome ${index + 1} Title`}
                                                            name={`outcomes[${index}].title`}
                                                            value={outcome.title}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            isValid={formik.touched.outcomes?.[index]?.title && !formik.errors.outcomes?.[index]?.title}
                                                            isInvalid={formik.touched.outcomes?.[index]?.title && !!formik.errors.outcomes?.[index]?.title}
                                                        />
                                                         <Form.Control.Feedback type="invalid">
                                                            {formik.errors.outcomes?.[index]?.title}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    {/* Outcome Description */}
                                                    <Form.Group className="mb-3 mt-4">
                                                        <Form.Label>Description <span className='required'><sup>*</sup></span></Form.Label>
                                                        <CustomEditor 
                                                            initialData={outcome.description}
                                                            onChange={(data) => handleEditorChange(data, index)}
                                                        />
                                                         {formik.submitCount > 0 && formik.errors.outcomes?.[index]?.description && (
                                                            <div className="text-danger small mt-1">{formik.errors.outcomes[index].description}</div>
                                                        )}
                                                    </Form.Group>

                                                    {/* Outcome Image */}
                                                    <Form.Group className="mb-3 mt-4">
                                                        <Form.Label>Image <span className='required'><sup>*</sup></span> <span style={{ fontSize: "12px", color: "#b9b9b9" }}>(Max 2MB)</span></Form.Label>
                                                        <div className="br_border">
                                                            <label htmlFor={`fileInput-${index}`} className="custom-file-upload-product"
                                                                style={{ cursor: outcome.image ? 'default' : 'pointer' }}
                                                            >
                                                                <img src={paper_upload} className='upload_icon img-fluid' alt='Upload' />
                                                            </label>
                                                            <input
                                                                id={`fileInput-${index}`}
                                                                className='file_type'
                                                                type="file"
                                                                accept=".jpg,.jpeg,.png,.webp"
                                                                onChange={(e) => handleImageChange(e, index)}
                                                                disabled={!!outcome.image}
                                                            />
                                                            {outcome.image && (
                                                                <div className="d-flex flex-row align-items-center justify-content-start gap-3">
                                                                    <div className="uploaded-images">
                                                                        <div className='pos-rel'>
                                                                            <img src={outcome.image} alt="uploaded" className="uploaded-image" />
                                                                            <IoClose className='icon_close' onClick={() => handleDeleteImage(index)} style={{cursor: 'pointer'}} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {formik.submitCount > 0 && !outcome.image && (
                                                            <div className="text-danger small mt-1">Image is required</div>
                                                        )}
                                                    </Form.Group>
                                                </div>
                                            ))}
                                            <div className='text-end mb-5'>
                                                <Button 
                                                    variant="outline-success" 
                                                    onClick={addOutcome}
                                                    className="mt-2"
                                                    style={{ borderStyle: 'dashed' }}
                                                >
                                                    <IoAddCircleOutline size={20} className="me-1" />
                                                    Add Outcome
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section mt-4'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/about-us/aims-to-achieve")}
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

export default CreateAimsToAchieve
