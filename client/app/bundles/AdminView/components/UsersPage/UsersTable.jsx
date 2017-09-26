import React from "react";
import PropTypes from "prop-types";
import { generate } from "shortid";

import UsersTableHeader from "./UsersTableHeader";
import UserActions from "./UserActions";

const UsersTable = ({ users, refreshTable }) => {
  const usersArray = users.sort((a, b) => a.id > b.id);
  return (
    <table>
      <UsersTableHeader />
      <tbody>
        {usersArray.map(user => (
          <tr key={generate()}>
            <td>{user.id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <UserActions
              userId={user.id}
              firstName={user.first_name}
              lastName={user.last_name}
              onDeleteUser={() => {
                refreshTable();
              }}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape()),
  refreshTable: PropTypes.func,
};

UsersTable.defaultProps = {
  users: [],
  refreshTable: () => {},
};

export default UsersTable;
