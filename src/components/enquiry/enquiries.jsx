"use client";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { RiFileExcel2Line } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Layout from "../layout";
import EnquiryTable from "./enquiryTable";
import { getEnquiriesList, exportEnquiries } from "../../api/services/enquiries";

const Enquiries = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const [data, setData] = useState([]);

  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  const [update, setUpdate] = useState(false);
  const [pending, setPending] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [isSwal, setIsSwal] = useState({
    show: false,
    id: "",
  });

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleSerialNumber = (index) => {
    return page == 1 ? index + 1 : (page - 1) * limit + index + 1;
  };

  // Handle search
  const handleSearchData = (e) => {
    setSearch(e.target.value);

    if (e.target.value == '') {
        setUpdate(!update)
    }
  };

  // Searching
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search != "") {
        setUpdate(!update);
      }
    }, 800);
    return () => {
      clearTimeout(timeout);
    };
  }, [search]);


  // Getting enquiries
  useEffect(() => {
    setPending(true);
    getEnquiriesList({
        page: page,
        limit: limit,
        search: search
    })((res) => {
        setPending(false);
        if (res?.status && res?.status_code === 200) {
            let fetchedData = res?.data?.results || [];
            let total = res?.data?.count || 0;

             // Handle direct array response (based on user provided JSON)
            if(Array.isArray(res?.data)){
                fetchedData = res?.data;
                total = res?.data?.length;
            }

            setData(fetchedData);
            setTotalRows(total);
        } else {
            setData([]);
            setTotalRows(0);
        }
    });
  }, [update, page, limit]);





  const handleExport = () => {
    setIsExporting(true);
    exportEnquiries()((res) => {
        setIsExporting(false);
        if (res?.data) {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Enquiries.xls');
            document.body.appendChild(link);
            link.click();
        }
    });
  }

  return (
    <Layout>
      <Container fluid>
        <div className="activities-list">
          <Row>
            <Col md={12}>
                <div className="title-section mt-5">
                    <h4>Enquiries</h4>
                </div>
                <div className="add-filter-section mt-4">
                    <div className="main">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="request_btn_wrapper">
                                {/* Search */}
                                <div className="form_wrapper px-3">
                                    <Form
                                        className="app-search d-none d-md-block"
                                        onSubmit={(e) => e.preventDefault()}
                                    >
                                        <div className="position-relative px-2">
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                placeholder="Search by name or email"
                                                onChange={handleSearchData}
                                            />
                                            <span className="mdi mdi-magnify search-widget-icon" />
                                            <span
                                                className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                                                id="search-close-options"
                                            />
                                            <IoSearchOutline className="search_icon" />
                                        </div>
                                    </Form>
                                </div>
                            </div>
                            <div className="add-new-btn">
                                <Button
                                    className="d-flex align-items-center"
                                    style={{ background: '#217346', border: "none", outline: "none", gap: "5px" }}
                                    onClick={handleExport}
                                    disabled={isExporting}
                                >
                                    <RiFileExcel2Line size={20} />
                                    {isExporting ? 'Exporting...' : 'Export Excel'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
            <Col md={12} className="mt-5">
              <EnquiryTable
                data={data}
                page={page}
                limit={limit}
                setLimit={setLimit}
                setPage={setPage}
                setTotalRows={setTotalRows}
                totalRows={totalRows}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                update={update}
                setUpdate={setUpdate}
                pending={pending}
                handleRowSelected={handleRowSelected}
                isSwal={isSwal}
                setIsSwal={setIsSwal}
                handleSerialNumber={handleSerialNumber}
              />
            </Col>
          </Row>
        </div>
      </Container>
    </Layout>
  );
};

export default Enquiries;
