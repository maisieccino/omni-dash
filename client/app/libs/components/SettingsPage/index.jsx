import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { generate } from "shortid";
import { setUpdateSuccess } from "libs/actions/userActions";
import { TopNav } from "libs/components/Navigation";

import NavItem from "../SplitViewNavItem";
import ProfileSettingsContainer from "./ProfileSettingsContainer";
import TeamSettingsContainer from "./TeamSettingsContainer";
import PrivacySettingsContainer from "./PrivacySettingsContainer";
import NotificationsSettingsContainer from "./NotificationSettingsContainer";
import WithdrawContainer from "./WithdrawContainer";
import FeedbackContainer from "./FeedbackContainer";

const routes = [
  {
    to: "/settings/profile",
    label: "Profile",
    component: ProfileSettingsContainer,
  },
  { to: "/settings/team", label: "Team", component: TeamSettingsContainer },
  {
    to: "/settings/privacy",
    label: "Privacy",
    component: PrivacySettingsContainer,
  },
  {
    to: "/settings/notifications",
    label: "Notifications",
    component: NotificationsSettingsContainer,
  },
  {
    to: "/settings/withdraw",
    label: "Withdraw Your Place",
    component: WithdrawContainer,
  },
  {
    to: "/settings/feedback",
    label: "Send Feedback",
    component: FeedbackContainer,
  },
];

class SettingsPage extends Component {
  static propTypes = {
    setUserUpdateSuccess: PropTypes.func,
  };

  static defaultProps = {
    setUserUpdateSuccess: () => {},
  };

  componentDidMount() {
    this.props.setUserUpdateSuccess(false);
  }

  render() {
    return (
      <div>
        <TopNav title="Settings" href="/profile" />
        <div className="splitview-main">
          <aside className="splitview-nav">
            {/* programmatically generate navbar from array */}
            {routes.map(route => <NavItem key={generate()} {...route} />)}
          </aside>

          {/* programmatically generate routes from array */}
          {routes.map(route => (
            <Route
              key={generate()}
              path={route.to}
              component={route.component}
            />
          ))}
          <Route
            exact
            path="/settings"
            render={() => <Redirect to="/settings/profile" />}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ownProps;

const mapDispatchToProps = dispatch => ({
  setUserUpdateSuccess: success => dispatch(setUpdateSuccess(success)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
