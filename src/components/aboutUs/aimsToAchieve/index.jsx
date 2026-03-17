
"use client"
import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import AimsToAchieveTable from './table';
import Layout from '../../layout';
import toast from 'react-hot-toast';
import { aimsToAchieveStatusChange, deleteAimsToAchieve, getAimsToAchieveList } from '../../../api/services/aboutUs';

const AimsToAchieve = () => {
    const navigate = useNavigate();    
    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);
    const [pending, setPending] = useState(false);
    
    // Mock data for display - REMOVED

    const handleSerialNumber = (index) => {
        return page === 1 ? index + 1 : (page - 1) * limit + index + 1;
    };

    const getList = () => {
        setPending(true);
        let props = {
            page: page,
            limit: limit,
        };
        getAimsToAchieveList(props)((res) => {
            if (res && (res.status_code === 200 || res.status_code === 201)) {
                setData(res.data.results);
                setTotalRows(res.data.count);
                setPending(false);
            } else {
                setPending(false);
            }
        });
    }

    useEffect(() => {
        getList();
    }, [page, limit]);

    const handleStatusChange = (id) => {
        aimsToAchieveStatusChange({ id: id })((res) => {
            if (res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
                toast.success(res?.message || "Status updated successfully");
                getList();
            } else {
                toast.error(res?.message || "Failed to update status");
            }
        });
    };

    const handleDelete = (id) => {
        deleteAimsToAchieve({ id: id })((res) => {
            if (res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
                toast.success(res.message);
                getList();
            } else {
                toast.error(res.message);
            }
        });
    };

    return (
        <Layout>
            <Container fluid>
                <div className='activities-list'>
                    <Row>
                        <Col md={12}>
                            <div className='title-section mt-5'>
                                <h4>Aims to Achieve</h4>
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
                                                onClick={() => navigate("/about-us/create-aims-to-achieve")}
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
                            <AimsToAchieveTable 
                                data={data} 
                                handleSerialNumber={handleSerialNumber}
                                handleStatusChange={handleStatusChange}
                                handleDelete={handleDelete}
                                page={page}
                                limit={limit}
                                setLimit={setLimit}
                                setPage={setPage}
                                setTotalRows={setTotalRows}
                                totalRows={totalRows}
                                pending={pending}
                            />
                        </Col>
                    </Row>
                </div>
            </Container>
        </Layout>
    )
}

export default AimsToAchieve
