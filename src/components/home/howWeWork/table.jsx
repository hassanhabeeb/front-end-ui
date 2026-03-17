import DataTable from "react-data-table-component";
import { MdBorderColor } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { Tooltip } from "@mui/material";
import DeleteModal from "../../deleteModal";
import { useNavigate } from "react-router-dom";
import { deleteHowWeWork, howWeWorkStatusChange } from "../../../api/services/home";
import { Form } from "react-bootstrap";

const HowWeWorkTable = ({
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

  // Function to handle delete/status confirmation
  const handleConfirm = () => {
    const instance_ids = isSwal.id ? parseInt(isSwal.id) : "";
    const type = isSwal.type;
    setIsSwal({ show: false, id: "", type: "" });

    if (type === 'status') {
      howWeWorkStatusChange({ id: instance_ids })((res) => {
        if (res?.status && (res?.status_code == 200 || res?.status_code == 201)) {
            toast.success(res?.message || "Status updated successfully");
            setUpdate(!update);
        } else {
            toast.error(res?.message || "Failed to update status");
        }
      });
    } else {
      const payload = { id: instance_ids };

      deleteHowWeWork(payload)((res) => {
        if (res?.status && (res?.status_code == 200 || res?.status_code == 201)) {
          toast.success(res?.message || "Entry deleted successfully");
          setUpdate(!update);
        } else {
          toast.error(res?.message || "Failed to delete entry");
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
     // Description
     {
      name: "Description",
      key: "description",
      selector: (row) => row?.description,
      cell: (row) => (
        <div
          className="ellipse_email"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={row.description?.replace(/<[^>]+>/g, '')} // Strip HTML tags for tooltip
        >
          {row.description?.replace(/<[^>]+>/g, '')}
        </div>
      ),
      grow: 4,
      minWidth: "300px",
      reorder: true,
    },
    // Status
    {
      name: "Status",
      selector: (row) => row.is_active,
      cell: (row) => (
        <div className="status_wrap_datatable">
          <Form.Check
            role="button"
            type="switch"
            id={`custom-switch`}
            checked={row.is_active}
            onClick={() => updateStatus(row.id)}
            readOnly     
          />
        </div>
      ),
      center: true,
      width: "150px",
    },
    // Actions
    {
      name: "Actions",
      key: "action",
      cell: (row) => (
        <div className="action-wrapper">
          <Tooltip
            title="Edit"
            disableInteractive
            onClick={() => navigate(`/home/create-how-we-work`, { state: { id: row.id } })}
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
      />
      <DeleteModal
        isSwal={isSwal}
        setIsSwal={setIsSwal}
        handleDelete={handleConfirm}
        message={isSwal.type === 'status' ? "Are you sure you want to change the status?" : "Are you sure you want to delete?"}
        confirmBtnText={isSwal.type === 'status' ? "Update" : "Delete"}
      />
    </div>
  );
};

export default HowWeWorkTable;
