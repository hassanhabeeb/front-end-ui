import DataTable from "react-data-table-component";
import { MdBorderColor } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { Tooltip } from "@mui/material";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../deleteModal";
import { deleteSeo, activeInactiveSeo } from '../../api/services/seo';

const SeoTable = ({
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
      activeInactiveSeo({ id: instance_ids })((response) => {
          if (response?.status || response?.status_code === 200) {
              toast.success("Status updated successfully");
              setUpdate(!update);
          } else {
              toast.error(response?.message || "Failed to update status");
          }
      });
    } else {
      // API call to delete
      deleteSeo({ id: instance_ids })(response => {
          if (response?.status_code === 200 || response?.status_code === 201) {
              toast.success(response?.message || "SEO entry deleted successfully");
              setUpdate(!update);
          } else {
              toast.error(response?.message || "Something went wrong");
          }
      });
    }
  };

  const updateSeoStatus = (id) => {
    setIsSwal({ show: true, id: id, type: 'status' });
  }

  const formatPageName = (name = "") =>{
    return name
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  const columns = [
    {
      name: "SL.NO",
      key: "sl_no",
      selector: (row, index) => handleSerialNumber(index),
      width: "80px",
    },
    // Page Name
    {
      name: "Page Name",
      key: "page_name",
      selector: (row) => row?.page_name,
      cell: (row) => (
        <div
          className="ellipse_email text-capitalize"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={formatPageName(row.page_name)}
        >
          {formatPageName(row.page_name)}
        </div>
      ),
      grow: 2,
      minWidth: "150px",
      reorder: true,
    },
    // Meta Image Title
    {
      name: "Meta Image Title",
      key: "meta_image_title",
      selector: (row) => row?.meta_image_title,
      cell: (row) => (
        <div
          className="ellipse_email"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={row.meta_image_title}
        >
          {row.meta_image_title}
        </div>
      ),
      grow: 3,
      minWidth: "200px",
      reorder: true,
    },
    // Meta Title
    {
      name: "Meta Title",
      key: "meta_title",
      selector: (row) => row?.meta_title,
      cell: (row) => (
        <div
          className="ellipse_email"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={row.meta_title}
        >
          {row.meta_title}
        </div>
      ),
      grow: 3,
      minWidth: "200px",
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
            onClick={() => updateSeoStatus(row.id)}
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
            onClick={() => navigate(`/create-seo`, {state: {id: row.id}})}
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
      minWidth: "100px",
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

export default SeoTable;
