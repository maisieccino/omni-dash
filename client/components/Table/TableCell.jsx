import React from "react";
import PropTypes from "prop-types";

const TableCell = ({ content }) => <td>{content}</td>;

TableCell.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default TableCell;
