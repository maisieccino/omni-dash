import React from "react";
import PropTypes from "prop-types";
import * as Icon from "react-feather";

const flashIcon = type => {
  switch (type) {
    case "alert":
      return <Icon.AlertOctagon />;
    case "warning":
      return <Icon.AlertTriangle />;
    case "success":
      return <Icon.Check />;
    default:
      return <Icon.Info />;
  }
};

const Flash = ({ children, type, when }) =>
  when ? (
    <div className={`flash ${type}`}>
      {flashIcon(type)}
      {children}
    </div>
  ) : null;

Flash.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  when: PropTypes.bool,
};

Flash.defaultProps = {
  children: "Generic message",
  type: "",
  when: false,
};

export default Flash;
