import React from "react";
import PropTypes from "prop-types";

const inputPropTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
};

const inputDefaultProps = {
  label: "",
  placeholder: "",
  onChange: () => {},
  value: "",
  className: "",
  children: null,
  type: "text",
};

const InputField = ({
  id,
  label,
  placeholder,
  onChange,
  value,
  className,
  children,
  type,
  ...rest
}) => (
  <div>
    <label htmlFor={id}>{label || id}</label>
    <div className={`input-group ${className}`}>
      {children}
      <input
        type={type}
        id={id}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        value={value}
        {...rest}
      />
    </div>
  </div>
);

InputField.propTypes = inputPropTypes;
InputField.defaultProps = inputDefaultProps;

const TextField = props => <InputField type="text" {...props} />;
const EmailField = props => <InputField type="email" {...props} />;
const PasswordField = props => <InputField type="password" {...props} />;

export { EmailField, InputField, PasswordField, TextField };
export { default as DateTimePicker } from "./DateTimePicker";
