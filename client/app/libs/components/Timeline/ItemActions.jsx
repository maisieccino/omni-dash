import React from "react";
import * as Icon from "react-feather";

const ItemActions = () => (
  <div className="button-group">
    <button>View</button>
    <button className="square">
      <Icon.Edit2 />
    </button>
    <button className="square">
      <Icon.Trash2 />
    </button>
  </div>
);

export default ItemActions;
