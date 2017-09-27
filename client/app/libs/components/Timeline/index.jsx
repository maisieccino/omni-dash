import React from "react";

const Timeline = () => (
  <div className="timeline">
    <div className="timeline-side">
      <div className="timeline-line" />
    </div>
    <div className="timeline-content">
      <div className="timeline-item">
        <div className="timeline-item-header">
          <h1>React Workshop</h1>
          <h2>18:30 - 21:00</h2>
        </div>
        <p>
          In this workshop, we{"'"}ll dive straight into the world of React and
          you{"'"}ll build a responsive, interactive webapp.
        </p>
      </div>
    </div>
  </div>
);

export default Timeline;
