import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { IoAddCircleOutline } from "react-icons/io5";
import TheImpactTable from './table';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout';
import { getImpactList } from '../../../api/services/home';

const TheImpact = () => {
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

    // Getting data
    useEffect(() =>{
        setPending(true);

        const props = {
            page: page,
            limit: limit,
        };

        getImpactList(props)((res) => {
            setPending(false);
            if(res?.status && (res?.status_code === 200 || res?.status_code === 201)){
                let data = res?.data?.results;
                let total = res?.data?.count;
                setData(data);
                setTotalRows(total);
            }else{
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
                          <h4>The Impact</h4>
                      </div>
                      <div className='add-filter-section mt-4'>
                          <div className='main'>
                              <div className='d-flex align-items-center justify-content-end'> 
                                  <div className='add-new-btn'>
                                      <Button disabled={data?.length > 0} style={{background: 'linear-gradient(92deg, #57d89e9f, #03693b)', border: "none", outline: "none", opacity: data?.length > 0 ? 0.5 : 1}} onClick={() => navigate("/home/create-the-impact")}>
                                          <IoAddCircleOutline size={20} title='Create new entry'/>
                                          Create
                                      </Button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </Col>
                  <Col md={12} className='mt-5'>
                      <TheImpactTable
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

export default TheImpact
