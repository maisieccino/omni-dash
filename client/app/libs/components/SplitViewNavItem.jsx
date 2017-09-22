// @flow
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavItem = ({ label, to, ...rest }, { router }) => {
  const match = rest.match || `${to}$`;
  return (
    <Link
      to={to}
      className={router.history.location.pathname.match(match) ? "active" : ""}
    >
      {label}
    </Link>
  );
};

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  match: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(), // e.g. regex
  ]),
};

NavItem.defaultProps = {
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
