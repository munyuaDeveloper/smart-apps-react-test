import React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import { ModalProp } from "../model/interfaces";

const Modal = ({ isOpen, onClose, children, isEditMode }: ModalProp) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full">
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-[550px] min-h-[400px] shadow-2xl bg-white  border-2 rounded-md">
          <div className="flex justify-between m-3">
            <h1 className="text-xl font-semibold text-red-400">{isEditMode ? "Update User Details" : "Create New User"}</h1>
            <button className="text-red-400" onClick={onClose}>
              <FaTimes className="text-2xl" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
