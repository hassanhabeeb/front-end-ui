"use client"
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { IoAddCircleOutline } from "react-icons/io5";
import BannerVideoTable from './table';
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout';
import { getBannerVideos } from '../../../api/services/home';

const BannerVideo = () => {
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
    

    // Getting banner videos
    useEffect(() =>{
        setPending(true);

        const props = {
            page: page,
            limit: limit,
        };

        getBannerVideos(props)((response) => {
             if (response?.status && (response?.status_code == 200 || response?.status_code == 201)) {
                setData(response?.data?.results || []);
                setTotalRows(response?.data?.count || 0);

                if(Array.isArray(response?.data?.results) && response?.data?.results?.length > 0){
                    setDisableBtn(true);
                } else {
                    setDisableBtn(false);
                }
            } else {
                setData([]);
                setDisableBtn(false);
            }
            setPending(false);
        });
        
    },[update, page, limit]);

  return (
    <Layout>
      <Container fluid>
          <div className='activities-list'>
              <Row>
                  <Col md={12}>
                      <div className='title-section mt-5'>
                          <h4>Banner Video</h4>
                      </div>
                      <div className='add-filter-section mt-4'>
                          <div className='main'>
                              <div className='d-flex align-items-center justify-content-end'>                                                           
                                  <div className='add-new-btn'>
                                      <Button disabled={disableBtn} style={{background: 'linear-gradient(92deg, #57d89e9f, #03693b)', border: "none", outline: "none"}} onClick={() => navigate("/home/create-banner-video")}>
                                          <IoAddCircleOutline size={20} title='Create new banner video'/>
                                          Create
                                      </Button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </Col>
                  <Col md={12} className='mt-5'>
                      <BannerVideoTable
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

export default BannerVideo
