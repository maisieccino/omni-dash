// @flow
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// TODO: Add icons
const NavItem = ({ to, label, icon }, { router }) =>
  <Link
    to={to}
    className={to === router.history.location.pathname ? "active" : ""}
  >
    <i className={`nav-icon fa fa-${icon}`} aria-hidden="true" />
    <span className="nav-label">
      {label}
    </span>
  </Link>;

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string
};

NavItem.defaultProps = {
  icon: "fa-home"
};

NavItem.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

export default NavItem;
