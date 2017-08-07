/* eslint camelcase: 0 */
import React from "react";
import PropTypes from "prop-types";

const bioText = bio => bio || <i>This user has not yet provided a bio.</i>;

const Header = ({ first_name, last_name, bio }) => (
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
      <h1>{ first_name } { last_name }</h1>
      <p>{ bioText(bio) }</p>
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
);

Header.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  bio: PropTypes.string,
};

Header.defaultProps = {
  first_name: "",
  last_name: "",
  bio: "This user does not currently have a bio",
};

export default Header;
