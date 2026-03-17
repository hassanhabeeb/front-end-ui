
"use client"
import { useFormik } from 'formik'
import { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import paper_upload from '../../../assets/images/paper_upload.png'; 
import Layout from '../../layout';
import { createFactsAndFigures, getFactsAndFiguresDetail } from '../../../api/services/aboutUs';
import imageToBase64Browser from '../../../utility/imageToBase64';
import { IoClose } from 'react-icons/io5';

const CreateFactsAndFigures = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  
  // Edit mode data
  const id = location.state?.id;

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: '',
    facts: [
        { localId: Math.random(), label: '', image: null },
        { localId: Math.random(), label: '', image: null },
        { localId: Math.random(), label: '', image: null }
    ]
  });

  useEffect(() => {
    if (id) {
        setPageLoading(true);
        getFactsAndFiguresDetail({ id: id })((response) => {
            if (response?.status && response?.status_code === 200) {
                const data = response.data;
                setInitialValues({
                    title: data.title || '',
                    facts: data.facts_items?.map(f => ({
                        localId: Math.random(),
                        id: f.id,
                        label: f.label,
                        // Ensure image is treated as string URL if provided
                        image: f.image 
                    })) || [
                        { localId: Math.random(), label: '', image: null },
                        { localId: Math.random(), label: '', image: null },
                        { localId: Math.random(), label: '', image: null }
                    ]
                });
            }
            setPageLoading(false);
        });
    }
  }, [id]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
        title: Yup.string().required('Title is required'),
        facts: Yup.array().of(
            Yup.object().shape({
                label: Yup.string().required('Label is required'),
                image: Yup.mixed().required('Image is required')
            })
        )
    }),
    onSubmit: values => {
        setLoading(true);
        let props = {  
            title: values.title,
            facts: values.facts?.map(fact => {
                const factData = {
                    label: fact.label,
                    image: fact.image
                };
                if(fact.id){
                    factData.id = fact.id;
                }
                return factData;
            })
        };

        if(id){
            props.id = id;
        }

        createFactsAndFigures(props)((response) => {
            setLoading(false);
            if (response?.status && (response?.status_code === 200 || response?.status_code === 201)) {
                toast.success(response?.message || (id ? "Entry updated successfully" : "Entry created successfully"));
                navigate("/about-us/facts-and-figures");
            } else {
                toast.error(response?.message || "Something went wrong");
            }
        });
    }
  });    

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    e.target.value = ''; // Reset input so same file can be selected again
    
    if (file) {
        if (file.size > 1024 * 1024) { // 1MB limit
             toast.error("File size should be less than 1MB");
             return;
        }

        try {
            const tempUrl = URL.createObjectURL(file);
            const img = new Image();
            img.src = tempUrl;

            img.onload = async () => {
                if (img.width > 100 || img.height > 100) {
                     toast.error("Image dimensions should not exceed 100x100px. Please upload a smaller image.");
                     // Do not update state if invalid
                     URL.revokeObjectURL(tempUrl); // Clean up
                     return;
                }

                // If valid, convert to base64
                try {
                    const base64 = await imageToBase64Browser(tempUrl);
                    const base64Image = `data:${file.type};base64,${base64}`;
                    
                    const updatedFacts = [...formik.values.facts];
                    updatedFacts[index].image = base64Image;
                    formik.setFieldValue('facts', updatedFacts);
                    
                    URL.revokeObjectURL(tempUrl); // Clean up
                } catch (b64Error) {
                    console.error("Error converting image:", b64Error);
                    toast.error("Error processing image");
                }
            };
        } catch (error) {
            console.error("Error loading image:", error);
            toast.error("Error uploading image");
        }
    }
  };

  const handleRemoveImage = (index) => {
    const updatedFacts = [...formik.values.facts];
    updatedFacts[index].image = null;
    formik.setFieldValue('facts', updatedFacts);
  };

  const handleLabelChange = (e, index) => {
      const { value } = e.target;
      const updatedFacts = [...formik.values.facts];
      updatedFacts[index].label = value;
      formik.setFieldValue('facts', updatedFacts);
  };

  return (
    <Layout>
        <Container fluid>
            <Toaster position="top-center" />
            <div className='create-activity-section'>
                    <Row>
                        <Col md={12}>
                            <div className='title-section mt-5 mb-4 d-flex align-items-center'>
                                <div className='back_btn_wrap' onClick={() => navigate("/about-us/facts-and-figures")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit Facts & Figures" : "Create Facts & Figures"}</h4>
                                </div>
                            </div>                                                    
                        </Col>
                        <Col md={12}>
                            <div className='volunteer-activity-form'>
                                <Form onSubmit={formik.handleSubmit}>
                                    {pageLoading ? (
                                        <div className="text-center py-5">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : (
                                    <Row>                              
                                        {/* Title */}
                                        <div className='col-lg-12 mb-4'>
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

                                        {/* 3 Fixed Groups */}
                                        <h5 className="mb-3">Facts Items <span style={{fontSize: '12px', color: '#6c757d'}}>(Small Icons Only)</span></h5>
                                        {formik.values.facts.map((fact, index) => (
                                            <div key={fact.localId || index} className='col-lg-4 mb-4'>
                                                <div className="p-3 border rounded h-100">
                                                    <h6>Item {index + 1}</h6>
                                                    <hr />
                                                    
                                                    {/* Label */}
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Label <span className='required'><sup>*</sup></span></Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Label"
                                                            value={fact.label}
                                                            onChange={(e) => handleLabelChange(e, index)}
                                                            isInvalid={formik.touched.facts?.[index]?.label && !!formik.errors.facts?.[index]?.label}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {formik.errors.facts?.[index]?.label}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    {/* Image Upload */}
                                                     <Form.Group className="mb-3 mt-4">
                                                         <Form.Label>Logo <span className='required'><sup>*</sup> <span style={{fontSize: '11px', color: '#6c757d'}}>(Max 1MB, Max 100x100px)</span></span></Form.Label>
                                                         <div className='br_border'>
                                                             <label htmlFor={`upload-button-${index}`} className="custom-file-upload-product" style={{ cursor: fact.image ? 'default' : 'pointer' }}>
                                                                 <img src={paper_upload} alt="upload" className="upload_icon img-fluid" />
                                                             </label>
                                                             <input
                                                                 id={`upload-button-${index}`}
                                                                 type="file"
                                                                 accept="image/*"
                                                                 onChange={(e) => handleImageChange(e, index)}
                                                                 className="file_type"
                                                                 disabled={!!fact.image}
                                                             />
                                                             {fact.image && (
                                                                 <div className="d-flex flex-row align-items-center justify-content-start gap-3">
                                                                    <div className="uploaded-images">
                                                                         <div className="pos-rel">
                                                                             <img src={fact.image} alt="preview" className="uploaded-image" />
                                                                             <IoClose 
                                                                                className='icon_close' 
                                                                                onClick={() => handleRemoveImage(index)}
                                                                                style={{ cursor: 'pointer' }}
                                                                             />
                                                                         </div>
                                                                    </div>
                                                                 </div>
                                                             )}
                                                         </div>
                                                         {formik.submitCount > 0 && formik.errors.facts?.[index]?.image && (
                                                             <div className="text-danger small mt-1">
                                                                 {formik.errors.facts[index].image}
                                                             </div>
                                                         )}
                                                     </Form.Group>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section mt-4'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/about-us/facts-and-figures")}
                                            >
                                                Cancel
                                            </Button>
                                            <Button disabled={loading} type='submit' style={{background: 'linear-gradient(92deg, #57d89e9f, #03693b)', border: "none", outline: "none", marginLeft: '15px'}} >
                                                {loading ? "Loading..." : <>{id ? "Update" : "Create"}</>}
                                            </Button>
                                        </div>
                                    </Row>
                                    )}
                                </Form>
                            </div>
                        </Col>
                    </Row>
            </div>
        </Container>
    </Layout>
  )
}

export default CreateFactsAndFigures
