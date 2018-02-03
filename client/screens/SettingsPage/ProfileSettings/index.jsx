import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
  fetchUser,
  updateUser,
  changeSettingValues,
  resetSettingValues,
} from "../../../actions/userActions";
import ProfileSettingsView from "./ProfileSettingsView";

class ProfileSettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveButtonClicked: false,
      showExitModal: false,
      nextLocation: {},
    };
  }

  componentDidMount() {
    this.props.resetValues();

    // fetch user data if it's not yet loaded
    if (!Object.keys(this.props.user).length) {
      this.props.fetchUser();
    }

    // set the unblock method for navigating away later.
    this.unblockRouter = this.props.history.block(nextLocation => {
      if (this.props.isUnsaved) {
        this.setState({
          showExitModal: true,
          nextLocation,
        });
      }
      return !this.props.isUnsaved;
    });
  }

  componentWillUnmount() {
    this.unblockRouter();
  }

  /**
   * Called when user confirms navigating away (via modal)
   * @memberof ProfileSettingsContainer
   */
  navigateToNextLocation() {
    this.unblockRouter();
    this.props.history.push(this.state.nextLocation.pathname);
  }

  saveForm() {
    this.setState({ saveButtonClicked: true });
    this.props.saveChanges(this.props.userChangedFields);
  }

  render() {
    return (
      <ProfileSettingsView
        onExitModalConfirm={() => this.navigateToNextLocation()}
        onExitModalCancel={() => this.setState({ showExitModal: false })}
        showExitModal={this.state.showExitModal}
        saveForm={() => this.saveForm()}
        {...this.props}
      />
    );
  }
}

ProfileSettingsContainer.propTypes = {
  fetchUser: PropTypes.func,
  saveChanges: PropTypes.func,
  userFields: PropTypes.shape(),
  userChangedFields: PropTypes.shape(),
  isFetching: PropTypes.bool,
  isUpdating: PropTypes.bool,
  error: PropTypes.string,
  updateSuccess: PropTypes.bool,
  updateValues: PropTypes.func,
  resetValues: PropTypes.func,
  isUnsaved: PropTypes.bool,
  user: PropTypes.shape(),
  history: PropTypes.shape(),
};

ProfileSettingsContainer.defaultProps = {
  fetchUser: () => {},
  saveChanges: () => {},
  userFields: {},
  userChangedFields: {},
  isUpdating: false,
  isFetching: false,
  error: "",
  updateSuccess: false,
  updateValues: () => {},
  resetValues: () => {},
  isUnsaved: false,
  user: {},
  history: {},
};

const mapStateToProps = (state, ownProps) => {
  const isUnsaved = Object.keys(state.user.userChangedFields).length > 0;
  return {
    ...ownProps,
    user: state.user.currentUser,
    isFetching: state.user.isFetching,
    isUpdating: state.user.isUpdating,
    error: state.user.error,
    updateSuccess: state.user.updateSuccess,
    userFields: {
      ...state.user.currentUser,
      ...state.user.userChangedFields,
    },
    userChangedFields: state.user.userChangedFields,
    isUnsaved,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  saveChanges: (data = {}) => dispatch(updateUser(data)),
  updateValues: values => dispatch(changeSettingValues(values)),
  resetValues: () => dispatch(resetSettingValues()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileSettingsContainer),
);
