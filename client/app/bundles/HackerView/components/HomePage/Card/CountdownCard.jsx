import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const CountdownCard = ({ className, name, startTime }) => {
  const timeToStart = moment.duration(moment(startTime).diff(moment()));
  return (
    <div className={className}>
      <div className="card-body">
        <h2>Countdown to {name}</h2>
        <p className="center">
          {moment(startTime).format("dddd DD MMMM YYYY")}
        </p>
        <div className="flex horizontal center-items">
          <div className="flex center">
            <h3>{Math.floor(timeToStart.asDays())}</h3>
            <p>Days</p>
          </div>
          <div className="flex center">
            <h3>{timeToStart.hours()}</h3>
            <p>Hours</p>
          </div>
          <div className="flex center">
            <h3>{timeToStart.minutes()}</h3>
            <p>Minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

CountdownCard.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  startTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
};

CountdownCard.defaultProps = {
  className: "",
  name: "Event",
  startTime: Date.now(),
};

export default CountdownCard;
