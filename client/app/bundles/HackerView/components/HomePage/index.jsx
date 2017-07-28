/* eslint react/prop-types: 0 */
import React from "react";

const HomePage = ({ user }) => (
  <div>
    <h1>Hello, <span className="accent">{ user.name }</span></h1>

    <div className="feed">
      <div className="feed-card">
        <h2>What{"'"}s On</h2>
        <p>React Workshop</p>
      </div>
    </div>
  </div>
);

export default HomePage;
