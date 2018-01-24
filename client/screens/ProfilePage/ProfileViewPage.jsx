// @flow
import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Sidebar from "./Sidebar";

const bioText = bio => bio || <i>This user has not yet provided a bio.</i>;

const ProfileViewPage = ({ user, isFetching, isOwnProfile, onRefresh }) => (
  <div>
    <Header
      isFetching={isFetching}
      isOwnProfile={isOwnProfile}
      {...user}
      onRefresh={onRefresh}
    />
    <div className="profile-main">
      <Sidebar {...user} />

      {isOwnProfile ? (
        <div className="profile-body">
          {user.admin ? (
            <div className="title-bar">
              <h2>You{"'"}re an admin.</h2>
            </div>
          ) : (
            [
              <div key={0} className="title-bar">
                <h2>Your Team At Hatch</h2>
              </div>,
              <p key={1}>
                You don’t appear to have a team registered for hatch yet! Make
                sure you create/join your team before hacking ends.
              </p>,
              <button key={2}>Create A Team</button>,
            ]
          )}
          <h2>Bio</h2>
          <p>{bioText(user.bio)}</p>
        </div>
      ) : (
        <div className="profile-body">
          <h2>Team</h2>
          <p>This user isn{"'"}t part of a team yet.</p>
        </div>
      )}
    </div>
  </div>
);

ProfileViewPage.propTypes = {
  user: PropTypes.shape().isRequired,
  isFetching: PropTypes.bool,
  isOwnProfile: PropTypes.bool,
  onRefresh: PropTypes.func,
};

ProfileViewPage.defaultProps = {
  isFetching: false,
  isOwnProfile: false,
  onRefresh: () => {},
};

export default ProfileViewPage;
