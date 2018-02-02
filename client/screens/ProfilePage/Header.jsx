/* eslint camelcase: 0 */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import SignOutButton from "./SignOutButton";

const Header = ({
  admin,
  first_name,
  last_name,
  pronouns,
  isFetching,
  isOwnProfile,
  onRefresh,
  avatar_url: avatarUrl,
}) => (
  <header className="profile-header">
    <div className="profile-image-container">
      <div
        style={{
          backgroundImage: `url(${avatarUrl})`,
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
      <p>{pronouns}</p>
      <div className="button-group flex horizontal">
        <button
          className="mint button square"
          disabled={isFetching}
          title="Refresh User"
          onClick={() => onRefresh()}
        >
          <Icon.RefreshCw className={isFetching ? "spinner" : ""} />
        </button>
        {isOwnProfile && (
          <Fragment>
            <Link
              to="/settings"
              className={`yellow button square ${isFetching ? "disabled" : ""}`}
              title="Go To Settings"
            >
              <Icon.Settings />
            </Link>
            <SignOutButton />
          </Fragment>
        )}
      </div>
    </div>
  </header>
);

Header.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  pronouns: PropTypes.string,
  isFetching: PropTypes.bool,
  admin: PropTypes.bool,
  isOwnProfile: PropTypes.bool,
  onRefresh: PropTypes.func,
  avatar_url: PropTypes.string,
};

Header.defaultProps = {
  first_name: "...",
  last_name: "",
  pronouns: "",
  isFetching: false,
  admin: false,
  isOwnProfile: false,
  onRefresh: () => {},
  avatar_url: "/assets/user_missing.png",
};

export default Header;
