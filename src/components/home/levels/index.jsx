"use client"
import React, { useEffect, useState } from 'react';
import Layout from '../../layout';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { MdAdd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import LevelsTable from './table';
import { getRegionalLevelsList } from '../../../api/services/home';

const Levels = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = () => {
        setLoading(true);
        getRegionalLevelsList()((res) => {
            setLoading(false);
            if (res?.status && res?.status_code === 200) {
                setData(res.data.results);
            } else {
                setData([]);
            }
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Layout>
            <Container fluid>
                <div className='activities-list'>
                    <Row>
                        <Col md={12}>
                            <div className='title-section mt-5'>
                                <h4>How We Work</h4>
                            </div>
                            <div className='add-filter-section mt-4'>
                                <div className='main'>
                                    <div className='d-flex align-items-center justify-content-end'>   
                                        <div className='add-new-btn'>
                                            <Button 
                                                disabled={data.length > 0} 
                                                style={{
                                                    background: 'linear-gradient(92deg, #57d89e9f, #03693b)', 
                                                    border: "none", 
                                                    outline: "none",
                                                    cursor: data.length > 0 ? 'not-allowed' : 'pointer'
                                                }} 
                                                onClick={() => navigate("/home/create-levels")}
                                            >
                                                <MdAdd size={20} title='Create new entry'/>
                                                Create
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={12} className='mt-5'>
                             <LevelsTable data={data} refresh={getData} />
                        </Col>
                    </Row>
                </div>
            </Container>
        </Layout>
    )
}

export default Levels
