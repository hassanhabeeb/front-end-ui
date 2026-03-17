"use client"
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { IoAddCircleOutline } from 'react-icons/io5';
import { RiDeleteBin6Line } from "react-icons/ri";
import CustomEditor from "../../blogs/customEditor";
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import { createHowWeWork, getHowWeWorkDetail } from '../../../api/services/home';

const CreateHowWeWork = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  const editorRef = useRef(null);
  
  // Edit mode data
  const id = location.state?.id;  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(id) {
        getHowWeWorkDetail({ id: id })((res) => {
            if(res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
                const data = res.data;
                const mappedLevels = data?.levels?.map(item => ({
                    id: item.id || 0,
                    name: item.level_name || '',
                    description: item.level_description || '',
                    _key: Date.now() + Math.random() // Unique key for rendering
                })) || [{ name: '', description: '', _key: Date.now() }];

                formik.setValues({
                    description: data?.description || '',
                    levels: mappedLevels
                });
                
                if (editorRef.current) {
                    editorRef.current.setData(data?.description || '');
                }
            }
        });
    }
  }, [id]);

  const formik = useFormik({
    initialValues: {
        description: '',
        levels: [{ name: '', description: '', _key: Date.now() }]
    },
    validationSchema: Yup.object({}), // Validation handled manually for dynamic fields
    validate: (values) =>{
        let errors = {};
        if (!values.levels || values.levels.length === 0) {
            errors.levels = "At least one level is required";
        } else {
             const levelErrors = [];
             values.levels.forEach((level, index) => {
                 const groupErrors = {};
                 if (!level.name || !level.name.trim()) {
                     groupErrors.name = 'Level Name is required';
                 }
                 if (!level.description || !level.description.trim()) {
                     groupErrors.description = 'Level Description is required';
                 }
                 if (Object.keys(groupErrors).length > 0) {
                     levelErrors[index] = groupErrors;
                 }
             });
             if (levelErrors.length > 0) {
                 errors.levels = levelErrors;
             }
        }
        return errors;
    },
    onSubmit: values => {
        const editor=editorRef.current;        
        let ckContent = "";

        if (editor?.getData()) {
            ckContent = editor?.getData();
        }
        
        if(!ckContent && !values.description){
             if(!ckContent) {
                 toast.error("Description required");
                 return
             }
        }
        
        // Map levels to match API payload structure: level_name, level_description
        const mappedLevels = values.levels.map(level => {
            const mappedLevel = {
                level_name: level.name,
                level_description: level.description
            };
            if (level.id) {
                mappedLevel.id = level.id;
            }
            return mappedLevel;
        });

        let props = {
            description: ckContent || values.description,
            levels: mappedLevels
        };

        if (id) {
            props.id = id;
        }

        setLoading(true);
        createHowWeWork(props)((res) => {
            setLoading(false);
            if (res?.status && (res?.status_code == 200 || res?.status_code == 201)) {
                toast.success(res?.message || (id ? "Entry updated successfully" : "Entry created successfully"));
                navigate("/home/how-we-work");
            } else {
                toast.error(res?.message || "Something went wrong");
            }
        });
    }
  });    

  // Handle adding new level group
  const handleAddLevel = () => {
      const newLevel = { name: '', description: '', _key: Date.now() + Math.random() };
      formik.setFieldValue('levels', [...formik.values.levels, newLevel]);
  };

  // Handle removing level group
  const handleRemoveLevel = (index) => {
      const updatedLevels = formik.values.levels.filter((_, i) => i !== index);
      formik.setFieldValue('levels', updatedLevels);
  };

  // Handle level change
  const handleLevelChange = (e, index, field) => {
      const { value } = e.target;
      const updatedLevels = [...formik.values.levels];
      updatedLevels[index][field] = value;
      formik.setFieldValue('levels', updatedLevels);
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
                                <div className='back_btn_wrap' onClick={() => navigate("/home/how-we-work")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit How We Work" : "Create How We Work"}</h4>
                                </div>
                            </div>                                                    
                        </Col>
                        <Col md={12}>
                            <div className='volunteer-activity-form'>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row>                              
                                        {/* Description  */}
                                        <div className='col-lg-12 my-3'>                                        
                                            <Form.Group>
                                                <Form.Label>Description <span className='required'><sup>*</sup></span></Form.Label>
                                            </Form.Group>
                                            <CustomEditor editorRef={editorRef} initialData={formik.values.description}/>                                        
                                        </div>

                                        {/* Dynamic Level Groups */}
                                        <div className='col-lg-12 mt-4'>
                                            <h5>Levels Section</h5>
                                            <hr className='mb-4'/>
                                            {formik.values.levels.map((level, index) => (
                                                <div key={level._key} className="p-3 mb-3 border rounded position-relative">
                                                     {formik.values.levels.length > 1 && (
                                                        <div 
                                                            className="position-absolute" 
                                                            style={{ top: '10px', right: '10px', cursor: 'pointer', zIndex: 10, color: 'red' }}
                                                            onClick={() => handleRemoveLevel(index)}
                                                            title="Remove this level"
                                                        >
                                                            <RiDeleteBin6Line size={20} />
                                                        </div>
                                                    )}
                                                    
                                                    <Row>
                                                        {/* Level Name */}
                                                        <Col lg={6}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Level Name <span className='required'><sup>*</sup></span></Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Level Name"
                                                                    value={level.name}
                                                                    onChange={(e) => handleLevelChange(e, index, 'name')}
                                                                    isInvalid={formik.submitCount > 0 && formik.errors.levels && formik.errors.levels[index] && formik.errors.levels[index].name}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {formik.errors.levels && formik.errors.levels[index] && formik.errors.levels[index].name}
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>

                                                        {/* Level Description */}
                                                        <Col lg={12}>
                                                            <Form.Group className="mb-3 mt-3">
                                                                <Form.Label>Level Description <span className='required'><sup>*</sup></span></Form.Label>
                                                                <div className="mb-3">
                                                                    <CustomEditor 
                                                                        initialData={level.description}
                                                                        onChange={(data) => {
                                                                            const updatedLevels = [...formik.values.levels];
                                                                            updatedLevels[index]['description'] = data;
                                                                            formik.setFieldValue('levels', updatedLevels);
                                                                        }}
                                                                    />
                                                                </div>
                                                                {formik.submitCount > 0 && formik.errors.levels && formik.errors.levels[index] && formik.errors.levels[index].description && (
                                                                    <div className="text-danger small">
                                                                        {formik.errors.levels[index].description}
                                                                    </div>
                                                                )}
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ))}
                                            <div className='text-end mb-4'>
                                                <Button 
                                                    variant="outline-success" 
                                                    onClick={handleAddLevel}
                                                    className="mt-2"
                                                    style={{ borderStyle: 'dashed' }}
                                                >
                                                    <IoAddCircleOutline size={20} className="me-1" />
                                                    Add Level
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section mt-4'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/home/how-we-work")}
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

export default CreateHowWeWork
