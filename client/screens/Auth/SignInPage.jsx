import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EmailField, PasswordField } from "../../components/Form";
import { signIn } from "../../actions/userActions";

class SignInPage extends Component {
  static mapStateToProps = state => ({
    competition: state.competition.competition,
  });

  static mapDispatchToProps = dispatch => ({
    signIn: (email, pass) => dispatch(signIn(email, pass)),
  });

  static propTypes = {
    signIn: PropTypes.func,
  };

  static defaultProps = {
    competition: {},
    signIn: () => {},
  };

  state = {
    email: "",
    password: "",
  };

  onSignInClick(e) {
    e.preventDefault();
    const { email, password } = this.state;
    console.log("hello");
    this.props.signIn(email, password);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h1>Sign In</h1>
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
