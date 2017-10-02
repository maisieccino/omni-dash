/* eslint react/no-danger: 0 */
import React, { Component } from "react";
import moment from "moment";
import { generate } from "shortid";
import PropTypes from "prop-types";
import * as Icon from "react-feather";
import marked from "marked";
import { remToPx } from "libs/utils/display";
import ItemActions from "./ItemActions";
import TimelineHeader from "./TimelineHeader";
import TimelineItem from "./TimelineItem";

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
    this.setState({
      mouseY: mouseButtonOpened
        ? mouseY + this.buttonBorderWidth
        : mouseY - this.buttonBorderWidth,
    });
    this.setState({ mouseButtonOpened: !mouseButtonOpened });
  }

  createEventsList() {
    const { events } = this.props;
    const dates = {};
    events.forEach(event => {
      const date = moment(event.start_time).format("YYYY-MM-DD");
      if (!dates[date]) {
        dates[date] = [event];
      } else {
        dates[date].push(event);
      }
    });

    return Object.keys(dates)
      .sort((a, b) => moment(a) > moment(b))
      .map(date => [
        <TimelineHeader key={generate()}>
          {moment(date).format("dddd Do MMMM")}
        </TimelineHeader>,
        dates[date].map(event => (
          <TimelineItem
            name={event.name}
            key={generate()}
            startTime={event.start_time}
            endTime={event.end_time}
          >
            <p
              dangerouslySetInnerHTML={{
                __html: marked(event.description || ""),
              }}
            />
            <ItemActions />
          </TimelineItem>
        )),
      ])
      .reduce((bigArray, array) => [...bigArray, ...array], []);
  }

  render() {
    const { editable } = this.props;
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
            <button
              className={`timeline-add-button ${mouseButtonOpened ||
              showMouseButton
                ? "visible"
                : ""}
                ${mouseButtonOpened ? "active" : ""}
                `}
              onClick={() => this.onAddButtonClick()}
              style={{ top: y }}
            >
              <Icon.Plus />
            </button>
          )}
        </div>
        <div className="timeline-content">{this.createEventsList()}</div>
      </div>
    );
  }
}

Timeline.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape()),
  editable: PropTypes.bool,
};

Timeline.defaultProps = {
  events: [],
  editable: false,
};

export default Timeline;
export { default as TimelineItem } from "./TimelineItem";
export { default as TimelineGroup } from "./TimelineGroup";
export { default as TimelineHeader } from "./TimelineHeader";
