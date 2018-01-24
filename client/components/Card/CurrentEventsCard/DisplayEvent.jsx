import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";

const DisplayEvent = ({ id, name, startTime, endTime, location }) => (
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
    <Link to={`/timeline/item/${id}`} className="button yellow">
      Details
    </Link>
  </div>
);

DisplayEvent.propTypes = {
  id: PropTypes.number,
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
  id: 0,
  name: "Untitled Event",
  startTime: null,
  endTime: null,
  location: "TBC",
};

export default DisplayEvent;
