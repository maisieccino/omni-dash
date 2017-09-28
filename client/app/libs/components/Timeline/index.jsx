import React, { Component } from "react";
import PropTypes from "prop-types";

// tales a CSS rem value and converts it to pixels.
const remToPx = rem =>
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseY: 0,
      showMouseButton: false,
      mouseButtonOpened: false,
    };
    this.buttonBorderWidth = remToPx(0.5);
    this.paddingSize = remToPx(2);
  }

  onMouseMove(e) {
    if (!this.state.mouseButtonOpened && this.props.editable) {
      // update add button's position based on mouse position
      // and component coordinates.
      const coords = this.element.getBoundingClientRect();
      this.setState({ mouseY: e.clientY - coords.y - this.paddingSize });
    }
  }

  onAddButtonClick() {
    const { mouseButtonOpened, mouseY } = this.state;
    if (!mouseButtonOpened) {
      this.setState({ mouseY: mouseY - this.buttonBorderWidth });
    }
    this.setState({ mouseButtonOpened: !mouseButtonOpened });
  }

  render() {
    const { children, editable } = this.props;
    const { mouseButtonOpened, showMouseButton, mouseY: y } = this.state;
    return (
      <div
        className="timeline"
        onMouseMoveCapture={e => this.onMouseMove(e)}
        ref={el => {
          this.element = el;
        }}
      >
        <div
          className="timeline-side"
          onMouseEnter={() => this.setState({ showMouseButton: true })}
          onMouseLeave={() => this.setState({ showMouseButton: false })}
        >
          <div className="timeline-line" />
          {editable && (
            <div
              role="button"
              className={`timeline-add-button ${mouseButtonOpened ||
              showMouseButton
                ? "visible"
                : ""}
                ${mouseButtonOpened ? "active" : ""}
                `}
              onClick={() => this.onAddButtonClick()}
              style={{ top: y }}
            >
              <i className="fa fa-plus" />
            </div>
          )}
        </div>
        <div className="timeline-content">{children}</div>
      </div>
    );
  }
}

Timeline.propTypes = {
  children: PropTypes.node,
  editable: PropTypes.bool,
};

Timeline.defaultProps = {
  children: null,
  editable: false,
};

export default Timeline;
export { default as TimelineItem } from "./TimelineItem";
export { default as TimelineGroup } from "./TimelineGroup";
export { default as TimelineHeader } from "./TimelineHeader";
