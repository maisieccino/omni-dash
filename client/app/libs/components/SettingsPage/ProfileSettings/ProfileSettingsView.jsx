import React from "react";
import PropTypes from "prop-types";
import * as Icon from "react-feather";
import Flash from "libs/components/Flash";
import { TextField } from "libs/components/Form";
import Modal from "libs/components/Modal";
import MarkdownEditor from "libs/components/MarkdownEditor";

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
        className="red square"
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
        <Flash type="success" when={!isUpdating && !error && updateSuccess}>
          Settings saved successfully!
        </Flash>

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

        <TextField
          id="user-contact-linkedin"
          label="LinkedIn"
          value={userFields.contact_linkedin}
          className={userChangedFields.contact_linkedin ? "edited" : ""}
          placeholder="janedoe"
          onChange={val => updateValues({ contact_linkedin: val })}
        >
          <span className="input-addon">linkedin.com/in/</span>
        </TextField>

        <TextField
          id="user-contact-devpost"
          label="Devpost"
          value={userFields.contact_devpost}
          className={userChangedFields.contact_devpost ? "edited" : ""}
          placeholder="janedoe"
          onChange={val => updateValues({ contact_devpost: val })}
        >
          <span className="input-addon">devpost.com/</span>
        </TextField>

        <TextField
          id="user-contact-github"
          label="GitHub"
          value={userFields.contact_github}
          className={userChangedFields.contact_github ? "edited" : ""}
          placeholder="janedoe"
          onChange={val => updateValues({ contact_github: val })}
        >
          <span className="input-addon">github.com/</span>
        </TextField>
        <h2>Bio</h2>
        <p>
          Tell us a bit about what you do, and what excites you about tech!
          (This is visible to anyone visiting your profile.)
        </p>
        <label htmlFor="user-bio">Bio</label>
        <MarkdownEditor
          id="user-bio"
          onChange={val => updateValues({ bio: val })}
          value={userFields.bio || ""}
          placeholder="Enter your bio here..."
        />
        <p>
          <button
            className="red"
            disabled={isUpdating}
            onClick={() => saveForm()}
          >
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
  userFields: {
    first_name: "",
    last_name: "",
    contact_twitter: "",
    contact_linkedin: "",
    contact_devpost: "",
    contact_github: "",
    bio: "",
  },
  userChangedFields: {},
  updateValues: () => {},
  resetValues: () => {},
  showExitModal: false,
  onExitModalConfirm: () => {},
  onExitModalCancel: () => {},
  saveForm: () => {},
};

export default ProfileSettingsView;
