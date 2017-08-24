/* eslint react/prop-types: 0 */
// @flow
import React from "react";
import PropTypes from "prop-types";
import { generate } from "shortid";
import routes from "./routes";

const Navigation = ({ className, removeRoutes }) => {
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
  removeRoutes: PropTypes.arrayOf(PropTypes.string)
};

Navigation.defaultProps = {
  className: "",
  removeRoutes: []
};

export default Navigation;
