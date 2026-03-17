"use client"
import { useFormik } from 'formik'
import React, { useRef, useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack, MdAdd } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import CustomEditor from '../../blogs/customEditor';
import { IoAddCircleOutline } from 'react-icons/io5';
import { createRegionalLevels, getRegionalLevelsDetail } from '../../../api/services/home';

const CreateLevels = () => {
    
  const navigate = useNavigate();
  const location = useLocation();
  // We need separate refs or handler logic for multiple editors. 
  // Since CustomEditor uses internal state/ref and onChange, we can manage state in formik.
  
  // Edit mode data
  const id = location.state?.id;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
        description: '',
        subTitle: '',
        nationalDescription: '',
        regionalDescription: '',
        regions: [{ name: '', description: '' }]
    },
    validationSchema: Yup.object({
        description: Yup.string().required('Description is required'),
        subTitle: Yup.string().required('SubTitle is required'),
        nationalDescription: Yup.string().required('National Level Description is required'),
        regionalDescription: Yup.string().required('Regional Level Description is required'),
        regions: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required('Region Name is required'),
                description: Yup.string().required('Region Description is required')
            })
        )
    }),
    onSubmit: values => {
        
        // Construct Payload
        const payload = {
            main_description: values.description,
            subtitle: values.subTitle,
            national_level_description: values.nationalDescription,
            regional_level_description: values.regionalDescription,
            main_levels: values.regions.map(r => {
                const level = {
                    region_name: r.name,
                    regional_description: r.description
                };
                if (r.id) {
                    level.id = r.id;
                }
                return level;
            })
        };

        if (id) {
            payload.id = id;
        }

        setLoading(true);
        createRegionalLevels(payload)((res) => {
            setLoading(false);
            if (res?.status && (res?.status_code == 200 || res?.status_code == 201)) {
                toast.success(res?.message || (id ? "Entry updated successfully" : "Entry created successfully"));
                navigate("/home/levels");
            } else {
                toast.error(res?.message || "Something went wrong");
            }
        });
    }
  });    

  useEffect(() => {
    if (id) {
        getRegionalLevelsDetail({ id: id })((response) => {
            if (response?.status && (response?.status_code == 200 || response?.status_code == 201)) {
                const data = response?.data;
                formik.setValues({
                    description: data?.main_description || '',
                    subTitle: data?.subtitle || '',
                    nationalDescription: data?.national_level_description || '',
                    regionalDescription: data?.regional_level_description || '',
                    regions: data?.main_levels?.map(item => ({
                        id: item.id,
                        name: item.region_name || '',
                        description: item.regional_description || ''
                    })) || [{ name: '', description: '' }]
                });
            }
        });
    }
  }, [id]);    

  const addRegion = () => {
      const updatedRegions = [...formik.values.regions, { name: '', description: '' }];
      formik.setFieldValue('regions', updatedRegions);
  };

  const removeRegion = (index) => {
      const updatedRegions = formik.values.regions.filter((_, i) => i !== index);
      formik.setFieldValue('regions', updatedRegions);
  };

  return (
    <Layout>
        <Container fluid>
            <Toaster position="top-center" />
            <div className='create-activity-section'>
                    <Row>
                        <Col md={12}>
                            <div className='title-section mt-5 mb-4 d-flex align-items-center'>
                                <div className='back_btn_wrap' onClick={() => navigate("/home/levels")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit Levels" : "Create Levels"}</h4>
                                </div>
                            </div>                                                    
                        </Col>
                        <Col md={12}>
                            <div className='volunteer-activity-form'>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row>                              
                                        {/* Main Description */}
                                        <div className="col-lg-12 mb-3">
                                            <Form.Group className="mb-3">
                                                <Form.Label>Description<span className='required'><sup>*</sup></span></Form.Label>
                                                <CustomEditor 
                                                    initialData={formik.values.description}
                                                    onChange={(data) => formik.setFieldValue('description', data)}
                                                />
                                                {formik.submitCount > 0 && formik.errors.description && (
                                                    <div className="text-danger small mt-1">{formik.errors.description}</div>
                                                )}
                                            </Form.Group>
                                        </div>

                                        {/* Sub Title */}
                                        <div className='col-lg-12 mb-3'>
                                            <Form.Group className="mb-3" controlId="subTitle">
                                                <Form.Label>SubTitle <span className='required'><sup>*</sup></span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="SubTitle"
                                                    name='subTitle'
                                                    value={formik.values?.subTitle}
                                                    onChange={formik.handleChange}
                                                    isValid={(formik.touched.subTitle) && !formik.errors.subTitle}
                                                    isInvalid={(formik.touched.subTitle) && !!formik.errors.subTitle}
                                                />
                                                <Form.Control.Feedback type="invalid">{formik.errors.subTitle}</Form.Control.Feedback>
                                            </Form.Group>
                                        </div>

                                        {/* National Level Section */}
                                        <div className="col-lg-12 mb-4">
                                            <h5 className="mb-3">National Level</h5>
                                            <hr className="mb-3" />
                                            <Form.Group className="mb-3">
                                                <Form.Label>Description<span className='required'><sup>*</sup></span></Form.Label>
                                                <CustomEditor 
                                                    initialData={formik.values.nationalDescription}
                                                    onChange={(data) => formik.setFieldValue('nationalDescription', data)}
                                                />
                                                {formik.submitCount > 0 && formik.errors.nationalDescription && (
                                                    <div className="text-danger small mt-1">{formik.errors.nationalDescription}</div>
                                                )}
                                            </Form.Group>
                                        </div>

                                        {/* Regional Level Section */}
                                        <div className="col-lg-12 mb-4">
                                            <h5 className="mb-3">Regional Level</h5>
                                            <hr className="mb-3" />
                                            <Form.Group className="mb-3">
                                                <Form.Label>Description<span className='required'><sup>*</sup></span></Form.Label>
                                                <CustomEditor 
                                                    initialData={formik.values.regionalDescription}
                                                    onChange={(data) => formik.setFieldValue('regionalDescription', data)}
                                                />
                                                {formik.submitCount > 0 && formik.errors.regionalDescription && (
                                                    <div className="text-danger small mt-1">{formik.errors.regionalDescription}</div>
                                                )}
                                            </Form.Group>
                                            
                                            {/* Regions Dynamic Group */}
                                            <div className="mt-4">
                                                <div className="d-flex align-items-center justify-content-between mb-3">
                                                    <h6 className="mb-0">Regions</h6>                                                    
                                                </div>

                                                {formik.values.regions.map((region, index) => (
                                                    <div key={index} className="p-3 mb-4" style={{ borderRadius: "8px", border: "1px solid #e0e0e0", position: 'relative' }}>
                                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                                            <h6 className="mb-0">Region {index + 1}</h6>
                                                            {formik.values.regions.length > 1 && (
                                                                <div 
                                                                    title="Delete Region"
                                                                    style={{ cursor: "pointer", color: "#dc3545" }}
                                                                    onClick={() => removeRegion(index)}
                                                                >
                                                                    <RiDeleteBin6Line size={20} />
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Region Name */}
                                                        <Form.Group className="mb-3">
                                                            <Form.Label className="mt-2">Region Name <span className='required'><sup>*</sup></span></Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Region Name"
                                                                name={`regions[${index}].name`}
                                                                value={region.name}
                                                                onChange={formik.handleChange}
                                                                isInvalid={(formik.touched.regions?.[index]?.name || formik.submitCount > 0) && !!formik.errors.regions?.[index]?.name}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {formik.errors.regions?.[index]?.name}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        {/* Region Description */}
                                                        <Form.Group className="mb-3">
                                                            <Form.Label className="mt-2">Description <span className='required'><sup>*</sup></span></Form.Label>
                                                            <CustomEditor 
                                                                initialData={region.description}
                                                                onChange={(data) => {
                                                                    formik.setFieldValue(`regions[${index}].description`, data);
                                                                }}
                                                            />
                                                            { (formik.touched.regions?.[index]?.description || formik.submitCount > 0) && formik.errors.regions?.[index]?.description && (
                                                                <div className="text-danger small mt-1">
                                                                    {formik.errors.regions[index].description}
                                                                </div>
                                                            )}
                                                        </Form.Group>
                                                    </div>
                                                ))}
                                                <div className='text-end'>
                                                    <Button 
                                                        variant="outline-success" 
                                                        onClick={addRegion}
                                                        className="mt-2"
                                                        style={{ borderStyle: 'dashed' }}
                                                    >
                                                        <IoAddCircleOutline size={20} className="me-1" />
                                                        Add Region
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section mt-4'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/home/levels")}
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

export default CreateLevels
