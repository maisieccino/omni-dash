/* eslint react/prop-types: 0 */
import React from "react";

const CurrentEventCard = ({
  currentEvent,
  nextEvent,
  className,
}) => (<div className={className}>
  <div className="card-body">
    <section className="card-section">
      <h2>What{"'"}s On</h2>
      <h3>{currentEvent.name}</h3>
      <p>{currentEvent.startTime} - {currentEvent.endTime}</p>
      <p>{currentEvent.location}</p>
      <button>Learn More</button>
    </section>
    <section className="card-section">
      <h2>Coming Up Next</h2>
      <h3>{nextEvent.name}</h3>
      <p>{nextEvent.startTime} - {nextEvent.endTime}</p>
      <p>{nextEvent.location}</p>
      <button>Learn More</button>
    </section>
  </div>
  <div className="card-footer">
    <p>Hackathon Progress</p>
    <progress value="9" max="24" />
    <p>15 hours remaining</p>
  </div>
</div>);

export default CurrentEventCard;
