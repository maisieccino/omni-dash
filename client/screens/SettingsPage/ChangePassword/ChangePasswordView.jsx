import React, { Component } from "react";
import PropTypes from "prop-types";
import * as Icon from "react-feather";
import { PasswordField } from "../../../components/Form";
import Flash from "../../../components/Flash";
import { clamp } from "../../../utils/number";

class ChangePasswordView extends Component {
  static propTypes = {
    isChangingPassword: PropTypes.bool,
    error: PropTypes.string,
    onSubmitClick: PropTypes.func,
    success: PropTypes.bool,
  };

  static defaultProps = {
    isChangingPassword: false,
    error: "",
    onSubmitClick: () => {},
    success: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      oldPasswordEmpty: false,
      newPassword: "",
      newPasswordConfirm: "",
      newPasswordsMatch: true,
    };
  }

  newPasswordsMatch(onChange = false) {
    if (onChange) {
      // don't mess around with the state while user is changing values.
      // it's annoying.
      if (
        !this.state.newPasswordsMatch &&
        this.state.newPassword === this.state.newPasswordConfirm
      ) {
        this.setState({ newPasswordsMatch: true });
      }
      return;
    }
    // don't show errors if user hasn't entered one of the fields.
    if (this.state.newPassword === "" || this.state.newPasswordConfirm === "") {
      this.setState({ newPasswordsMatch: true });
      return;
    }

    // compare newpassword fields
    this.setState({
      newPasswordsMatch:
        this.state.newPassword === this.state.newPasswordConfirm,
    });
  }

  resetForm() {
    this.setState({
      oldPassword: "",
      oldPasswordEmpty: false,
      newPassword: "",
      newPasswordConfirm: "",
      newPasswordsMatch: true,
    });
  }

  submitForm(e) {
    e.preventDefault();
    // check old password filled out
    if (!this.state.oldPassword) {
      this.setState({ oldPasswordEmpty: true });
      return;
    }
    this.props.onSubmitClick(this.state);
  }

  render() {
    const { isChangingPassword, error, success } = this.props;
    const { newPasswordsMatch } = this.state;

    // strength of password => more characters is good.
    // 32 characters is ideal.
    const passwordStrength = clamp(
      Math.floor(this.state.newPassword.length / 8),
      0,
      4,
    );
    // educate user
    let passwordHint = "";
    switch (passwordStrength) {
      case 0: {
        passwordHint = "Password needs to be at least 8 characters long.";
        break;
      }
      case 1:
      case 2: {
        passwordHint =
          "This is okay, but ideally your password should be 24 characters or more.";
        break;
      }
      default: {
        passwordHint = "Nice! This is a secure password.";
      }
    }

    return (
      <div className="splitview-pane">
        <div className="title-bar">
          <h1>Change Your Password</h1>
          <button
            className="red square"
            title="Reset fields"
            onClick={() => this.resetForm()}
          >
            <Icon.RotateCcw />
          </button>
        </div>

        <Flash type="alert" when={error.length > 0}>
          {error}
        </Flash>
        <Flash type="success" when={success}>
          Password successfully changed!
        </Flash>

        <p>
          You{"'"}ll receive an email confirming that your password has been
          changed.
        </p>

        <form>
          <PasswordField
            id="oldPassword"
            label="Old Password"
            value={this.state.oldPassword}
            error={
              this.state.oldPasswordEmpty
                ? "You need to type in your old password."
                : ""
            }
            onBlur={e => this.setState({ oldPasswordEmpty: !e.target.value })}
            onChange={async val => {
              await this.setState({ oldPassword: val });
              if (this.state.oldPasswordEmpty && val) {
                this.setState({ oldPasswordEmpty: false });
              }
            }}
          />

          <p>
            We recommend that you use a password manager to generate and store
            your passwords for maximum security.{" "}
            <a href="https://www.howtogeek.com/141500/why-you-should-use-a-password-manager-and-how-to-get-started/">
              Why?
            </a>
          </p>
          <PasswordField
            id="newPassword"
            label="New Password"
            value={this.state.newPassword}
            onChange={async val => {
              await this.setState({ newPassword: val });
              this.newPasswordsMatch(true);
            }}
            onBlur={() => this.newPasswordsMatch()}
          />

          <p>
            <progress min={0} max={4} value={passwordStrength} />
          </p>
          <h3 className="red">{passwordHint}</h3>

          <PasswordField
            id="newPasswordConfirm"
            label="Repeat Your New Password"
            value={this.state.newPasswordConfirm}
            onChange={async val => {
              await this.setState({ newPasswordConfirm: val });
              this.newPasswordsMatch(true);
            }}
            onBlur={() => this.newPasswordsMatch()}
            error={
              newPasswordsMatch ? "" : "The passwords you entered do not match."
            }
          />
          <p>
            <button
              className={isChangingPassword ? "square" : ""}
              type="submit"
              onClick={e => this.submitForm(e)}
              disabled={isChangingPassword}
            >
              {isChangingPassword ? (
                <Icon.RefreshCw className="spinner" />
              ) : (
                "Update"
              )}
            </button>
          </p>
        </form>
      </div>
    );
  }
}

export default ChangePasswordView;
