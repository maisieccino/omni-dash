import React from "react";
import PropTypes from "prop-types";
import { generate } from "shortid";

import UsersTableHeader from "./UsersTableHeader";

const UsersTable = props => {
  const users = props.users.sort((a, b) => a.id > b.id);
  return (
    <table>
      <UsersTableHeader />
      <tbody>
        {users.map(user =>
          <tr key={generate()}>
            <td>
              {user.id}
            </td>
            <td>
              {user.first_name}
            </td>
            <td>
              {user.last_name}
            </td>
            <td>
              {user.email}
            </td>
            <td>
              <button>View Profile</button>
              <button>Edit</button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape())
};

UsersTable.defaultProps = {
  users: []
};

export default UsersTable;
