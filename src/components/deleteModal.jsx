import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GoAlert } from "react-icons/go";

const DeleteModal = ({ isSwal, setIsSwal, handleDelete, message, confirmBtnText }) => {
  return (
    <div>
      <Modal
        show={isSwal?.show}
        onHide={() => setIsSwal({ ...isSwal, show: false }) }
        className="confirm-delete-modal"
        backdrop="static"
      >
        <Modal.Body>
          <GoAlert size={60} color="#2f1833" />
          <div>{message || "Are you sure you want to delete?"}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              background: "linear-gradient(92deg, #57d89e9f, #03693b)",
              border: "none",
              outline: "none",
            }}
            onClick={() => setIsSwal({ ...isSwal, show: false }) }
          >
            Cancel
          </Button>
          <Button
            style={{
              background: "linear-gradient(92deg, #57d89e9f, #03693b)",
              border: "none",
              outline: "none",
            }}
            onClick={() => handleDelete(isSwal.id) }
          >
            {confirmBtnText || "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteModal;
