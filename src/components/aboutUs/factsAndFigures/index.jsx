"use client"
import { useState, useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import FactsAndFiguresTable from './table';
import Layout from '../../layout';
import { getFactsAndFiguresList } from '../../../api/services/aboutUs';

const FactsAndFigures = () => {
    const navigate = useNavigate();    
    // const [search, setSearch] = useState(""); // Search removed as per requirement
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);

    const getData = () => {
        setLoading(true);
        getFactsAndFiguresList({})((response) => {
            setLoading(false);
            if (response?.status && response?.status_code === 200) {
                setData(response.data);
            } else {
                setData([]);
            }
        });
    };

    useEffect(() => {
        getData();
    }, [update]);

    const handleSerialNumber = (index) => {
        return index + 1;
    };

    return (
        <Layout>
            <Container fluid>
                <div className='activities-list'>
                    <Row>
                        <Col md={12}>
                            <div className='title-section mt-5'>
                                <h4>Facts and Figures</h4>
                            </div>
                            <div className='add-filter-section mt-4'>
                                <div className='main'>
                                    <div className='d-flex align-items-center justify-content-between'>   
                                        <div className='request_btn_wrapper'>
                                            {/* Search box removed */}                                         
                                        </div>                             
                                        <div className='add-new-btn'>
                                            <Button 
                                                style={{background: 'linear-gradient(92deg, #57d89e9f, #03693b)', border: "none", outline: "none"}} 
                                                onClick={() => navigate("/about-us/create-facts-and-figures")}
                                                disabled={data.length > 0} // Disable if items exist
                                                title={data.length > 0 ? "Only one entry allowed" : "Create new entry"}
                                            >
                                                <IoAddCircleOutline size={20}/>
                                                Create
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={12} className='mt-5'>
                            <FactsAndFiguresTable 
                                data={data} 
                                handleSerialNumber={handleSerialNumber}
                                update={update}
                                setUpdate={setUpdate}
                            />
                        </Col>
                    </Row>
                </div>
            </Container>
        </Layout>
    )
}

export default FactsAndFigures
