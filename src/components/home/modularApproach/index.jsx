"use client"
import { useEffect, useState } from 'react'
import Layout from '../../layout';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import ModularApproachTable from './table';
import { getModularApproachList } from '../../../api/services/home';

const ModularApproach = () => {
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

    // Getting modular approach list
    useEffect(() =>{
        setPending(true);

        const props = {
            page: page,
            limit: limit,
        };

        getModularApproachList(props)((response) => {
            if (response?.status && response?.status_code === 200) {
                // Assuming links, count, results structure based on previous interaction
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
                                <h4>Modular Approach</h4>
                            </div>
                            <div className='add-filter-section mt-4'>
                                <div className='main'>
                                    <div className='d-flex align-items-center justify-content-end'>   
                                        <div className='add-new-btn'>
                                            <Button disabled={disableBtn} style={{background: 'linear-gradient(92deg, #57d89e9f, #03693b)', border: "none", outline: "none"}} onClick={() => navigate("/home/create-modular-approach")}>
                                                <IoAddCircleOutline size={20} title='Create new entry'/>
                                                Create
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={12} className='mt-5'>
                             <ModularApproachTable 
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

export default ModularApproach
