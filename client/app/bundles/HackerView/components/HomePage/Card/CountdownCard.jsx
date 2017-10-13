import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const CountdownCard = ({ className, name, startTime }) => (
  <div className={className}>
    <div className="card-body">
      <h2>Countdown to {name}</h2>
      <h3>{moment(startTime).fromNow(true)} to go!</h3>
      <p>{moment(startTime).format("dddd DD MMMM YYYY")}</p>
    </div>
  </div>
);

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
