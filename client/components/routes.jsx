import React from "react";
import * as Icon from "react-feather";
import { NavItem } from "../components/Navigation";

export default (user = {}, isAdmin = false) => {
  if (!Object.keys(user).length) {
    return [
      <NavItem to="/" match="^/$" label="Home" icon={<Icon.Home />} />,
      <NavItem to="/sign_in" label="Sign In" icon={<Icon.LogIn />} />,
    ];
  }
  return isAdmin
    ? [
        <NavItem to="/" match="^/$" label="Home" icon={<Icon.Home />} />,
        <NavItem to="/users" label="Users" icon={<Icon.Users />} />,
        <NavItem
          to="/event"
          match="/event/*"
          label="Event"
          icon={<Icon.Calendar />}
        />,
        <NavItem to="/courses" label="Courses" icon={<Icon.Package />} />,
        <NavItem to="/profile" label="Profile" icon={<Icon.User />} />,
      ]
    : [
        <NavItem to="/" label="Home" icon={<Icon.Home />} />,
        <NavItem to="/courses" label="Courses" icon={<Icon.Package />} />,
        <NavItem to="/event" label="Event" icon={<Icon.Calendar />} />,
        <NavItem
          to="/notifications"
          label="Notifications"
          icon={<Icon.Bell />}
        />,
        <NavItem to="/profile" label="Profile" icon={<Icon.User />} />,
      ];
};
