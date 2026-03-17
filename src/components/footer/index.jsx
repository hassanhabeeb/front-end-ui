"use client"
import { useState } from 'react'
import Layout from '../layout';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { MdAdd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import FooterTable from './table';

const Footer = () => {
    const navigate = useNavigate();
    const [hasItems, setHasItems] = useState(false);    

    return (
        <Layout>
            <Container fluid>
                <div className='activities-list'>
                    <Row>
                        <Col md={12}>
                            <div className='title-section mt-5'>
                                <h4>Footer</h4>
                            </div>
                            <div className='add-filter-section mt-4'>
                                <div className='main'>
                                    <div className='d-flex align-items-center justify-content-end'>   
                                        <div className='add-new-btn'>
                                            <Button
                                                disabled={hasItems}
                                                style={{background: 'linear-gradient(92deg, #57d89e9f, #03693b)', border: "none", outline: "none"}}
                                                onClick={() => navigate("/create-footer")}
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
                             <FooterTable setHasItems={setHasItems} />
                        </Col>
                    </Row>
                </div>
            </Container>
        </Layout>
    )
}

export default Footer
