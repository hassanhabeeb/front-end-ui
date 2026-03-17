"use client"
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { IoAddCircleOutline } from "react-icons/io5";
import BrochureTable from './table';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout';
import { getBrochureList } from '../../api/services/brochure';

const Brochure = () => {
    const navigate = useNavigate();    
    
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

    // Getting brochures
    useEffect(() =>{
        setPending(true);

        const payload = {
            page: page,
            limit: limit,
        };

        getBrochureList(payload)((res) => {
            setPending(false);
            if (res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
                setData(res.data.results);
                setTotalRows(res.data.count);
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
                          <h4>Brochure</h4>
                      </div>
                      <div className='add-filter-section mt-4'>
                          <div className='main'>
                              <div className='d-flex align-items-center justify-content-end'>                                
                                  <div className='add-new-btn'>
                                      <Button disabled={totalRows > 0} style={{background: 'linear-gradient(92deg, #57d89e9f, #03693b)', border: "none", outline: "none"}} onClick={() => navigate("/create-brochure")}>
                                          <IoAddCircleOutline size={20} title='Add new brochure'/>
                                          Create
                                      </Button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </Col>
                  <Col md={12} className='mt-5'>
                      <BrochureTable
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

export default Brochure
