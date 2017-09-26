import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import * as pageNavActions from "libs/actions/pageNavActions";
import { fetchUsers } from "../../actions/usersActions";

import UsersTable from "./UsersTable";

class UsersPage extends Component {
  static propTypes = {
    updateBackButton: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape()),
    isFetching: PropTypes.bool,
    lastUpdated: PropTypes.shape(),
  };

  static defaultProps = {
    users: [],
    isFetching: false,
    lastUpdated: null,
  };

  componentDidMount() {
    this.props.updateBackButton();
    this.props.getUsers();
  }

  render() {
    const { lastUpdated } = this.props;
    return (
      <div>
        <div className="title-bar">
          <h1>Users</h1>
          <p>
            <i>
              Last updated:{" "}
              {lastUpdated ? moment(lastUpdated).format("HH:mm:ss") : "Never"}
            </i>
          </p>
          <button
            disabled={this.props.isFetching}
            className="square"
            title="Refresh"
            onClick={() => this.props.getUsers()}
          >
            <i
              className={`fa fa-refresh ${this.props.isFetching && "spinner"}`}
            />
          </button>
          <a href="/users" className="square button" title="View JSON Data">
            <i className="fa fa-code" />
          </a>
        </div>
        {this.props.isFetching ? (
          <p>Loading users...</p>
        ) : (
          <UsersTable
            users={this.props.users}
            refreshTable={() => this.props.getUsers()}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isFetching, users, lastUpdated } = state.users;

  return {
    isFetching,
    users,
    lastUpdated,
  };
};

const mapDispatchToProps = dispatch => ({
  updateBackButton: () => dispatch(pageNavActions.pageHasNavigated("/", false)),
  getUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
