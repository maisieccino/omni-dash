import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";

import Header from "./Header";
import Sidebar from "./Sidebar";

class InfoPage extends Component {
  componentWillMount() {
    this.props.getUser();
  }

  render() {
    const { user, isFetching } = this.props;
    return (
      <div>
        { isFetching && <p>LOADING...</p> }
        <Header {...user} />
        <div className="profile-main">
          <Sidebar {...user} />

          <div className="profile-body">
            <h2>Your Team At Hatch</h2>
            <p>
              You don’t appear to have a team registered for hatch yet!
              Make sure you create/join your team before hacking ends.
            </p>
            <button>Create A Team</button>
          </div>
        </div>
      </div>
    );
  }
}

InfoPage.propTypes = {
  user: PropTypes.shape().isRequired,
  isFetching: PropTypes.bool,
  getUser: PropTypes.func.isRequired,
};

InfoPage.defaultProps = {
  isFetching: false,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  user: state.user.user,
  isFetching: state.user.isFetching,
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(userActions.fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage);
