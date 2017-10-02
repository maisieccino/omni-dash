import React from "react";
import PropTypes from "prop-types";
import * as Icon from "react-feather";

const Modal = ({ header, children, choices, onCloseButtonClick, when }) => {
  if (when) {
    return (
      <div className="modal-wrapper" role="dialog">
        <div className="modal">
          <div className="modal-header">
            <h1>{header}</h1>
            <button className="square" onClick={onCloseButtonClick}>
              <Icon.X />
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
