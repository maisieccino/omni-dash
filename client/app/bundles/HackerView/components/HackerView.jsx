/* eslint react/prop-types: 0 */
import React from "react";
import Navigation from "./Navigation";

const HackerView = props => (
  <div>
    <Navigation />
    <h1>Hello hackers</h1>
    <p>{ JSON.stringify(props) }</p>
  </div>
);

export default HackerView;
