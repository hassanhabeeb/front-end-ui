import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import DataTable from 'react-data-table-component'
import { MdBorderColor } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import DeleteModal from '../deleteModal';
import { getFooterList, deleteFooter } from '../../api/services/footer';

const FooterTable = ({ setHasItems }) => {
    const navigate = useNavigate();
    const [isSwal, setIsSwal] = useState({ show: false, id: null });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async (page = 1, newPerPage = 10) => {
        setLoading(true);
        getFooterList({ page: page, limit: newPerPage })((res) => {
            setLoading(false);
            if (res?.status && res?.status_code === 200) {
                setData(res.data.results);
                setTotalRows(res.data.count);
                if (setHasItems) setHasItems((res?.data?.count || 0) > 0);
            }
        });
    };

    useEffect(() => {
        fetchData(currentPage, perPage);
    }, [currentPage, perPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setPerPage(newPerPage);
        setCurrentPage(page);
    };

    const handleDelete = () => {
        deleteFooter({ id: isSwal.id })((res) => {
            if (res?.status && res?.status_code === 200) {
                toast.success(res.message);
                fetchData(currentPage, perPage);
                setIsSwal({ show: false, id: null });
            } else {
                toast.error(res?.message || "Something went wrong");
                setIsSwal({ show: false, id: null });
            }
        });
    };

    const handleEdit = (row) => {
        navigate("/create-footer", { state: { id: row.id } });
    };

    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => (currentPage - 1) * perPage + index + 1,
            width: '80px'
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
            grow: 4,
            wrap: true,
            cell: row => (
                <div style={{
                    maxWidth: '600px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    padding: '8px 0'
                }}>
                    {row.description}
                </div>
            )
        },
        {
            name: 'Actions',
            key: 'action',
            cell: (row) => (
                <div className="action-wrapper">
                  <Tooltip
                    title="Edit"
                    disableInteractive
                    onClick={() => handleEdit(row)}
                  >
                    <div className="eye-wrapper">
                      {" "}
                      <MdBorderColor />{" "}
                    </div>
                  </Tooltip>
                  <Tooltip
                    title="Delete"
                    disableInteractive
                    onClick={() => {
                        setIsSwal({ ...isSwal, show: true, id: row.id });
                    }}
                  >
                    <div className="eye-wrapper">
                      {" "}
                      <RiDeleteBin6Line />{" "}
                    </div>
                  </Tooltip>
                </div>
            ),
            width: '150px'
        }
    ];

    return (
        <>
            <div className='table-wrapp mb-5' style={{ width: "100%" }}>
                 <DataTable
                    columns={columns}
                    data={data}
                    progressPending={loading}
                    striped={true}
                    center={true}
                    highlightOnHover
                    className="data-table-container"
                    pagination={true}
                    paginationServer
                    paginationTotalRows={totalRows}
                    paginationPerPage={perPage}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                />
                
            </div>
            <DeleteModal 
                isSwal={isSwal}
                setIsSwal={setIsSwal}
                handleDelete={handleDelete}
            />
        </>
    )
}

export default FooterTable
