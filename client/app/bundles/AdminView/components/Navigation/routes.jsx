import React from "react";
import NavItem from "./NavItem";

export default [
  <NavItem to="/" match="^/$" label="Home" icon="home" />,
  <NavItem to="/users" label="Users" icon="users" />,
  <NavItem to="/event" match="/event/*" label="Event" icon="calendar" />,
  <NavItem to="/courses" label="Courses" icon="graduation-cap" />,
  <NavItem to="/profile" label="Profile" icon="user" />,
];
