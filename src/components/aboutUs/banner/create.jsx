"use client"
import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../layout';
import CustomEditor from "../../blogs/customEditor";
import { createAboutUsBanner, getAboutUsBannerDetail } from '../../../api/services/aboutUs';

const CreateBanner = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  const editorRef = useRef();
  
  // Edit mode data: passing ID only now
  const id = location.state?.id; 

  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
      title: '',
      description: ''
  });

  useEffect(() => {
    if (id) {
        getAboutUsBannerDetail({ id: id })((response) => {
            if (response?.status && response?.status_code === 200) {
                const data = response.data;
                setInitialValues({
                    title: data.title || '',
                    description: data.description || ''
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
    }),
    onSubmit: values => {
        const editor = editorRef.current;        
        let ckContent = "";

        if (editorRef.current) {
            ckContent = editorRef.current.getData();
        } else {
            ckContent = values.description;
        }
        
        if(!ckContent){
            toast.error("Description required");
            return
        }

        setLoading(true);

        let props = {  
            title: values.title,
            description: ckContent || values.description            
        };

        if(id){
            props.id = id;
        }

        createAboutUsBanner(props)((response) => {
            setLoading(false);
            if (response?.status && (response?.status_code === 200 || response?.status_code === 201)) {
                toast.success(response?.message || (id ? "Entry updated successfully" : "Entry created successfully"));
                navigate("/about-us/banner");
            } else {
                toast.error(response?.message || "Something went wrong");
            }
        });
    }
  });    
  
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
                                <div className='back_btn_wrap' onClick={() => navigate("/about-us/banner")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{id ? "Edit Banner" : "Create Banner"}</h4>
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

                                        {/* Description  */}
                                        <div className='col-lg-12 my-3'>                                        
                                            <Form.Group>
                                                <Form.Label>Description <span className='required'><sup>*</sup></span></Form.Label>
                                            </Form.Group>
                                            {/* Custom Editor */}
                                            <CustomEditor editorRef={editorRef} initialData={formik.values.description}/>                                        
                                        </div>
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section mt-4'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/about-us/banner")}
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

export default CreateBanner
