import React from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import * as Icon from "react-feather";

const Modal = ({ header, children, choices, onCloseButtonClick, when }) => (
  <CSSTransition timeout={300} classNames="fade" in={when}>
    {when ? (
      <div className="modal-wrapper" role="dialog">
        <div className="modal">
          <div className="modal-header">
            <h1>{header}</h1>
            <button className="yellow square" onClick={onCloseButtonClick}>
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
    ) : (
      <div />
    )}
  </CSSTransition>
);

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
