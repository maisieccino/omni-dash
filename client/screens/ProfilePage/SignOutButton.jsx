import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as Icon from "react-feather";
import { Redirect } from "react-router-dom";
import { signOut } from "../../actions/userActions";

class SignOutButton extends Component {
  static propTypes = {
    signOut: PropTypes.func,
    isSigningOut: PropTypes.bool,
    error: PropTypes.string,
  };

  static defaultProps = {
    signOut: () => {},
    isSigningOut: false,
    error: "",
  };

  static mapStateToProps = state => ({
    isSigningOut: state.user.isSigningOut,
    error: state.user.signOutError,
  });

  static mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut()),
  });

  state = {
    signedOut: false,
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isSigningOut &&
      !nextProps.isSigningOut &&
      !nextProps.error.length
    ) {
      this.setState({ signedOut: true });
    }
  }

  render() {
    const { isSigningOut } = this.props;
    if (this.state.signedOut) {
      return <Redirect to="/" />;
    }
    return (
      <button className="red square" onClick={() => this.props.signOut()}>
        {isSigningOut ? (
          <Icon.RefreshCw className="spinner" />
        ) : (
          <Icon.LogOut />
        )}
      </button>
    );
  }
}

export default connect(
  SignOutButton.mapStateToProps,
  SignOutButton.mapDispatchToProps,
)(SignOutButton);
