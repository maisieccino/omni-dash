import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as pageNavActions from "libs/actions/pageNavActions";
import { fetchUsers } from "../../actions/usersActions";

import UsersTable from "./UsersTable";

class UsersPage extends Component {
  static propTypes = {
    updateBackButton: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape()),
    isFetching: PropTypes.bool,
  };

  static defaultProps = {
    users: [],
    isFetching: false,
  };

  componentDidMount() {
    this.props.updateBackButton();
    this.props.getUsers();
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        <p>
          <button onClick={() => this.props.getUsers()}>Refresh</button>
        </p>
        <p>Manage Hatch users.</p>
        {this.props.isFetching
          ? <p>Loading users...</p>
          : <UsersTable users={this.props.users} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isFetching, users } = state.users;

  return {
    isFetching,
    users,
  };
};

const mapDispatchToProps = dispatch => ({
  updateBackButton: () => dispatch(pageNavActions.pageHasNavigated("/", false)),
  getUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
