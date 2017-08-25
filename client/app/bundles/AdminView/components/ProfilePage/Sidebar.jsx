import React from "react";
import PropTypes from "prop-types";
import { generate } from "shortid";
import ContactInfoItem from "./ContactInfoItem";

const getContactPrefix = name => {
  switch (name.toLowerCase()) {
    case "contact_twitter":
      return "@";
    case "contact_linkedin":
      return "/in/";
    default:
      return "";
  }
};

const contactInfo = user =>
  Object.keys(user)
    .filter(key => key.match("contact_"))
    .filter(key => user[key])
    .map(key =>
      <ContactInfoItem
        name={key.replace("contact_", "")}
        value={user[key]}
        prefix={getContactPrefix(key)}
        key={generate()}
      />,
    );

const Sidebar = props =>
  <aside className="profile-sidebar">
    <h2>Contact Info</h2>
    {contactInfo(props)}
  </aside>;

Sidebar.propTypes = {
  contact_twitter: PropTypes.string,
  contact_website: PropTypes.string,
  contact_linkedin: PropTypes.string,
};

Sidebar.defaultProps = {
  contact_twitter: "",
  contact_website: "",
  contact_linkedin: "",
};

export default Sidebar;
