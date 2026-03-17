import React, { useState } from 'react';
import { Form, Button, Container, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';
import logo from "../assets/images/logo.webp";
import { useNavigate } from 'react-router-dom';
// Api
import { loginAuth } from '../api/services/auth';

function Login() { 
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
    }),
    onSubmit: values => {
        let formData = new FormData();
        formData.append("username", values.username);
        formData.append("password", values.password);        

        let props = {
          username: values.username,
          password:  values.password,
        }
        
        setLoading(true);
        
        loginAuth(props)((response) =>{
          setLoading(false);

          if(response && response.status && response?.data?.token){
            let token = response?.data?.token || '';
            let username = response?.data?.user?.username || '';

            if(token){
              localStorage.setItem("token", token);
              localStorage.setItem("username", username);
              navigate('/home/banner');
            }
            return;
          }
          toast.error("Invalid username or password");        
        })

    }
  })

  return (
    <div className="login-form d-flex align-items-center justify-content-center hvh-100 w-100">
      <div className="d-flex flex-column">
        <Container className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
            <Toaster 
              position="top-center"
              reverseOrder={true}
            />
            <div className='d-flex justify-content-center mb-5'>
              <div className='logo-box'>
                <img src={logo} className='img-fluid' alt='Echos'/>
              </div>
            </div>
            <Form onSubmit={formik.handleSubmit} id="_sign_in_form">        
              {/* Username */}
              <Form.Group className="mb-10">
                <Form.Label className="text-dark">Username</Form.Label>
                <Form.Control
                  className="form-control-lg form-control-solid"
                  id="login-username"
                  type="text"
                  name="username"
                  value={formik.values?.username}
                  onChange={formik.handleChange}
                  isValid={formik.touched.username && !formik.errors.username}
                  isInvalid={
                        formik.touched.username && !!formik.errors.username
                    }
                  autoComplete="off"
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              {/* Password */}
              <Form.Group className="mb-10 mt-4">
                <div className="d-flex justify-content-between mb-2">
                  <Form.Label className="text-dark mb-0">Password</Form.Label>
                </div>
                <InputGroup className="position-relative">
                  <Form.Control
                    className="form-control-lg form-control-solid"
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formik.values?.password}
                    onChange={formik.handleChange}
                    isValid={formik.touched.password && !formik.errors.password}
                    isInvalid={
                        formik.touched.password && !!formik.errors.password
                    }
                    autoComplete="off"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                    </Form.Control.Feedback>
                  <Button
                    variant="link"
                    className="position-absolute"
                    style={{ top: '8.3%', right: '4%', zIndex:'10' }}
                    onClick={togglePasswordVisibility}
                  >                    
                    {showPassword ? <FaEye size={17} color='#a2a6b8'/> : <IoMdEyeOff size={17} color='#a2a6b8'/> }
                  </Button>
                </InputGroup>
              </Form.Group>
              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={loading}
                  id="_sign_in_submit"
                  className="btn-lg w-100 mb-4 mt-4 c-purple border-0 hover-opacity"
                >
                  <span className="indicator-label">{loading ? 'Loading...' : 'Submit'}</span>                  
                </Button>
              </div>
            </Form>
          </Container>
      </div>
    </div>
  );
}

export default Login;
