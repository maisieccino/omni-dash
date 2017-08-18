/* eslint camelcase: 0 */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const bioText = bio => bio || <i>This user has not yet provided a bio.</i>;

const Header = ({ admin, first_name, last_name, bio, isFetching }) => (
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
      <h1>
        { first_name } { last_name }{" "}
        { admin && (<i aria-label="admin" className="fa fa-shield" />) }
      </h1>
      <p>{ bioText(bio) }</p>
      <div className="header-buttons">
        <Link
          to="/settings"
          className="button"
          disabled={isFetching}
        >
          Settings
        </Link>
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
  isFetching: PropTypes.bool,
  admin: PropTypes.bool,
};

Header.defaultProps = {
  first_name: "",
  last_name: "",
  bio: "This user does not currently have a bio",
  isFetching: false,
  admin: false,
};

export default Header;
