import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as Icon from "react-feather";
import { signIn } from "../../actions/userActions";
import { EmailField, PasswordField } from "../../components/Form";
import Flash from "../../components/Flash";

class SignInPage extends Component {
  static mapStateToProps = state => ({
    error: state.user.signInError,
    isSigningIn: state.user.isSigningIn,
    user: state.user.user,
  });

  static mapDispatchToProps = dispatch => ({
    signIn: (email, pass) => dispatch(signIn(email, pass)),
  });

  static propTypes = {
    signIn: PropTypes.func,
    error: PropTypes.string,
    isSigningIn: PropTypes.bool,
    user: PropTypes.shape(),
  };

  static defaultProps = {
    signIn: () => {},
    error: "",
    isSigningIn: false,
    user: {},
  };

  state = {
    email: "",
    password: "",
    redirect: false,
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isSigningIn &&
      !nextProps.isSigningIn &&
      !nextProps.error.length
    ) {
      // signed in!
      this.setState({ redirect: true });
    }
  }

  onSignInClick(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.signIn(email, password);
  }

  render() {
    const { email, password, redirect } = this.state;
    const { error, isSigningIn } = this.props;
    return (
      <Fragment>
        {(redirect || Object.keys(this.props.user).length > 0) && (
            <Redirect to="/" />
          )}
        <h1>Sign In</h1>
        <Flash when={error.length > 0} type="alert">
          {error}
        </Flash>
        <form>
          <EmailField
            id="email"
            label="Email Address"
            placeholder="hello@example.com"
            onChange={val => this.setState({ email: val })}
            value={email}
          />
          <PasswordField
            id="password"
            label="Password"
            placeholder="hunter2"
            onChange={val => this.setState({ password: val })}
            value={password}
          />
          <div className="button-group">
            <button type="submit" onClick={e => this.onSignInClick(e)}>
              {isSigningIn ? <Icon.RefreshCw className="spinner" /> : "Sign In"}
            </button>
            <Link className="button" to="forgot_password">
              Forgot Your Password?
            </Link>
          </div>
          <hr />
        </form>
      </Fragment>
    );
  }
}

export default connect(
  SignInPage.mapStateToProps,
  SignInPage.mapDispatchToProps,
)(SignInPage);
