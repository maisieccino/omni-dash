/* eslint react/prop-types: 0 */
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <nav>
    <p><Link to="/">Home</Link></p>
    <p><Link to="/test">Test</Link></p>
    <p><a rel="nofollow" data-method="delete" href="/auth/sign_out">Sign Out</a></p>
  </nav>
);

export default Navigation;
