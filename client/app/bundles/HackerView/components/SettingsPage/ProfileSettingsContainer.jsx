import React from "react";

const ProfileSettingsContainer = () => (
  <div className="settings-pane">
    <div className="warning">Settings are not finished yet. Check back soon!</div>
    <h1>Profile Settings</h1>
    <h2>Basic Information</h2>
    <label htmlFor="user-first-name">First Name</label>
    <div className="input-group">
      <input id="user-first-name" type="text" placeholder="First Name..." />
    </div>
    <label htmlFor="user-first-name">Last Name</label>
    <div className="input-group">
      <input id="user-last-name" type="text" placeholder="Last Name..." />
    </div>

    <h2>Your Social Media Profiles</h2>
    <p>
      You can add your social media profiles here if you{"'"}d like other
      attendees to connect with you!
    </p>
    <label htmlFor="user-contact-twitter">Twitter</label>
    <div className="input-group">
      <span className="input-addon">@</span>
      <input id="user-first-name" type="text" placeholder="hatchucl" />
    </div>
    <label htmlFor="user-contact-linkedin">LinkedIn</label>
    <div className="input-group">
      <span className="input-addon">linkedin.com/in/</span>
      <input id="user-contact-linkedin" type="text" placeholder="Jane Doe" />
    </div>
    <label htmlFor="user-contact-devpost">Devpost</label>
    <div className="input-group">
      <span className="input-addon">devpost.com/</span>
      <input id="user-contact-github" type="text" placeholder="Jane Doe" />
    </div>
    <label htmlFor="user-contact-github">GitHub</label>
    <div className="input-group">
      <span className="input-addon">github.com/</span>
      <input id="user-contact-github" type="text" placeholder="Jane Doe" />
    </div>
    <p><button>Save</button></p>
  </div>
);

export default ProfileSettingsContainer;
