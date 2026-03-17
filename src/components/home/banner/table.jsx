import DataTable from "react-data-table-component";
import { MdBorderColor } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { Tooltip } from "@mui/material";
import { Form } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import moment from "moment";
import DeleteModal from "../../deleteModal";
import { useNavigate } from "react-router-dom";
import { deleteBanner } from "../../../api/services/home";

const BannerTable = ({
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

  // Function to delete banner
  const handleDelete = () => {
    const instance_ids = isSwal.id ? parseInt(isSwal.id) : "";
    
    if(instance_ids){
        deleteBanner({ id: instance_ids })((response) => {
            if (response?.status && (response?.status_code == 200 || response?.status_code == 201)) {
                toast.success(response?.message || "Banner deleted successfully");
                setUpdate(!update);
            } else {
                toast.error(response?.message || "Something went wrong");
            }
            setIsSwal({ show: false, id: "" });
        });
    }
  };

  const columns = [
    {
      name: "SL.NO",
      key: "sl_no",
      selector: (row, index) => handleSerialNumber(index),
      width: "80px",
    },
    // Main Title
    {
      name: "Main Title",
      key: "main_title",
      selector: (row) => row?.main_title,
      cell: (row) => (
        <div
          className="ellipse_email"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={row.main_title}
        >
          {row.main_title}
        </div>
      ),
      grow: 3,
      minWidth: "200px",
      reorder: true,
    },
     // Subtitle
     {
        name: "Subtitle",
        key: "subtitle",
        selector: (row) => row?.subtitle,
        cell: (row) => (
          <div
            className="ellipse_email"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={row.subtitle}
          >
            {row.subtitle}
          </div>
        ),
        grow: 2,
        minWidth: "150px",
        reorder: true,
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
          title={row.description}
          dangerouslySetInnerHTML={{ __html: row.description }} // careful with xss, but standard for rich text preview
        />
      ),
      grow: 4,
      minWidth: "250px",
      reorder: true,
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
            onClick={() => navigate(`/home/create-banner`, { state: { id: row?.id } })}
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
      grow: 2, // Reduced grow since simple icons
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
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default BannerTable;
