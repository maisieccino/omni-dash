import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";

const TopNav = ({ href, title, helpText }) => (
  <div className="title-bar">
    <Link
      to={href}
      className="square button"
      aria-label="Back button"
      title={helpText}
    >
      <Icon.ArrowLeft />
    </Link>
    {title && <h1>{title}</h1>}
  </div>
);

TopNav.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string,
  helpText: PropTypes.string,
};

TopNav.defaultProps = {
  title: null,
  helpText: "Go back",
};

export default TopNav;
