// @flow
import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Sidebar from "./Sidebar";

const ProfileViewPage = ({ user, isFetching }) =>
  <div>
    {isFetching && <p>REFRESHING...</p>}
    <Header isFetching={isFetching} {...user} />
    <div className="profile-main">
      <Sidebar {...user} />

      <div className="profile-body">
        <h2>Your Team At Hatch</h2>
        <p>
          You don’t appear to have a team registered for hatch yet! Make sure
          you create/join your team before hacking ends.
        </p>
        <button>Create A Team</button>
      </div>
    </div>
  </div>;

ProfileViewPage.propTypes = {
  user: PropTypes.shape().isRequired,
  isFetching: PropTypes.bool
};

ProfileViewPage.defaultProps = {
  isFetching: false
};

export default ProfileViewPage;
