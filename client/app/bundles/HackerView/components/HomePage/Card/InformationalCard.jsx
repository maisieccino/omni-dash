import React from "react";
import PropTypes from "prop-types";

const InformationalCard = ({ className, title, children }) => (
  <div className={className}>
    <h2>{title}</h2>
    <div className="card-body">{children}</div>
  </div>
);

InformationalCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};

InformationalCard.defaultProps = {
  className: "",
  title: "Information",
  children: (
    <p>
      <i>This card has no content</i>
    </p>
  ),
};

export default InformationalCard;
