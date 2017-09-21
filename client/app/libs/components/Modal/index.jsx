import React from "react";

const Modal = () => (
  <div className="modal-wrapper">
    <div className="modal">
      <div className="modal-header">
        <h1>Modal header</h1>
        <button className="modal-close">
          <i className="fa fa-close" />
        </button>
      </div>
      <div className="modal-body">
        <p>This is a modal body</p>
      </div>
      <div className="modal-footer">
        <button>Okay</button>
        <button>Cancel</button>
      </div>
    </div>
  </div>
);

export default Modal;
