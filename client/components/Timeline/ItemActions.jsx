import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";

const ItemActions = ({ editable, id, onDeleteClick, isDeleting }) => (
  <div className="button-group">
    <Link className="yellow no-expand button" to={`/timeline/item/${id}`}>
      View
    </Link>
    {editable && (
      <button key={1} className="square" onClick={onDeleteClick}>
        {isDeleting ? <Icon.RefreshCw className="spinner" /> : <Icon.Trash2 />}
      </button>
    )}
  </div>
);

ItemActions.propTypes = {
  editable: PropTypes.bool,
  isDeleting: PropTypes.bool,
  id: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func,
};

ItemActions.defaultProps = {
  editable: false,
  isDeleting: false,
  onDeleteClick: () => {},
};

export default ItemActions;
