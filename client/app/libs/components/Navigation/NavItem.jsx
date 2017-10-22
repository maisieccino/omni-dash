// @flow
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";

const NavItem = ({ to, label, icon, ...rest }, { router }) => {
  const match = rest.match || `${to}$`;
  return (
    <Link
      to={to}
      className={router.history.location.pathname.match(match) ? "active" : ""}
    >
      {typeof rest.notificationCount === "number" && (
        <span className="notification-count">{rest.notificationCount}</span>
      )}
      {icon}
      <span className="nav-label">{label}</span>
    </Link>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
  match: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(), // e.g. regex
  ]),
};

NavItem.defaultProps = {
  icon: <Icon.Home aria-hidden />,
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
