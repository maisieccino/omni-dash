import React, { Component } from "react";
import * as Icon from "react-feather";
import { PasswordField } from "libs/components/Form";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    };
  }

  resetForm() {
    this.setState({
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    });
  }

  render() {
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

        <p>
          You{"'"}ll receive an email confirming that your password has been
          changed.
        </p>

        <form>
          <PasswordField
            id="oldPassword"
            label="Old Password"
            value={this.state.oldPassword}
            onChange={val => this.setState({ oldPassword: val })}
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
            onChange={val => this.setState({ newPassword: val })}
            className="invalid"
            after={
              <span className="input-addon">
                <Icon.AlertOctagon />
              </span>
            }
          />
          <p className="red">The passwords you entered do not match.</p>
          <PasswordField
            id="newPasswordConfirm"
            label="Repeat Your New Password"
            value={this.state.newPasswordConfirm}
            onChange={val => this.setState({ newPasswordConfirm: val })}
          />
          <p>
            <button type="submit">Update</button>
          </p>
        </form>
      </div>
    );
  }
}

export default ChangePassword;
