import React, { Component } from "react";
import PropTypes from "prop-types";
import { Prompt } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "libs/actions/userActions";

class ProfileSettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveButtonClicked: false,
    };
  }

  saveForm() {
    this.setState({ saveButtonClicked: true });
    this.props.saveChanges(this.props.userChangedFields);
  }

  render() {
    const {
      isUpdating,
      error,
      updateSuccess,
      userFields,
      userChangedFields,
    } = this.props;
    return (
      <div className="splitview-pane">
        <form>
          <Prompt
            when={this.props.isUnsaved}
            message="Are you sure you want to leave this page? You'll lose unsaved information."
          />
          {!isUpdating &&
            !error &&
            updateSuccess &&
            <div className="success">Settings saved successfully!</div>}
          <h1>Profile Settings</h1>
          <h2>Basic Information</h2>
          <label htmlFor="user-first-name">First Name</label>
          <div
            className={`input-group ${userChangedFields.first_name &&
              "edited"}`}
          >
            <input
              value={userFields.first_name}
              id="user-first-name"
              type="text"
              placeholder="First Name..."
              onChange={e =>
                this.props.updateValues({ first_name: e.target.value })}
            />
          </div>
          <label htmlFor="user-first-name">Last Name</label>
          <div
            className={`input-group ${userChangedFields.last_name && "edited"}`}
          >
            <input
              id="user-last-name"
              type="text"
              placeholder="Last Name..."
              value={userFields.last_name}
              onChange={e =>
                this.props.updateValues({ last_name: e.target.value })}
            />
          </div>
          <h2>Your Social Media Profiles</h2>
          <p>
            You can add your social media profiles here if you{"'"}d like other
            attendees to connect with you!
          </p>
          <label htmlFor="user-contact-twitter">Twitter</label>
          <div
            className={`input-group ${userChangedFields.contact_twitter &&
              "edited"}`}
          >
            <span className="input-addon">@</span>
            <input
              id="user-first-name"
              type="text"
              placeholder="hatchucl"
              value={userFields.contact_twitter}
              onChange={e =>
                this.props.updateValues({ contact_twitter: e.target.value })}
            />
          </div>
          <label htmlFor="user-contact-linkedin">LinkedIn</label>
          <div
            className={`input-group ${userChangedFields.contact_linkedin &&
              "edited"}`}
          >
            <span className="input-addon">linkedin.com/in/</span>
            <input
              id="user-contact-linkedin"
              type="text"
              placeholder="Jane Doe"
              value={userFields.contact_linkedin}
              onChange={e =>
                this.props.updateValues({ contact_linkedin: e.target.value })}
            />
          </div>
          <label htmlFor="user-contact-devpost">Devpost</label>
          <div
            className={`input-group ${userChangedFields.contact_devpost &&
              "edited"}`}
          >
            <span className="input-addon">devpost.com/</span>
            <input
              id="user-contact-devpost"
              type="text"
              placeholder="Jane Doe"
              value={userFields.contact_devpost}
              onChange={e =>
                this.props.updateValues({ contact_devpost: e.target.value })}
            />
          </div>
          <label htmlFor="user-contact-github">GitHub</label>
          <div
            className={`input-group ${userChangedFields.contact_github &&
              "edited"}`}
          >
            <span className="input-addon">github.com/</span>
            <input
              id="user-contact-github"
              type="text"
              placeholder="Jane Doe"
              value={userFields.contact_github}
              onChange={e =>
                this.props.updateValues({ contact_github: e.target.value })}
            />
          </div>
          <h2>Bio</h2>
          <p>
            Tell us a bit about what you do, and what excites you about tech!
            (This is visible to anyone visiting your profile.)
          </p>
          <label htmlFor="user-bio">Bio</label>
          <textarea
            id="user-bio"
            placeholder="Enter your bio here..."
            value={userFields.bio}
            onChange={e => this.props.updateValues({ bio: e.target.value })}
          />
          <p>
            <button disabled={isUpdating} onClick={() => this.saveForm()}>
              {!isUpdating && "Save"}
              {isUpdating &&
                <i aria-label="Loading" className="fa fa-refresh spinner" />}
            </button>
          </p>
        </form>
      </div>
    );
  }
}

ProfileSettingsContainer.propTypes = {
  saveChanges: PropTypes.func,
  userFields: PropTypes.shape(),
  userChangedFields: PropTypes.shape(),
  isUpdating: PropTypes.bool,
  error: PropTypes.string,
  updateSuccess: PropTypes.bool,
  updateValues: PropTypes.func,
  isUnsaved: PropTypes.bool,
};

ProfileSettingsContainer.defaultProps = {
  saveChanges: () => {},
  userFields: {},
  userChangedFields: {},
  isUpdating: false,
  error: "",
  updateSuccess: false,
  updateValues: () => {},
  isUnsaved: false,
};

const mapStateToProps = (state, ownProps) => {
  const isUnsaved = Object.keys(state.user.userChangedFields).length > 0;
  return {
    ...ownProps,
    user: state.user.user,
    isUpdating: state.user.isUpdating,
    error: state.user.error,
    updateSuccess: state.user.updateSuccess,
    userFields: {
      ...state.user.user,
      ...state.user.userChangedFields,
    },
    userChangedFields: state.user.userChangedFields,
    isUnsaved,
  };
};

const mapDispatchToProps = dispatch => ({
  saveChanges: (data = {}) => dispatch(actions.updateUser(data)),
  updateValues: values => dispatch(actions.changeSettingValues(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ProfileSettingsContainer,
);
