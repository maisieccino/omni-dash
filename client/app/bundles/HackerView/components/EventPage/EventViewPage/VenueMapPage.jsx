import React from "react";
import * as Icon from "react-feather";

const VenueMapPage = () => (
  <div className="splitview-pane">
    <div className="title-bar">
      <h1>Venue Map</h1>
      <button className="mint square">
        <Icon.RefreshCw />
      </button>
    </div>
  </div>
);

export default VenueMapPage;
