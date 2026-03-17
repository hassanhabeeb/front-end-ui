"use client"
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { IoAddCircleOutline } from "react-icons/io5";
import AboutTable from './table';
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout';
import { deleteAbout, getAbouts } from '../../../api/services/home';
import toast, { Toaster } from 'react-hot-toast';

const About = () => {
    const navigate = useNavigate();    
    
    const [data, setData] = useState([]);
    const [disableBtn, setDisableBtn] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);
    
    const [update, setUpdate] = useState(false);
    const [pending, setPending] = useState(false);
    
    const [isSwal, setIsSwal] = useState({
        show: false,
        id: "",
    });
        
    const handleSerialNumber = (index) => {
        return page == 1 ? index + 1 : (page - 1) * limit + index + 1;
    };

    // Getting about data
    useEffect(() =>{
        setPending(true);

        const payload = {
            page: page,
            limit: limit,
        }

        getAbouts(payload)((response) => {
            if (response?.status && (response?.status_code == 200 || response?.status_code == 201)) {
                const results = response?.data?.results || [];
                setData(results);
                setTotalRows(response?.data?.count || 0);

                if (Array.isArray(results) && results.length > 0) {
                    setDisableBtn(true);
                } else {
                    setDisableBtn(false);
                }
            } else {
                setData([]);
                setTotalRows(0);
                setDisableBtn(false);
            }
            setPending(false);
        });
        
    },[update, page, limit]);

    // Delete About
    const handleDelete = () => {
        const payload = {
            id: isSwal.id
        }

        deleteAbout(payload)((response) => {
            if (response?.status && (response?.status_code == 200 || response?.status_code == 201)) {
                toast.success(response?.message || "About deleted successfully");
                setUpdate(!update);
                setIsSwal({
                    show: false,
                    id: "",
                });
            } else {
                toast.error(response?.message || "Something went wrong");
            }
        });
    }

  return (
    <Layout>
      <Container fluid>
      <Toaster position="top-center" />
          <div className='activities-list'>
              <Row>
                  <Col md={12}>
                      <div className='title-section mt-5'>
                          <h4>About</h4>
                      </div>
                      <div className='add-filter-section mt-4'>
                          <div className='main'>
                              <div className='d-flex align-items-center justify-content-end'>                                                        
                                  <div className='add-new-btn'>
                                      <Button disabled={disableBtn} style={{background: 'linear-gradient(92deg, #57d89e9f, #03693b)', border: "none", outline: "none"}} onClick={() => navigate("/home/create-about")}>
                                          <IoAddCircleOutline size={20} title='Create new about entry'/>
                                          Create
                                      </Button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </Col>
                  <Col md={12} className='mt-5'>
                      <AboutTable
                          data={data}
                          page={page}
                          limit={limit}
                          setLimit={setLimit}
                          setPage={setPage}
                          setTotalRows={setTotalRows}
                          totalRows={totalRows}
                          update={update}
                          setUpdate={setUpdate}
                          pending={pending}                        
                          isSwal={isSwal}
                          setIsSwal={setIsSwal}
                          handleSerialNumber={handleSerialNumber}
                          handleDelete={handleDelete}                            
                      />
                  </Col>
              </Row>
          </div>
      </Container>
    </Layout>
  )
}

export default About
