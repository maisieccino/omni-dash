// @flow
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// TODO: Add icons
const NavItem = ({ to, label, icon, ...rest }, { router }) => {
  const match = rest.match || `${to}$`;
  return (
    <Link
      to={to}
      className={router.history.location.pathname.match(match) ? "active" : ""}
    >
      <i className={`nav-icon fa fa-${icon}`} aria-hidden="true" />
      <span className="nav-label">
        {label}
      </span>
    </Link>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  match: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(), // e.g. regex
  ]),
};

NavItem.defaultProps = {
  icon: "fa-home",
  match: null,
};

NavItem.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default NavItem;
