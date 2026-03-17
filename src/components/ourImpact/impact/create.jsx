"use client"
import { useFormik } from 'formik'
import React, { useEffect, useState, useRef } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { IoAddCircleOutline } from 'react-icons/io5';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import CustomEditor from "../../blogs/customEditor";
import { createOurImpact, getOurImpactDetail } from '../../../api/services/ourImpact';

const CreateOurImpact = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  const editorRef = useRef(null);
  
  // Edit mode data
  const id = location.state?.id;
  
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
        description: '',
        key_points: [{ localId: Math.random(), point: '' }]
  });

  useEffect(() => {
    if (id) {
        getOurImpactDetail({ id: id })((response) => {
            if (response?.status && response?.status_code === 200) {
                const data = response.data;
                const points = data.points || [];
                setInitialValues({
                    description: data.description || '',
                    key_points: points.map(item => ({
                        localId: Math.random(),
                        id: item.id,
                        point: item.point
                    })) || [{ localId: Math.random(), point: '' }]
                });
            }
        });
    }
  }, [id]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
        // description: Yup.string().required('Description is required') // Handled manually for CKEditor
    }),
    validate: (values) =>{
         let errors = {};
         if (values.key_points && values.key_points.length > 0) {
             const keyPointErrors = [];
             values.key_points.forEach((point, index) => {
                 const groupErrors = {};
                 if (!point.point || !point.point.trim()) {
                     groupErrors.point = 'Point is required';
                 }
                 if (Object.keys(groupErrors).length > 0) {
                     keyPointErrors[index] = groupErrors;
                 }
             });
             if (keyPointErrors.length > 0) {
                 errors.key_points = keyPointErrors;
             }
         }
         return errors;
     },
    onSubmit: values => {
        setLoading(true);
        const editor = editorRef.current;        
        let ckContent = "";

        if (editor?.getData()) {
            ckContent = editor?.getData();
        }
        
        if(!ckContent && !values.description){
             setLoading(false);
             if(!ckContent) {
                 toast.error("Description required");
                 return
             }
        }

        let payload = {  
            description: ckContent || values.description,
            impact_points: values.key_points.map(item => {
                let pointData = {
                    point: item.point
                };
                if(item.id){
                    pointData.id = item.id;
                }
                return pointData;
            })
        };

        if(id) {
            payload.id = id;
        }

        createOurImpact(payload)((res) => {
            setLoading(false);
            if (res?.status && (res?.status_code == 200 || res?.status_code == 201)) {
                toast.success(res.message);
                navigate("/our-impact/impact");
            } else {
                toast.error(res.message);
            }
        });
    }
  });    

  // Handle adding new key point
  const handleAddKeyPoint = () => {
      const newPoint = { localId: Math.random(), point: '' };
      formik.setFieldValue('key_points', [...formik.values.key_points, newPoint]);
  };

  // Handle remaining key point
  const handleRemoveKeyPoint = (index) => {
      const updatedPoints = formik.values.key_points.filter((_, i) => i !== index);
      formik.setFieldValue('key_points', updatedPoints);
  };

  // Handle key point change
  const handleKeyPointChange = (e, index) => {
      const { value } = e.target;
      const updatedPoints = [...formik.values.key_points];
      updatedPoints[index].point = value;
      formik.setFieldValue('key_points', updatedPoints);
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
                                <div className='back_btn_wrap' onClick={() => navigate("/our-impact/impact")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit Impact" : "Create Impact"}</h4>
                                </div>
                            </div>                                                    
                        </Col>
                        <Col md={12}>
                            <div className='volunteer-activity-form'>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row>                              
                                        {/* Description */}
                                        <div className='col-lg-12'>
                                            <Form.Group className="mb-3" controlId="description">
                                                <Form.Label>Description <span className='required'><sup>*</sup></span></Form.Label>
                                                <CustomEditor editorRef={editorRef} initialData={formik.values.description}/>
                                            </Form.Group>
                                        </div>

                                        {/* Dynamic Key Points */}
                                        <div className='col-lg-12 mt-4'>
                                            <h5>Key Points</h5>
                                            <hr className='mb-4'/>
                                            {formik.values.key_points.map((item, index) => (
                                                <div key={item.localId || index} className="d-flex align-items-center mb-3 gap-2">
                                                    <Form.Group className="flex-grow-1">
                                                        <Form.Label>Point {index + 1} <span className='required'><sup>*</sup></span></Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Key Point"
                                                            value={item.point}
                                                            onChange={(e) => handleKeyPointChange(e, index)}
                                                            isInvalid={formik.submitCount > 0 && formik.errors.key_points && formik.errors.key_points[index] && formik.errors.key_points[index].point}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {formik.errors.key_points && formik.errors.key_points[index] && formik.errors.key_points[index].point}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    
                                                     <div className="mt-4 pt-1">
                                                        <Button 
                                                            variant="outline-danger" 
                                                            size="sm"
                                                            onClick={() => handleRemoveKeyPoint(index)}
                                                            title="Remove point"
                                                            disabled={formik.values.key_points.length === 1}
                                                        >
                                                            <RiDeleteBin6Line size={20} />
                                                        </Button>
                                                     </div>
                                                </div>
                                            ))}
                                            <div className='text-end mb-4'>
                                                <Button 
                                                    variant="outline-success" 
                                                    onClick={handleAddKeyPoint}
                                                    className="mt-2"
                                                    style={{ borderStyle: 'dashed' }}
                                                >
                                                    <IoAddCircleOutline size={20} className="me-1" />
                                                    Add Point
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section mt-4'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/our-impact/impact")}
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

export default CreateOurImpact
