import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import { MdArrowBack } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../layout';
import { useDropzone } from 'react-dropzone';
import { IoCloudUploadOutline } from "react-icons/io5";
import { createBrochure, getBrochureDetail, downloadBrochure } from '../../api/services/brochure';
import { BsFileEarmarkPdf } from "react-icons/bs";

const CreateBrochure = () => {   
    
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [fileDetails, setFileDetails] = useState(null);
  
  const formik = useFormik({
    initialValues: {
        file: null,
    },
    validationSchema: Yup.object().shape({
        file: Yup.mixed().test("required", "A PDF file is required", (value) => {
            if (location.state?.id) return true; // Optional on edit
            return value != null;
        }),
    }),
    onSubmit: values => {
        setLoading(true);
        const formData = new FormData();
        if (location.state?.id) {
            formData.append("id", location.state.id);
        }
        if (values.file) {
            formData.append("file", values.file);
        }
        

        createBrochure(formData)((res) => {
            setLoading(false);
            if (res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
                toast.success(res.message);
                navigate("/brochures");
            } else {
                toast.error(res?.message || "Something went wrong");
            }
        });
    }
  });    

  // Function to download brochure
  const handleDownload = (id, fileName) => {
      downloadBrochure()((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName || 'brochure.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  useEffect(() => {
    if (location.state?.id) {
        getBrochureDetail({ id: location.state.id })((res) => {
            if (res?.status && res?.status_code === 200) {
                setFileDetails(res.data);
            }
        });
    }
  }, [location.state?.id]); 

  // Dropzone configuration
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    onDrop: acceptedFiles => {
      formik.setFieldValue("file", acceptedFiles[0]);
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
                                <div className='back_btn_wrap' onClick={() => navigate("/brochures")}>
                                    <MdArrowBack size={24}/>
                                </div>
                                <div className='title-txt'>
                                    <h4>{location.state?.id ? "Update" : "Create"} Brochure</h4>
                                </div>
                            </div>                                                    
                        </Col>
                        <Col md={12}>
                            <div className='volunteer-activity-form'>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row>
                                        {/* File Upload */}
                                        <div className='col-lg-12 mb-3'>
                                            <Form.Label>Upload PDF<span className='required'><sup>*</sup></span></Form.Label>
                                            <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #cccccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
                                                <input {...getInputProps()} />
                                                <IoCloudUploadOutline size={40} color="#03693b" />
                                                <p>Drag and drop a PDF file here, or click to select one</p>
                                                {formik.values.file && (
                                                    <p className="mt-2 text-success">Selected file: {formik.values.file.name}</p>
                                                )}
                                                {!formik.values.file && fileDetails?.file_name && (
                                                     <div className="mt-2 d-flex align-items-center justify-content-center gap-2">
                                                         <p className="mb-0 text-success">Current file: {fileDetails.file_name}</p>
                                                         <BsFileEarmarkPdf 
                                                            size={20} 
                                                            className="text-primary cursor-pointer" 
                                                            style={{ cursor: "pointer" }}
                                                            title="Download current file"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDownload(location.state.id, fileDetails.file_name);
                                                            }}
                                                         />
                                                     </div>
                                                )}
                                            </div>
                                            {formik.touched.file && formik.errors.file ? (
                                                <div className="text-danger mt-1">{formik.errors.file}</div>
                                            ) : null}
                                        </div>
                                        
                                        <div className='col-lg-12 d-flex align-items-center justify-content-end btn-section'>
                                            <Button                                             
                                                style={{backgroundColor: '#f2f4fa', border: "none", outline: "none", color: "#545454"}} 
                                                onClick={() => navigate("/brochures")}
                                            >
                                                Cancel
                                            </Button>
                                            <Button 
                                                disabled={loading || (location.state?.id && !formik.values.file)} 
                                                type='submit' 
                                                style={{background: 'linear-gradient(92deg, #57d89e9f, #03693b)', border: "none", outline: "none", marginLeft: '15px'}} 
                                            >
                                                {loading ? "Loading..." : (location.state?.id ? "Update" : "Create")}
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

export default CreateBrochure
