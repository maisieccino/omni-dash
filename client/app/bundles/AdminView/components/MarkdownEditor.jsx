/* eslint react/no-danger: 0 */
import React from "react";
import PropTypes from "prop-types";
import marked from "marked";

const MarkdownEditor = ({ id, value, onChange }) =>
  <div className="markdown-editor">
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
          placeholder="Enter a description for this event..."
          onChange={e => onChange(e.target.value)}
          value={value}
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
  </div>;

MarkdownEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string.isRequired,
};

MarkdownEditor.defaultProps = {
  value: "",
  onChange: () => {},
};

export default MarkdownEditor;
