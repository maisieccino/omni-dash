import React from "react";
import PropTypes from "prop-types";
import * as Icon from "react-feather";

const inputPropTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  after: PropTypes.node,
  error: PropTypes.string,
};

const inputDefaultProps = {
  label: "",
  placeholder: "",
  onChange: () => {},
  value: "",
  className: "",
  children: null,
  type: "text",
  after: null,
  error: "",
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
  after,
  error,
  ...rest
}) => (
  <div>
    <label htmlFor={id}>{label || id}</label>
    <div
      className={`input-group ${error.length > 0 && "invalid"} ${className}`}
    >
      {children}
      <input
        type={type}
        id={id}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        value={value}
        {...rest}
      />
      {(error.length > 0 || after !== null) && (
          <span className="input-addon">
            {error.length > 0 && <Icon.AlertOctagon />}
            {after}
          </span>
        )}
    </div>
    {error.length > 0 && <p className="red">{error}</p>}
  </div>
);

InputField.propTypes = inputPropTypes;
InputField.defaultProps = inputDefaultProps;

const TextField = props => <InputField type="text" {...props} />;
const EmailField = props => <InputField type="email" {...props} />;
const PasswordField = props => <InputField type="password" {...props} />;

export { EmailField, InputField, PasswordField, TextField };
export { default as DateTimePicker } from "./DateTimePicker";
