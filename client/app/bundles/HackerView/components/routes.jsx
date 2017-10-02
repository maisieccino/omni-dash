import React from "react";
import * as Icon from "react-feather";
import { NavItem } from "libs/components/Navigation";

export default [
  <NavItem to="/" label="Home" icon={<Icon.Home />} />,
  <NavItem to="/courses" label="Courses" icon={<Icon.Package />} />,
  <NavItem to="/event" label="Event" icon={<Icon.Calendar />} />,
  <NavItem to="/notifications" label="Notifications" icon={<Icon.Bell />} />,
  <NavItem to="/profile" label="Profile" icon={<Icon.User />} />,
];
