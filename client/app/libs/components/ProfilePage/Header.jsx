/* eslint camelcase: 0 */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";

const bioText = bio => bio || <i>This user has not yet provided a bio.</i>;

const Header = ({
  admin,
  first_name,
  last_name,
  bio,
  isFetching,
  isOwnProfile,
  onRefresh,
}) => (
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
      <div className="title-bar">
        <h1>
          {first_name} {last_name} {admin && <Icon.Shield />}
        </h1>
      </div>
      <p>{bioText(bio)}</p>
      <div className="button-group flex horizontal">
        <button
          className="mint button square"
          disabled={isFetching}
          title="Refresh User"
          onClick={() => onRefresh()}
        >
          <Icon.RefreshCw className={isFetching ? "spinner" : ""} />
        </button>
        {isOwnProfile && [
          <Link
            to="/settings"
            className={`yellow button square ${isFetching ? "disabled" : ""}`}
            title="Go To Settings"
            key={0}
          >
            <Icon.Settings />
          </Link>,
          <a
            href="/auth/sign_out"
            data-method="delete"
            className="button square"
            title="Log Out"
            key={1}
          >
            <Icon.LogOut />
          </a>,
        ]}
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
  isOwnProfile: PropTypes.bool,
  onRefresh: PropTypes.func,
};

Header.defaultProps = {
  first_name: "...",
  last_name: "",
  bio: "This user does not currently have a bio",
  isFetching: false,
  admin: false,
  isOwnProfile: false,
  onRefresh: () => {},
};

export default Header;
