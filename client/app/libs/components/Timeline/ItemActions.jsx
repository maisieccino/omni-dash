import React from "react";
import PropTypes from "prop-types";
import * as Icon from "react-feather";

const ItemActions = ({ editable }) => (
  <div className="button-group">
    <button className="yellow no-expand">View</button>
    {editable && [
      <button key={0} className="square">
        <Icon.Edit2 />
      </button>,
      <button key={1} className="square">
        <Icon.Trash2 />
      </button>,
    ]}
  </div>
);

ItemActions.propTypes = {
  editable: PropTypes.bool.isRequired,
};

export default ItemActions;
