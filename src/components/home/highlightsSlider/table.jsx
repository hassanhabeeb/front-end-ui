import DataTable from "react-data-table-component";
import { MdBorderColor } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { Tooltip } from "@mui/material";
import DeleteModal from "../../deleteModal";
import { useNavigate } from "react-router-dom";
import { deleteHighlightsSlider } from "../../../api/services/home";

const HighlightsSliderTable = ({
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

  // Function to delete entry
  const handleDelete = () => {
    const instance_ids = isSwal.id ? parseInt(isSwal.id) : "";
    setIsSwal({ show: false, id: "" });

    if (instance_ids) {
        deleteHighlightsSlider({ id: instance_ids })((res) => {
            if (res?.status && (res?.status_code == 200 || res?.status_code == 201)) {
                toast.success(res?.message || "Entry deleted successfully");
                setUpdate(!update);
            } else {
                toast.error(res?.message || "Something went wrong");
            }
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
      minWidth: "300px",
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
            onClick={() => navigate(`/home/create-highlights-slider`, { state: { id: row.id } })}
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

export default HighlightsSliderTable;
