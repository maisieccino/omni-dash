/* eslint react/prop-types: 0 */
import React from "react";

const HomePage = ({ user }) => (
  <div>
    <h1>Hello, { user.name }</h1>
  </div>
);

export default HomePage;
