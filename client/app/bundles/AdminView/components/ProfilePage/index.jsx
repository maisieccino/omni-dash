/* eslint react/no-unused-prop-types: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as userActions from "libs/actions/userActions";
import * as pageNavActions from "libs/actions/pageNavActions";

import ProfileViewPage from "./ProfileViewPage";

class ProfilePage extends Component {
  static propTypes = {
    user: PropTypes.shape().isRequired,
    currentUser: PropTypes.shape().isRequired,
    isFetching: PropTypes.bool,
    getUser: PropTypes.func.isRequired,
    updateBackButton: PropTypes.func.isRequired,
    match: PropTypes.shape(),
  };

  static defaultProps = {
    currentUser: {},
    isFetching: false,
    match: { params: {} },
  };

  componentWillMount() {
    this.props.getUser();
  }

  componentDidMount() {
    this.props.updateBackButton();
  }

  render() {
    const {
      user,
      isFetching,
      match: { params: { id } },
      currentUser: { id: currentId },
    } = this.props;
    return (
      <ProfileViewPage
        user={user}
        isFetching={isFetching}
        isOwnProfile={id === undefined || id === String(currentId)}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  currentUser: state.current_user,
  isFetching: state.user.isFetching,
});

const mapDispatchToProps = (dispatch, { match }) => ({
  getUser: () => dispatch(userActions.fetchUser(match.params.id)),
  updateBackButton: () => dispatch(pageNavActions.pageHasNavigated("/", false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
