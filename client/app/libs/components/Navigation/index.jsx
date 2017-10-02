import React from "react";
import PropTypes from "prop-types";
import { generate } from "shortid";

const Navigation = ({ className, removeRoutes, routes }) => {
  // filter routes down using the removeRoutes prop.
  // If removeRoutes is empty, skip this to save rendering.
  const navRoutes = removeRoutes
    ? routes
        .filter(route => !removeRoutes.includes(route.props.children))
        .map(route => React.cloneElement(route, { key: generate() }))
    : routes;

  return (
    <nav className={className}>
      <div>
        <img alt="" src="/assets/hatch_logo.png" />
        {navRoutes}
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
  removeRoutes: PropTypes.arrayOf(PropTypes.string),
  routes: PropTypes.arrayOf(PropTypes.node),
};

Navigation.defaultProps = {
  className: "",
  removeRoutes: [],
  routes: [],
};

export default Navigation;
export { default as NavItem } from "./NavItem";
export { default as TopNav } from "./TopNav";
