// @flow
import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Sidebar from "./Sidebar";

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
          <h2>Your Team At Hatch</h2>
          <p>
            You don’t appear to have a team registered for hatch yet! Make sure
            you create/join your team before hacking ends.
          </p>
          <button>Create A Team</button>
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
