
import DataTable from "react-data-table-component";
import { MdBorderColor } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import DeleteModal from "../../deleteModal";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Form } from "react-bootstrap";

const KeyHealthPrioritiesTable = ({ data, handleSerialNumber, handleDelete, page, setPage, limit, setLimit, totalRows, pending }) => {
  const navigate = useNavigate();
  const [isSwal, setIsSwal] = useState({ show: false, id: null });

  const confirmDelete = () => {
      handleDelete(isSwal.id);
      setIsSwal({ show: false, id: null });
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLimit(newPerPage);
  };

  const columns = [
    {
      name: "SL.NO",
      key: "sl_no",
      selector: (row, index) => handleSerialNumber(index),
      width: "80px",
    },
    {
      name: "Title",
      key: "title",
      selector: (row) => row?.title,
      cell: (row) => (
        <div
          className="ellipse_email"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={row.title}
        >
          {row.title}
        </div>
      ),
      grow: 2,
      minWidth: "200px",
      reorder: true,
    },    
    {
      name: "Actions",
      key: "action",
      cell: (row) => (
        <div className="action-wrapper">
          <Tooltip
            title="Edit"
            disableInteractive
            onClick={() => navigate(`/about-us/create-key-health-priorities`, { state: { id: row.id } })}
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
      grow: 1,
      width: "120px"
    },
  ];

  return (
    <>
      <div className="table-wrapp mb-5" style={{ width: "100%" }}>
        <Toaster position="top-center" />
        <DataTable
          columns={columns}
          data={data}
          striped={true}
          center={true}
          highlightOnHover
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationPerPage={limit}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          progressPending={pending}
        />
      </div>
      <DeleteModal
        isSwal={isSwal}
        setIsSwal={setIsSwal}
        handleDelete={confirmDelete}
      />
    </>
  );
};

export default KeyHealthPrioritiesTable;
