import DataTable from "react-data-table-component";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { Tooltip } from "@mui/material";
import { FaEye } from "react-icons/fa";
import moment from "moment";
import DeleteModal from "../deleteModal";
import { useNavigate } from "react-router-dom";
import { deleteEnquiry } from "../../api/services/enquiries";

const EnquiryTable = ({
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
    

    let props = {
      id: instance_ids,
    };

    // Function to delete blog
    deleteEnquiry(props)((res) => {
        if (res?.status && res?.status_code === 200) {
            toast.success(res.message);
            setUpdate(!update);
            setIsSwal({ show: false, id: "" });
        } else {
            toast.error(res?.message || "Something went wrong");
            setIsSwal({ show: false, id: "" });
        }
    });
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
    // Name
    {
      name: "Name",
      key: "name",
      selector: (row) => `${row?.first_name} ${row?.last_name}`,
      cell: (row) => (
        <div
          className="ellipse_email text-capitalize"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={`${row?.first_name} ${row?.last_name}`}
        >
          {`${row?.first_name} ${row?.last_name}`}
        </div>
      ),
      grow: 4,
      minWidth: "250px",
      reorder: true,
    },
    // Email
    {
      name: "Email",
      key: "email",
      selector: (row) => row?.email,
      cell: (row) => (
        <div
          className="ellipse_email"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={row.email}
        >
          {row.email}
        </div>
      ),
      grow: 4,
      minWidth: "250px",
      reorder: true,
    },
    // Phone Number
    {
      name: "Phone Number",
      key: "phone_number",
      selector: (row) => row?.phone_number,
      cell: (row) => (
        <div
          className="ellipse_email"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={row.phone_number}
        >
          {row.phone_number}
        </div>
      ),
      grow: 4,
      minWidth: "250px",
      reorder: true,
    },    
    // Enquiry On
    {
      name: "Enquiry On",
      key: "enquiry_on",
      selector: (row) => row?.created_date,
      cell: (row) => (
        <div
          className="ellipse_email"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={row.created_date ? moment(row.created_date).format("LL") : ""}
        >
          {row.created_date ? moment(row.created_date).format("LL") : ""}
        </div>
      ),
      grow: 2,
      minWidth: "200px",
      reorder: true,
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
            onClick={() => navigate(`/enquiry/view/${row?.id}`)}
          >
            <div className="eye-wrapper">
              {" "}
              <FaEye />{" "}
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
    }
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
        message={"Are you sure you want to delete?"}
        confirmBtnText={"Delete"}
      />
    </div>
  );
};

export default EnquiryTable;
