
"use client"
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { IoAddCircleOutline, IoSearchOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { getWhyAyaMattersList } from '../../../api/services/aboutUs';
import WhyAyaMattersTable from './table';
import Layout from '../../layout';

const WhyAyaMatters = () => {
    const navigate = useNavigate();    
    
    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);
    
    const [isSwal, setIsSwal] = useState({
        show: false,
        id: "",
    });

    const [update, setUpdate] = useState(false);
    const [pending, setPending] = useState(false);
    
    const handleSerialNumber = (index) => {
        return page === 1 ? index + 1 : (page - 1) * limit + index + 1;
    };

    // Fetch data
    useEffect(() => {
        setPending(true);
        let props = {
            page: page,
            limit: limit,
        };

        getWhyAyaMattersList(props)((res) => {
            if (res && res.status_code === 200) {
                setData(res.data.results);
                setTotalRows(res.data.count);
                setPending(false);
            } else {
                setPending(false);
                // toast.error(res.message);
            }
        });
    }, [update, page, limit]);

    return (
        <Layout>
            <Container fluid>
                <div className='activities-list'>
                    <Row>
                        <Col md={12}>
                            <div className='title-section mt-5'>
                                <h4>Why AYA Matters</h4>
                            </div>
                            <div className='add-filter-section mt-4'>
                                <div className='main'>
                                    <div className='d-flex align-items-center justify-content-between'>   
                                        <div className='request_btn_wrapper'>
                                                                                     
                                        </div>                             
                                        <div className='add-new-btn'>
                                            <Button 
                                                disabled={totalRows > 0} 
                                                style={{background: 'linear-gradient(92deg, #57d89e9f, #03693b)', border: "none", outline: "none"}} 
                                                onClick={() => navigate("/about-us/create-why-aya-matters")}
                                            >
                                                <IoAddCircleOutline size={20} title='Create new entry'/>
                                                Create
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={12} className='mt-5'>
                            <WhyAyaMattersTable 
                                data={data} 
                                handleSerialNumber={handleSerialNumber}
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
                            />
                        </Col>
                    </Row>
                </div>
            </Container>
        </Layout>
    )
}

export default WhyAyaMatters
