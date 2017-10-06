import React from "react";
import PropTypes from "prop-types";

const TextField = ({
  id,
  label,
  placeholder,
  onChange,
  value,
  className,
  children,
  ...rest
}) => (
  <div>
    <label htmlFor={id}>{label || id}</label>
    <div className={`input-group ${className}`}>
      {children}
      <input
        type="text"
        id={id}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        value={value}
        {...rest}
      />
    </div>
  </div>
);

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

TextField.defaultProps = {
  label: "",
  placeholder: "",
  onChange: () => {},
  value: "",
  className: "",
  children: null,
};

export { TextField };

export default {
  TextField,
};
