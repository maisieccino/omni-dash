// @flow
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// TODO: Add icons
const NavItem = ({ to, label }, { router }) => (
  <Link
    to={to}
    className={to === router.history.location.pathname ? "active" : ""}
  >
    <span className="nav-label">{ label }</span>
  </Link>
);

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
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
