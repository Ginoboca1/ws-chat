import "../modal/Modal.css";
import { HiXCircle } from "react-icons/hi";

export const ModalConfirm = ({ setCall }) => {
  return (
    <div className="modalContainer">
      <div className="modal">
        <div className={"modalHeader"}>
          <p className={"titleModal"}>
            Are you sure you wanna call to Darth Vader?
          </p>
          <i>
            <HiXCircle className="close_icon" onClick={() => setCall(false)} />
          </i>
        </div>
        <div>
          <div className={"buttons"}>
            <button className={"btnCancel"} onClick={() => setCall(false)}>
              Cancel
            </button>
            <button className={"btnAccept"}>Call</button>
          </div>
        </div>
      </div>
    </div>
  );
};
