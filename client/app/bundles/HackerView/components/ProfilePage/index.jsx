import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";

class InfoPage extends Component {
  componentWillMount() {
    this.props.getUser();
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <header className="profile-header">
          <div className="profile-image-container">
            <div
              style={{
                backgroundImage: "url(/assets/hatch_logo.png)",
              }}
              className="profile-image"
            />
          </div>
          <div className="profile-header-container">
            <h1>{ user.first_name } { user.last_name } { user.admin && "(admin)" }</h1>
            <p>{ user.bio ?
              user.bio
              : <i>You have not yet added a bio.</i>
            }</p>
            <div className="header-buttons">
              <button>Settings</button>
              <a
                href="/auth/sign_out"
                data-method="delete"
                className="button"
              >
                  Sign Out
              </a>
            </div>
          </div>
        </header>

        <div className="profile-main">
          <aside className="profile-sidebar">
            <h2>Contact Info</h2>
            <div className="contact-info-item">
              <h3>Twitter</h3>
              <p>@{ user.contact_twitter }</p>
            </div>
            <div className="contact-info-item">
              <h3>Website</h3>
              <p>{ user.contact_website }</p>
            </div>
            <div className="contact-info-item">
              <h3>LinkedIn</h3>
              <p>/in/{ user.contact_linkedin }</p>
            </div>
          </aside>

          <div className="profile-body">
            <h2>Your Team At Hatch</h2>
            <p>
              You don’t appear to have a team registered for hatch yet!
              Make sure you create/join your team before hacking ends.
            </p>
            <button>Create A Team</button>
          </div>
        </div>
      </div>
    );
  }
}

InfoPage.propTypes = {
  user: PropTypes.shape().isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(userActions.fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage);
