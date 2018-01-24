import React from "react";
import PropTypes from "prop-types";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import * as Icon from "react-feather";
import { generateMapsUrl } from "../../utils/geo";

const map = (lat, long, location) => {
  const latitude = lat || 0.0;
  const longitude = long || 0.0;
  return (
    <Map center={[latitude, longitude]} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          <span>{location}</span>
        </Popup>
      </Marker>
    </Map>
  );
};
const DirectionsCard = ({ className, location, latitude, longitude }) => (
  <div className={`flex-card ${className}`}>
    <div className="card-body">
      <section className="card-section">
        <h2>Getting To The Event</h2>
        <h3>Address</h3>
        <p>{location}</p>
        <p>
          <a
            className="yellow button"
            href={generateMapsUrl(latitude, longitude)}
            target="_blank"
          >
            Google Maps <Icon.Map />
          </a>
        </p>
      </section>
      <section className="card-section">
        {map(latitude, longitude, location)}
      </section>
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
