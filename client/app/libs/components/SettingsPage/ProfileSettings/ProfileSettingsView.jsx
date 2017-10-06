import React from "react";
import PropTypes from "prop-types";
import * as Icon from "react-feather";
import { TextField } from "libs/components/Form";
import Modal from "libs/components/Modal";

const modalChoices = (confirm, cancel) => [
  <button key={0} className="red" onClick={() => confirm()}>
    Leave
  </button>,
  <button onClick={() => cancel()} key={1}>
    Stay
  </button>,
];

const ProfileSettingsView = ({
  isFetching,
  isUpdating,
  error,
  updateSuccess,
  userFields,
  userChangedFields,
  updateValues,
  resetValues,
  showExitModal,
  onExitModalConfirm,
  onExitModalCancel,
  saveForm,
}) => (
  <div className="splitview-pane">
    <Modal
      choices={modalChoices(onExitModalConfirm, onExitModalCancel)}
      onCloseButtonClick={() => onExitModalCancel()}
      header="You have unsaved changes"
      when={showExitModal}
    >
      <p>
        Are you sure you want to leave this page? You{"'"}ll lose anything you
        haven{"'"}t saved.
      </p>
    </Modal>
    <div className="title-bar">
      <h1>Profile Settings</h1>
      <button
        onClick={() => resetValues()}
        title="Reset form"
        className="square"
        type="button"
      >
        <Icon.RotateCcw />
      </button>
    </div>
    {isFetching && !Object.keys(userChangedFields).length ? (
      <div>
        <h3 className="help-text">Loading...</h3>
        <h3 className="help-text">
          <Icon.RefreshCw className="spinner" />
        </h3>
      </div>
    ) : (
      <form>
        {!isUpdating &&
          !error &&
          updateSuccess && (
            <div className="flash success">Settings saved successfully!</div>
          )}
        <h2>Basic Information</h2>
        <TextField
          id="user-first-name"
          label="First Name"
          value={userFields.first_name}
          className={userChangedFields.first_name ? "edited" : ""}
          placeholder="First Name..."
          onChange={val => updateValues({ first_name: val })}
        />
        <TextField
          id="user-last-name"
          label="Last Name"
          value={userFields.last_name}
          className={userChangedFields.last_name ? "edited" : ""}
          placeholder="Last Name..."
          onChange={val => updateValues({ last_name: val })}
        />
        <h2>Your Social Media Profiles</h2>
        <p>
          You can add your social media profiles here if you{"'"}d like other
          attendees to connect with you!
        </p>
        <TextField
          id="user-contact-twitter"
          label="Twitter"
          value={userFields.contact_twitter}
          className={userChangedFields.contact_twitter ? "edited" : ""}
          placeholder="jack"
          onChange={val => updateValues({ contact_twitter: val })}
        >
          <span className="input-addon">@</span>
        </TextField>

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
            onChange={e => updateValues({ contact_linkedin: e.target.value })}
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
            onChange={e => updateValues({ contact_devpost: e.target.value })}
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
            onChange={e => updateValues({ contact_github: e.target.value })}
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
          onChange={e => updateValues({ bio: e.target.value })}
        />
        <p>
          <button disabled={isUpdating} onClick={() => saveForm()}>
            {!isUpdating && "Save"}
            {isUpdating && (
              <Icon.RefreshCw aria-label="Loading" className="spinner" />
            )}
          </button>
        </p>
      </form>
    )}
  </div>
);

ProfileSettingsView.propTypes = {
  isFetching: PropTypes.bool,
  isUpdating: PropTypes.bool,
  error: PropTypes.string,
  updateSuccess: PropTypes.bool,
  userFields: PropTypes.shape(),
  userChangedFields: PropTypes.shape(),
  updateValues: PropTypes.func,
  resetValues: PropTypes.func,
  showExitModal: PropTypes.bool,
  onExitModalConfirm: PropTypes.func,
  onExitModalCancel: PropTypes.func,
  saveForm: PropTypes.func,
};

ProfileSettingsView.defaultProps = {
  isFetching: false,
  isUpdating: false,
  error: "",
  updateSuccess: false,
  userFields: {},
  userChangedFields: {},
  updateValues: () => {},
  resetValues: () => {},
  showExitModal: false,
  onExitModalConfirm: () => {},
  onExitModalCancel: () => {},
  saveForm: () => {},
};

export default ProfileSettingsView;
