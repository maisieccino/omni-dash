import React from "react";
import PropTypes from "prop-types";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import * as Icon from "react-feather";
import { generateMapsUrl } from "libs/utils/geo";

const map = (lat, long, location) => (
  <Map center={[lat, long]} zoom={13}>
    <TileLayer
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    <Marker position={[lat, long]}>
      <Popup>
        <span>{location}</span>
      </Popup>
    </Marker>
  </Map>
);

const DirectionsCard = ({ className, location, latitude, longitude }) => (
  <div className={`flex-card ${className}`}>
    <div className="card-body">
      <section className="card-section">
        <h2>Getting To The Event</h2>
        <h3>Address</h3>
        <p>{location}</p>
        <a
          className="yellow button"
          href={generateMapsUrl(latitude, longitude)}
          target="_blank"
        >
          Google Maps <Icon.Map />
        </a>
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
