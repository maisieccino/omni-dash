import React from "react";
import PropTypes from "prop-types";

const DirectionsCard = ({ className, location }) =>
  <div className={className}>
    <div className="card-body">
      <h2>Getting To The Event</h2>
      <p>
        Address: {location}
      </p>
      <h3>View On Google Maps</h3>
      <a className="button" href="https://maps.google.com">
        Go to Google Maps
      </a>
    </div>
  </div>;

DirectionsCard.propTypes = {
  className: PropTypes.string,
  location: PropTypes.string,
};

DirectionsCard.defaultProps = {
  className: "",
  location: "To Be Confirmed",
};

export default DirectionsCard;
