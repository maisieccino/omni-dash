/* eslint react/no-danger: 0 */
import React from "react";
import PropTypes from "prop-types";
import marked from "marked";

marked.setOptions({
  sanitize: true,
  gfm: true,
});

const MarkdownEditor = ({
  id,
  value,
  onChange,
  className,
  disabled,
  placeholder,
  ...rest
}) => (
  <div className="markdown-editor" {...rest}>
    <div>
      <div className="input-container">
        <p>
          You can enter Markdown-formatted text here.{" "}
          <a href="https://help.github.com/articles/basic-writing-and-formatting-syntax/">
            What{"'"}s this?
          </a>
        </p>
        <textarea
          id={id}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          value={value}
          disabled={disabled}
          className={className}
        />
      </div>
      <div className="preview-container">
        <p>
          <strong>Preview</strong>
        </p>
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: marked(value) }}
        />
      </div>
    </div>
  </div>
);

MarkdownEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

MarkdownEditor.defaultProps = {
  value: "",
  onChange: () => {},
  className: "",
  placeholder: "Enter your text...",
  disabled: false,
};

export default MarkdownEditor;
