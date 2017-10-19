import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";

const ItemActions = ({ editable, id }) => (
  <div className="button-group">
    <Link className="yellow no-expand button" to={`/event/details/${id}`}>
      View
    </Link>
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
  editable: PropTypes.bool,
  id: PropTypes.number.isRequired,
};

ItemActions.defaultProps = {
  editable: false,
};

export default ItemActions;
