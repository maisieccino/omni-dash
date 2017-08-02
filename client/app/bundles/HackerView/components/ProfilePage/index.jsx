import React from "react";

const InfoPage = () => (
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
        <h1>Matt Bell</h1>
        <p>Hatch organiser, javascripter, runner</p>
        <div className="header-buttons">
          <button>Settings</button>
          <button>Sign Out</button>
        </div>
      </div>
    </header>

    <div className="profile-main">
      <aside className="profile-sidebar">
        <h2>Contact Info</h2>
        <div className="contact-info-item">
          <h3>Twitter</h3>
          <p>@mbell_gb</p>
        </div>
        <div className="contact-info-item">
          <h3>Website</h3>
          <p>https://mbell.me</p>
        </div>
        <div className="contact-info-item">
          <h3>LinkedIn</h3>
          <p>/in/mbellcs</p>
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

export default InfoPage;
