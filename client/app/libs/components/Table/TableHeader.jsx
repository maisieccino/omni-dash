import React from "react";
import PropTypes from "prop-types";
import { generate } from "shortid";

const TableHeader = ({ columns }) => (
  <thead>
    <tr>{columns.map(column => <td key={generate()}>{column}</td>)}</tr>
  </thead>
);

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableHeader;
