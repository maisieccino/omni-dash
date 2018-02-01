import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import { RESET_PASSWORD_PATH } from "../../constants/userConstants";
import { EmailField } from "../../components/Form";
import Flash from "../../components/Flash";
import { jsonPostRequest } from "../../utils/Requests";

class ForgotPasswordPage extends Component {
  state = {
    email: "",
    error: "",
    sending: false,
    success: false
  };

  async onResetClick(e) {
    e.preventDefault();
    const { email } = this.state;
    await this.setState({ error: "", success: false, sending: true });
    if (email.length) {
      try {
        await jsonPostRequest(RESET_PASSWORD_PATH, {
          user: {
            email
          },
          commit: "Send me reset password instructions",
          utf8: "✓"
        });
        return this.setState({ success: true, sending: false, email: "" });
      } catch (error) {
        return this.setState({
          error: typeof error === "string" ? error : error.message,
          sending: false,
          success: false
        });
      }
    }
    return this.setState({
      error: "You need to enter a password",
      sending: false,
      success: false
    });
  }

  render() {
    const { email, error, sending, success } = this.state;
    return (
      <Fragment>
        <h1>Reset your password</h1>
        <Flash type="alert" when={error.length > 0}>
          Error: {error}
        </Flash>
        <Flash type="success" when={success}>
          Email sent! Check your inbox.
        </Flash>
        <p>We{"'"}ll send a reset link to your email address.</p>
        <form>
          <EmailField
            id="email"
            label="Email Address"
            placeholder="hello@example.com"
            onChange={val => this.setState({ email: val })}
            value={email}
          />
        </form>
        <div className="button-group">
          <button
            className="red"
            type="submit"
            onClick={e => this.onResetClick(e)}
          >
            {sending ? <Icon.RefreshCw className="spinner" /> : "Reset"}
          </button>
          <Link className="button" to="/sign_in">
            Cancel
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default ForgotPasswordPage;
