import React from "react";
import PropTypes from "prop-types";
import { generate } from "shortid";
import Cell from "./TableCell";

const TableRow = ({ cells, columnCount, ...rest }) => {
  if (cells.length !== columnCount) {
    throw new Error("Mismatch between cell count and column count");
  }
  return (
    <tr {...rest}>
      {cells.map(cell => <Cell key={generate()} content={cell} />)}
    </tr>
  );
};

TableRow.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.node).isRequired,
  columnCount: PropTypes.number.isRequired,
};

export default TableRow;
