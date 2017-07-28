/* eslint react/prop-types: 0 */
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <nav>
    <img alt="" src="/assets/hatch_logo.png" />
    <Link to="/">Home</Link>
    <Link to="/test">Test</Link>
    <a rel="nofollow" data-method="delete" href="/auth/sign_out">Sign Out</a>
  </nav>
);

export default Navigation;
