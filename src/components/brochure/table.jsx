import DataTable from "react-data-table-component";
import { MdBorderColor } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../deleteModal";
import { deleteBrochure, downloadBrochure } from "../../api/services/brochure";
import { BsFileEarmarkPdf } from "react-icons/bs";

const BrochureTable = ({
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

  // Function to delete brochure
  const handleDelete = () => {
    const instance_ids = isSwal.id ? parseInt(isSwal.id) : "";
    setIsSwal({ show: false, id: "" });
    
    deleteBrochure({ id: instance_ids })((res) => {
        if (res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
            toast.success(res.message);
            setUpdate(!update);
        } else {
            toast.error(res?.message || "Something went wrong");
        }
    });
  };

  // Function to download brochure
  const handleDownload = (row) => {
      downloadBrochure()((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', row.file_name || 'brochure.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  const columns = [
    {
      name: "SL.NO",
      key: "sl_no",
      selector: (row, index) => handleSerialNumber(index),
      width: "80px",
    },
    // File Name
    {
      name: "File Name",
      key: "file_name",
      selector: (row) => row?.file_name,
      cell: (row) => (
        <div
          className="ellipse_email"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={row.file_name}
        >
          {row.file_name}
        </div>
      ),
      grow: 4,
      minWidth: "250px",
      reorder: true,
    },
    // Download
    {
      name: "Download",
      key: "download",
      cell: (row) => (
        <div className="action-wrapper">
          <Tooltip
            title="Download PDF"
            disableInteractive
            onClick={() => handleDownload(row)}
          >
            <div className="eye-wrapper">
              {" "}
              <BsFileEarmarkPdf />{" "}
            </div>
          </Tooltip>
        </div>
      ),
      grow: 1,
      width: "200px",
      center: true,
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
            onClick={() => navigate(`/create-brochure`, { state: { id: row.id } })}
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

export default BrochureTable;
