import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changePassword } from "../../../actions/userActions";
import ChangePasswordView from "./ChangePasswordView";

class ChangePassword extends Component {
  static propTypes = {
    isChangingPassword: PropTypes.bool,
    error: PropTypes.string,
    changePassword: PropTypes.func,
  };

  static defaultProps = {
    isChangingPassword: false,
    error: "",
    changePassword: () => {},
  };

  static mapStateToProps = state => ({
    isChangingPassword: state.user.changePassword.isChangingPassword,
    error: state.user.changePassword.error,
  });

  static mapDispatchToProps = dispatch => ({
    changePassword: (...params) => dispatch(changePassword(...params)),
  });

  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isChangingPassword &&
      !nextProps.isChangingPassword &&
      nextProps.error.length === 0
    ) {
      this.setState({ success: true });
    }
  }

  submitForm(params) {
    this.props.changePassword(
      params.oldPassword,
      params.newPassword,
      params.newPasswordConfirm,
    );
  }

  render() {
    return (
      <ChangePasswordView
        onSubmitClick={state => this.submitForm(state)}
        success={this.state.success}
        {...this.props}
        isChangingPassword={this.state.isChanging}
      />
    );
  }
}

export default connect(
  ChangePassword.mapStateToProps,
  ChangePassword.mapDispatchToProps,
)(ChangePassword);
