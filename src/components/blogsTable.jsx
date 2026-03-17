import DataTable from "react-data-table-component";
import { MdBorderColor } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { Tooltip } from "@mui/material";
import { Form } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import moment from "moment";
import DeleteModal from "./deleteModal";
import { useNavigate } from "react-router-dom";

const BlogsTable = ({
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

  // Function to delete blog
  const handleDelete = () => {
    const instance_ids = isSwal.id ? parseInt(isSwal.id) : "";
    setIsSwal({ show: false, id: "" });

    let props = {
      id: [instance_ids],
    };

    // Function to delete blog
    
  };

  const updateBlogStatus = (id, status) =>{
  }

  const columns = [
    {
      name: "SL.NO",
      key: "sl_no",
      selector: (row, index) => handleSerialNumber(index),
      width: "80px",
    },
    // Title
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
      grow: 4,
      minWidth: "250px",
      reorder: true,
    },
    // Date
    {
      name: "Date",
      key: "date",
      selector: (row) => row?.date,
      cell: (row) => (
        <div
          className="ellipse_email"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={row.date ? moment(row.date).format("LL") : ""}
        >
          {row.date ? moment(row.date).format("LL") : ""}
        </div>
      ),
      grow: 2,
      minWidth: "200px",
      reorder: true,
    },
    // Posted By
    {
      name: "Posted By",
      key: "posted_by",
      selector: (row) => row?.posted_by,
      cell: (row) => (
        <div
          className="ellipse_email"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={row.posted_by}
        >
          {row.posted_by}
        </div>
      ),
      grow: 2,
      minWidth: "150px",
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
            id="custom-switch"
            checked={row.is_active}
            onClick={() => updateBlogStatus(row.id, !row.is_active)}
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
            title="View"
            disableInteractive
            onClick={() => navigate(`/create-blog`)}
          >
            <div className="eye-wrapper">
              {" "}
              <FaEye />{" "}
            </div>
          </Tooltip>
          <Tooltip
            title="Edit"
            disableInteractive
            onClick={() => navigate(`/create-blog`)}
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
      grow: 2,
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
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default BlogsTable;
