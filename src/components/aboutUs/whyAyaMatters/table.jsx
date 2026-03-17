import DataTable from "react-data-table-component";
import { MdBorderColor } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import DeleteModal from "../../deleteModal";
import toast, { Toaster } from "react-hot-toast";
import { Form } from "react-bootstrap";
import { deleteWhyAyaMatters, whyAyaMattersStatusChange } from "../../../api/services/aboutUs";
import React, { useState } from "react";

const WhyAyaMattersTable = ({
  data,
  setPage,
  limit,
  setLimit,
  isSwal,
  setIsSwal,
  update,
  setUpdate,
  totalRows,
  pending,
  handleSerialNumber,
}) => {
  const navigate = useNavigate();
  // const [isSwal, setIsSwal] = useState({ show: false, id: null, type: null }); // usage from props

  const handleConfirm = () => {
    const instance_ids = isSwal.id ? parseInt(isSwal.id) : "";
    const type = isSwal.type;
    setIsSwal({ show: false, id: "", type: "" });

    if (type === 'status') {
      whyAyaMattersStatusChange({ id: instance_ids })((res) => {
        if (res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
            toast.success(res?.message || "Status updated successfully");
            setUpdate(!update);
        } else {
            toast.error(res?.message || "Failed to update status");
        }
      });
    } else {
        let props = {
            id: instance_ids
        }
        deleteWhyAyaMatters(props)((res) => {
            if (res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
                toast.success(res.message);
                setUpdate(!update);
            } else {
                toast.error(res.message);
            }
        });
    }
  };

  const updateStatus = (id) => {
    setIsSwal({ show: true, id: id, type: 'status' });
  }

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
            onClick={() => navigate(`/about-us/create-why-aya-matters`, { state: { id: row.id } })}
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

  const handleDelete = () => {
    // Kept for backward compatibility if passed as prop, though not used in new flow
    handleConfirm();
  };

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
            onChangePage={(page) => {
                setPage(page);        
            }}
            onChangeRowsPerPage={(perPage) => {
                setLimit(perPage);        
            }}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            progressPending={pending}
            paginationPerPage={limit}
            paginationRowsPerPageOptions={[25, 50, 75, 100]}
            className="data-table-container"
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

export default WhyAyaMattersTable;
