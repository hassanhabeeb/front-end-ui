import { deleteModularApproach, modularApproachStatusChange } from '../../../api/services/home';
import toast, { Toaster } from 'react-hot-toast';
import DataTable from 'react-data-table-component'
import { MdBorderColor } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../deleteModal';
import Tooltip from '@mui/material/Tooltip';
import { Form } from 'react-bootstrap';

const ModularApproachTable = ({
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

    const handleConfirm = () => {
        const instance_ids = isSwal.id ? parseInt(isSwal.id) : "";
        const type = isSwal.type;
        setIsSwal({ show: false, id: "", type: "" });

        if (type === 'status') {
            modularApproachStatusChange({ id: instance_ids })((res) => {
                if (res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
                    toast.success(res?.message || "Status updated successfully");
                    setUpdate(!update);
                } else {
                    toast.error(res?.message || "Failed to update status");
                }
            });
        } else {
            const payload = { id: instance_ids };

            deleteModularApproach(payload)((res) => {
                if (res?.status && (res?.status_code === 200 || res?.status_code === 201)) {
                    toast.success(res?.message || "Entry deleted successfully");
                    setUpdate(!update);
                } else {
                    toast.error(res?.message || "Failed to delete entry");
                }
            });
        }
    };

    const handleDelete = () => {
         // Kept for backward compatibility if passed as prop, though not used in new flow
         handleConfirm();
    };

    const updateStatus = (id) => {
        setIsSwal({ show: true, id: id, type: 'status' });
    }

    const handleEdit = (row) => {
        navigate("/home/create-modular-approach", { state: { id: row.id } });
    };

    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => handleSerialNumber(index),
            width: '80px'
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
            grow: 2
        },
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
        {
            name: 'Actions',
            key: 'action',
            cell: (row) => (
                <div className="action-wrapper">
                  <Tooltip
                    title="Edit"
                    disableInteractive
                    onClick={() => handleEdit(row)}
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
            width: '150px'
        }
    ];

    return (
        <>
            <div className='table-wrapp mb-5' style={{ width: "100%" }}>
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
                    paginationRowsPerPageOptions={[10, 25, 50, 75, 100]}
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
    )
}

export default ModularApproachTable
