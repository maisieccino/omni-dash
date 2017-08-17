import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import * as pageNavActions from "../../actions/pageNavActions";

import ProfileViewPage from "./ProfileViewPage";

class ProfilePage extends Component {
  componentWillMount() {
    this.props.getUser();
  }

  componentDidMount() {
    this.props.updateBackButton();
  }

  render() {
    const { user, isFetching } = this.props;
    return (
      <ProfileViewPage user={user} isFetching={isFetching} />
    );
  }
}

ProfilePage.propTypes = {
  user: PropTypes.shape().isRequired,
  isFetching: PropTypes.bool,
  getUser: PropTypes.func.isRequired,
  updateBackButton: PropTypes.func.isRequired,
};

ProfilePage.defaultProps = {
  isFetching: false,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  user: state.user.user,
  isFetching: state.user.isFetching,
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(userActions.fetchUser()),
  updateBackButton: () => dispatch(pageNavActions.pageHasNavigated("/", false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
