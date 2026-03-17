
import DataTable from "react-data-table-component";
import { MdBorderColor } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import DeleteModal from "../../deleteModal";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Form } from "react-bootstrap";

const OurAnswerTable = ({ data, handleSerialNumber, handleStatusChange, handleDelete, page, setPage, limit, setLimit, totalRows, pending }) => {
  const navigate = useNavigate();
  const [isSwal, setIsSwal] = useState({ show: false, id: null, type: null });

  const handleConfirm = () => {
      const instance_ids = isSwal.id ? parseInt(isSwal.id) : "";
      const type = isSwal.type;
      
      if (type === 'status') {
          handleStatusChange(instance_ids);
      } else {
          handleDelete(instance_ids);
      }
      setIsSwal({ show: false, id: null, type: null });
  };

  const updateStatus = (id) => {
    setIsSwal({ show: true, id: id, type: 'status' });
  }

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
      name: "Status",
      selector: (row) => row.is_active,
      cell: (row) => (
        <div className="status_wrap_datatable">
          <Form.Check
            role="button"
            type="switch"
            id="custom-switch"
            checked={row.is_active}
             onClick={() => updateStatus(row.id)}
             readOnly
          />
        </div>
      ),
      center: true,
      width: "150px",
    },
    {
      name: "Actions",
      key: "action",
      cell: (row) => (
        <div className="action-wrapper">
          <Tooltip
            title="Edit"
            disableInteractive
            onClick={() => navigate(`/about-us/create-our-answer`, { state: { id: row.id } })}
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
              setIsSwal({ ...isSwal, show: true, id: row.id, type: 'delete' });
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
          className="data-table-container"
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
        handleDelete={handleConfirm}
        message={isSwal.type === 'status' ? "Are you sure you want to change the status?" : "Are you sure you want to delete?"}
        confirmBtnText={isSwal.type === 'status' ? "Update" : "Delete"}
      />
    </>
  );
};

export default OurAnswerTable;
