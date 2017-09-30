import React from "react";

const ItemActions = () => (
  <div className="button-group">
    <button>View</button>
    <button className="square">
      <i className="fa fa-edit" />
    </button>
    <button className="square">
      <i className="fa fa-trash" />
    </button>
  </div>
);

export default ItemActions;
