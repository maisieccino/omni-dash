import React from "react";
import PropTypes from "prop-types";
import { Table } from "../../components";

import UserActions from "./UserActions";

const UsersTable = ({ users, refreshTable }) => {
  const usersArray = users
    .sort((a, b) => a.id > b.id)
    .map(user => [
      user.id,
      user.first_name,
      user.last_name,
      user.email,
      <UserActions
        userId={user.id}
        firstName={user.first_name}
        lastName={user.last_name}
        onDeleteUser={() => refreshTable()}
      />,
    ]);
  const columns = ["ID", "First Name", "Last Name", "Email", "Actions"];
  return <Table rows={usersArray} columns={columns} />;
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
