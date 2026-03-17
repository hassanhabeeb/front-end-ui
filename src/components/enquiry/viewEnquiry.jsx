import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Card, Table, Col, Row } from "react-bootstrap";
import Layout from "../layout";
import { getEnquiryDetails } from "../../api/services/enquiries";
import moment from "moment";

const ViewEnquiry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    getEnquiryDetails({id: id})((res) => {
        if (res?.status && res?.status_code === 200) {
            setData(res.data);
        } else {
            setData(null);
        }
    });
  }, [id]);

  if (!data) {
    return (
      <Layout>
         <Container fluid>
            <div className="title-section mt-5">
                <h4>Loading...</h4>
            </div>
         </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container fluid>
        <div className="activities-list">
          <Row>
            <Col md={12}>
                <div className="title-section mt-5">
                    <h4>Enquiry Details</h4>
                </div>
            </Col>
            <Col md={12} className="mt-4">
              <Card className="shadow-sm border-0">
                <Card.Body className="p-0">
                  <Table bordered hover responsive className="mb-0">
                    <tbody>
                      <tr>
                        <td className="fw-medium text-muted">Name</td>
                        <td>{`${data?.first_name} ${data?.last_name}`}</td>
                      </tr>
                      <tr>
                        <td className="fw-medium text-muted">Email</td>
                        <td className="text-info">{data?.email}</td>
                      </tr>
                      <tr>
                        <td className="fw-medium text-muted">Phone Number</td>
                        <td>{data?.phone_number}</td>
                      </tr>
                      <tr>
                        <td className="fw-medium text-muted">Enquiry On</td>
                        <td>{data?.created_date ? moment(data?.created_date).format("LL") : "-"}</td>
                      </tr>
                      <tr>
                        <td className="fw-medium text-muted">Message</td>
                        <td>{data?.message}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
              <div className="d-flex justify-content-end mt-4 mb-5 add-new-btn">
                <Button style={{background: 'linear-gradient(92deg, #57d89e9f, #03693b)', border: "none", outline: "none"}} onClick={() => navigate("/enquiries")}>
                  Back
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </Layout>
  );
};

export default ViewEnquiry;
