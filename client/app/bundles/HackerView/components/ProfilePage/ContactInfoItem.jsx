import React from "react";
import PropTypes from "prop-types";

const ContactInfoItem = ({ name, prefix, value }) =>
  <div className="contact-info-item">
    <h3>
      {name}
    </h3>
    <p>
      {prefix}
      {value}
    </p>
  </div>;

ContactInfoItem.propTypes = {
  name: PropTypes.string.isRequired,
  prefix: PropTypes.string,
  value: PropTypes.string.isRequired
};

ContactInfoItem.defaultProps = {
  prefix: ""
};

export default ContactInfoItem;
