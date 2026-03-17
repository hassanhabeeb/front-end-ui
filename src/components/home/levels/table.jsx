import { useState } from 'react'
import DataTable from 'react-data-table-component'
import { MdBorderColor } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../deleteModal';
import Tooltip from '@mui/material/Tooltip';
import { deleteRegionalLevels } from '../../../api/services/home';
import toast from 'react-hot-toast';

const LevelsTable = ({data, refresh}) => {
    const navigate = useNavigate();
    const [isSwal, setIsSwal] = useState({ show: false, id: null, type: null });

    const handleConfirm = () => {
        const instance_ids = isSwal.id ? isSwal.id : "";        
        setIsSwal({ show: false, id: null, type: null });
        
        deleteRegionalLevels({ id: instance_ids })((res) => {
            if (res?.status && res?.status_code === 200) {
                toast.success(res?.message || "Deleted successfully");
                if (refresh) refresh();
            } else {
                toast.error(res?.message || "Something went wrong");
            }
        });
    };    

    const handleEdit = (row) => {
        navigate("/home/create-levels", { state: { id: row?.id } });
    };

    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            width: '80px'
        },
        {
            name: 'Subtitle',
            selector: row => row.subtitle,
            sortable: true,
            grow: 1
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
                    pagination
                    className="data-table-container"
                />
            </div>
            <DeleteModal 
                isSwal={isSwal}
                setIsSwal={setIsSwal}
                handleDelete={handleConfirm}
                message={"Are you sure you want to delete?"}
                confirmBtnText={"Delete"}
            />
        </>
    )
}

export default LevelsTable
