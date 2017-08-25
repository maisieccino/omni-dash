// @flow
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavItem = ({ label, to }, { router }) =>
  <Link
    to={to}
    className={router.history.location.pathname === to ? "active" : ""}
  >
    {label}
  </Link>;

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
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
