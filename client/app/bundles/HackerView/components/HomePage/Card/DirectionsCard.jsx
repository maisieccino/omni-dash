import React from "react";
import PropTypes from "prop-types";
import { generateMapsUrl } from "libs/utils/geo";

const DirectionsCard = ({ className, location, latitude, longitude }) => (
  <div className={className}>
    <div className="card-body">
      <h2>Getting To The Event</h2>
      <p>Address: {location}</p>
      <h3>View On Google Maps</h3>
      <a
        className="button"
        href={generateMapsUrl(latitude, longitude)}
        target="_blank"
      >
        Go to Google Maps
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
