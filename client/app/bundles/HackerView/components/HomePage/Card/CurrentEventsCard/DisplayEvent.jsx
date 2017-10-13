import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const DisplayEvent = ({ name, startTime, endTime, location }) => (
  <div>
    <h3>{name}</h3>
    <p>
      {startTime
        ? `${moment(startTime).format("HH:mm")} - ${moment(endTime).format(
            "HH:mm",
          )}`
        : "TBA"}
    </p>
    <p>{location}</p>
    <button>Learn More</button>
  </div>
);

DisplayEvent.propTypes = {
  name: PropTypes.string,
  startTime: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
  endTime: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
  location: PropTypes.string,
};

DisplayEvent.defaultProps = {
  name: "Untitled Event",
  startTime: null,
  endTime: null,
  location: "TBC",
};

export default DisplayEvent;
