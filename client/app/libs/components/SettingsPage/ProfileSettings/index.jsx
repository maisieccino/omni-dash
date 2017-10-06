import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as Icon from "react-feather";
import {
  fetchUser,
  updateUser,
  changeSettingValues,
  resetSettingValues,
} from "libs/actions/userActions";
import { TextField } from "libs/components/Form";
import Modal from "libs/components/Modal";

class ProfileSettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveButtonClicked: false,
      showExitModal: false,
      nextLocation: {},
    };
  }

  componentDidMount() {
    this.props.resetValues();

    // fetch user data if it's not yet loaded
    if (!Object.keys(this.props.user).length) {
      this.props.fetchUser();
    }

    // set the unblock method for navigating away later.
    this.unblockRouter = this.props.history.block(nextLocation => {
      if (this.props.isUnsaved) {
        this.setState({
          showExitModal: true,
          nextLocation,
        });
      }
      return !this.props.isUnsaved;
    });
  }

  componentWillUnmount() {
    this.unblockRouter();
  }

  modalChoices = () => [
    <button
      key={0}
      className="primary"
      onClick={() => this.navigateToNextLocation()}
    >
      Leave
    </button>,
    <button onClick={() => this.setState({ showExitModal: false })} key={1}>
      Stay
    </button>,
  ];

  saveForm() {
    this.setState({ saveButtonClicked: true });
    this.props.saveChanges(this.props.userChangedFields);
  }

  /**
   * Called when user confirms navigating away (via modal)
   * @memberof ProfileSettingsContainer
   */
  navigateToNextLocation() {
    this.unblockRouter();
    if (this.state.nextLocation.action === "PUSH") {
      this.props.history.push(this.state.nextLocation.location.pathname);
    } else {
      this.props.history.goBack();
    }
  }

  render() {
    const {
      isFetching,
      isUpdating,
      error,
      updateSuccess,
      userFields,
      userChangedFields,
    } = this.props;
    if (isFetching) {
      return (
        <div className="splitview-pane">
          <h1>Profile Settings</h1>
          <h3 className="help-text">Loading...</h3>
          <h3 className="help-text">
            <Icon.RefreshCw className="spinner" />{" "}
          </h3>
        </div>
      );
    }
    return (
      <div className="splitview-pane">
        <Modal
          choices={this.modalChoices()}
          onCloseButtonClick={() => this.setState({ showExitModal: false })}
          header="Are you sure you want to leave?"
          when={this.state.showExitModal}
        >
          <p>Any unsaved changes will be lost.</p>
        </Modal>
        <form>
          {!isUpdating &&
            !error &&
            updateSuccess && (
              <div className="success">Settings saved successfully!</div>
            )}
          <div className="title-bar">
            <h1>Profile Settings</h1>
            <button
              onClick={() => this.props.resetValues()}
              title="Reset form"
              className="square"
              type="button"
            >
              <Icon.RotateCcw />
            </button>
          </div>
          <h2>Basic Information</h2>
          <TextField
            id="user-first-name"
            label="First Name"
            value={userFields.first_name}
            className={userChangedFields.first_name ? "edited" : ""}
            placeholder="First Name..."
            onChange={val => this.props.updateValues({ first_name: val })}
          />
          <TextField
            id="user-last-name"
            label="Last Name"
            value={userFields.last_name}
            className={userChangedFields.last_name ? "edited" : ""}
            placeholder="Last Name..."
            onChange={val => this.props.updateValues({ last_name: val })}
          />
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
              {isUpdating && (
                <Icon.RefreshCw aria-label="Loading" className="spinner" />
              )}
            </button>
          </p>
        </form>
      </div>
    );
  }
}

ProfileSettingsContainer.propTypes = {
  fetchUser: PropTypes.func,
  saveChanges: PropTypes.func,
  userFields: PropTypes.shape(),
  userChangedFields: PropTypes.shape(),
  isFetching: PropTypes.bool,
  isUpdating: PropTypes.bool,
  error: PropTypes.string,
  updateSuccess: PropTypes.bool,
  updateValues: PropTypes.func,
  resetValues: PropTypes.func,
  isUnsaved: PropTypes.bool,
  user: PropTypes.shape(),
  history: PropTypes.shape(),
};

ProfileSettingsContainer.defaultProps = {
  fetchUser: () => {},
  saveChanges: () => {},
  userFields: {},
  userChangedFields: {},
  isUpdating: false,
  isFetching: false,
  error: "",
  updateSuccess: false,
  updateValues: () => {},
  resetValues: () => {},
  isUnsaved: false,
  user: {},
  history: {},
};

const mapStateToProps = (state, ownProps) => {
  const isUnsaved = Object.keys(state.user.userChangedFields).length > 0;
  return {
    ...ownProps,
    user: state.user.user,
    isFetching: state.user.isFetching,
    isUpdating: state.user.isUpdating,
    error: state.user.error,
    updateSuccess: state.user.updateSuccess,
    userFields: {
      bio: "",
      ...state.user.user,
      ...state.user.userChangedFields,
    },
    userChangedFields: state.user.userChangedFields,
    isUnsaved,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  saveChanges: (data = {}) => dispatch(updateUser(data)),
  updateValues: values => dispatch(changeSettingValues(values)),
  resetValues: () => dispatch(resetSettingValues()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileSettingsContainer),
);
