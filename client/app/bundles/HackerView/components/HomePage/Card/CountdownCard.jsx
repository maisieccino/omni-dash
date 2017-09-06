/* eslint react/prop-types: 0 */
import React from "react";
import moment from "moment";

const CountdownCard = ({ className, name, startTime }) =>
  <div className={className}>
    <div className="card-body">
      <h2>
        Countdown to {name}
      </h2>
      <h3>
        {moment(startTime).fromNow(true)} to go!
      </h3>
      <p>
        {moment(startTime).format("dddd DD MMMM YYYY")}
      </p>
    </div>
  </div>;

export default CountdownCard;
