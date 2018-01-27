import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signIn } from "../../actions/userActions";
import { EmailField, PasswordField } from "../../components/Form";
import Flash from "../../components/Flash";

class SignInPage extends Component {
  static mapStateToProps = state => ({
    error: state.user.signInError,
    isSigningIn: state.user.isSigningIn,
  });

  static mapDispatchToProps = dispatch => ({
    signIn: (email, pass) => dispatch(signIn(email, pass)),
  });

  static propTypes = {
    signIn: PropTypes.func,
    error: PropTypes.string,
    isSigningIn: PropTypes.bool,
  };

  static defaultProps = {
    signIn: () => {},
    error: "",
    isSigningIn: false,
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
    const { error } = this.props;
    return (
      <div>
        {redirect && <Redirect to="/" />}
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
          <p>
            <button type="submit" onClick={e => this.onSignInClick(e)}>
              Sign In
            </button>
          </p>
        </form>
      </div>
    );
  }
}

export default connect(
  SignInPage.mapStateToProps,
  SignInPage.mapDispatchToProps,
)(SignInPage);
