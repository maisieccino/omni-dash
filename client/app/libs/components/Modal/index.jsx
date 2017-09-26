import React from "react";
import PropTypes from "prop-types";

const Modal = ({ header, children, choices, onCloseButtonClick, when }) => {
  if (when) {
    return (
      <div className="modal-wrapper" role="dialog">
        <div className="modal">
          <div className="modal-header">
            <h1>{header}</h1>
            <button className="modal-close" onClick={onCloseButtonClick}>
              <i className="fa fa-close" />
            </button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            {choices.length ? (
              choices
            ) : (
              <button onClick={onCloseButtonClick}>Okay</button>
            )}
          </div>
        </div>
      </div>
    );
  }
  return <div />;
};

Modal.propTypes = {
  header: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onCloseButtonClick: PropTypes.func,
  choices: PropTypes.arrayOf(PropTypes.node),
  when: PropTypes.bool,
};

Modal.defaultProps = {
  header: "Modal",
  children: "This modal has no content",
  onCloseButtonClick: () => {},
  choices: [],
  when: false,
};

export default Modal;
