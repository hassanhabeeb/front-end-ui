"use client"
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { IoAddCircleOutline } from "react-icons/io5";
import OurLibraryTable from './table';
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout';
import { getLibraryList } from '../../../api/services/home';

const OurLibrary = () => {
    const navigate = useNavigate();    
    const [search, setSearch] = useState("");
    
    const [data, setData] = useState([]);
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

    // Handle search
    const handleSearchData = (e) => {        
        setSearch(e.target.value);

        if (e.target.value == '') {
            setUpdate(!update)
        }
    }

    // Searching
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (search != '') {
                setUpdate(!update)
            }

        }, 800);
        return () => {
            clearTimeout(timeout);
        };
    }, [search]);

    // Getting data
    useEffect(() =>{
        setPending(true);

        // Function to get data
        getLibraryList({ page: page, limit: limit, search: search })((response) => {
            setPending(false);
            if (response?.status && (response?.status_code == 200 || response?.status_code == 201)) {
                setData(response?.data?.results || []);
                setTotalRows(response?.data?.count || 0);
            } else {
                setData([]);
                setTotalRows(0);
            }
        });
        
    },[update, page, limit]);

  return (
    <Layout>
      <Container fluid>
          <div className='activities-list'>
              <Row>
                  <Col md={12}>
                      <div className='title-section mt-5'>
                          <h4>Our Library</h4>
                      </div>
                      <div className='add-filter-section mt-4'>
                          <div className='main'>
                              <div className='d-flex align-items-center justify-content-between'>   
                              <div className='request_btn_wrapper'>
                                      {/* Search */}
                                      <div className='form_wrapper'>
                                          <Form className="app-search d-none d-md-block" onSubmit={(e) => e.preventDefault()}>
                                              <div className="position-relative">
                                                  <Form.Control
                                                      type="text"
                                                      className="form-control"
                                                      placeholder="Search by title"
                                                      onChange={handleSearchData}
                                                  />
                                              <span className="mdi mdi-magnify search-widget-icon" />
                                              <span
                                                  className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                                                  id="search-close-options"
                                              />
                                                  <IoSearchOutline className='search_icon' />
                                              </div>
                                          </Form>
                                      </div>                                           
                                  </div>                             
                                  <div className='add-new-btn'>
                                      <Button style={{background: 'linear-gradient(92deg, #57d89e9f, #03693b)', border: "none", outline: "none"}} onClick={() => navigate("/home/create-our-library")}>
                                          <IoAddCircleOutline size={20} title='Create new entry'/>
                                          Create
                                      </Button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </Col>
                  <Col md={12} className='mt-5'>
                      <OurLibraryTable
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
                      />
                  </Col>
              </Row>
          </div>
      </Container>
    </Layout>
  )
}

export default OurLibrary
