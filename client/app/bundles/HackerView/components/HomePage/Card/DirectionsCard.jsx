import React from "react";
import PropTypes from "prop-types";
import * as Icon from "react-feather";
import { generateMapsUrl } from "libs/utils/geo";

const DirectionsCard = ({ className, location, latitude, longitude }) => (
  <div className={className}>
    <div className="card-body">
      <h2>Getting To The Event</h2>
      <p>Address: {location}</p>
      <a
        className="yellow button"
        href={generateMapsUrl(latitude, longitude)}
        target="_blank"
      >
        View Map <Icon.Map />
      </a>
    </div>
  </div>
);

DirectionsCard.propTypes = {
  className: PropTypes.string,
  location: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

DirectionsCard.defaultProps = {
  className: "",
  location: "To Be Confirmed",
  latitude: 0.0,
  longitude: 0.0,
};

export default DirectionsCard;
