
"use client"
import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import OurAnswerTable from './table';
import Layout from '../../layout';
import toast from 'react-hot-toast';
import { deleteOurAnswer, getOurAnswerList, ourAnswerStatusChange } from '../../../api/services/aboutUs';

const OurAnswer = () => {
    const navigate = useNavigate();    
    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);
    const [pending, setPending] = useState(false);
    const [isSwal, setIsSwal] = useState({
        show: false,
        id: "",
    });

    const handleSerialNumber = (index) => {
        return page === 1 ? index + 1 : (page - 1) * limit + index + 1;
    };

    const getList = () => {
        setPending(true);
        let props = {
            page: page,
            limit: limit,
        };
        getOurAnswerList(props)((res) => {
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

    // For delete:
    const handleDelete = (id) => {
        deleteOurAnswer({ id: id })((res) => {
            if (res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
                toast.success(res.message);
                getList();
            } else {
                toast.error(res.message);
            }
        });
    };

    const handleStatusChange = (id) => {
        ourAnswerStatusChange({ id: id })((res) => {
            if (res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
                toast.success(res?.message || "Status updated successfully");
                getList();
            } else {
                toast.error(res?.message || "Failed to update status");
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
                                <h4>Our Answer</h4>
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
                                                onClick={() => navigate("/about-us/create-our-answer")}
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
                            <OurAnswerTable 
                                data={data} 
                                handleSerialNumber={handleSerialNumber}
                                handleDelete={handleDelete}
                                handleStatusChange={handleStatusChange}
                                page={page}
                                limit={limit}
                                setLimit={setLimit}
                                setPage={setPage}
                                setTotalRows={setTotalRows}
                                totalRows={totalRows}
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

export default OurAnswer
