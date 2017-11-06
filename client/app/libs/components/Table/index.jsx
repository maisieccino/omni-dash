import React from "react";
import PropTypes from "prop-types";
import { generate } from "shortid";

import Header from "./TableHeader";
import Row from "./TableRow";

const Table = ({ rows, columns }) => {
  const columnCount = columns.length;
  return (
    <div className="table-wrapper">
      <table>
        <Header columns={columns} />
        <tbody>
          {rows.map(row => (
            <Row cells={row} key={generate()} columnCount={columnCount} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Table;
