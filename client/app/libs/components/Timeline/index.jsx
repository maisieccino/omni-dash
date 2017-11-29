/* eslint react/no-danger: 0, react/no-array-index-key: 0 */
import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as Icon from "react-feather";
import marked from "marked";
import { FadeInOut, Stagger } from "react-animation-components";
import { CSSTransition } from "react-transition-group";
import { deleteEvent } from "libs/actions/eventsActions";
import Modal from "libs/components/Modal";
import { remToPx } from "libs/utils/display";
import TimelineHeader from "./TimelineHeader";
import TimelineItem from "./TimelineItem";
import QuickAdd from "./QuickAdd";

class Timeline extends Component {
  static mapStateToProps = state => ({
    isDeleting: state.events.isDeleting,
    error: state.events.error,
  });

  static mapDispatchToProps = dispatch => ({
    deleteEvent: id => dispatch(deleteEvent(id)),
  });

  constructor(props) {
    super(props);
    this.state = {
      mouseY: 0,
      showMouseButton: false,
      mouseButtonOpened: false,
      itemToDelete: -1,
      showModal: false,
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

  onDeleteModalConfirm() {
    this.props.deleteEvent(this.state.itemToDelete);
    this.setState({ showModal: false });
  }

  onDeleteModalCancel() {
    this.setState({ itemToDelete: -1, showModal: false });
  }

  modalChoices = () => [
    <button key={0} className="red" onClick={() => this.onDeleteModalConfirm()}>
      Delete
    </button>,
    <button onClick={() => this.onDeleteModalCancel()} key={1}>
      Cancel
    </button>,
  ];

  createEventsList(editable = false) {
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
        <FadeInOut key={date}>
          <TimelineHeader>{moment(date).format("dddd Do MMMM")}</TimelineHeader>
        </FadeInOut>,
        dates[date].map(event => (
          <FadeInOut key={event.id}>
            <TimelineItem
              name={event.name}
              id={event.id}
              startTime={event.start_time}
              endTime={event.end_time}
              editable={editable}
              onDeleteClick={() =>
                this.setState({ itemToDelete: event.id, showModal: true })}
              isDeleting={
                this.props.isDeleting && event.id === this.state.itemToDelete
              }
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: marked(event.description || ""),
                }}
              />
            </TimelineItem>
          </FadeInOut>
        )),
      ])
      .reduce((bigArray, array) => [...bigArray, ...array], []);
  }

  render() {
    const { editable, isLoading, helpText } = this.props;
    const {
      mouseButtonOpened,
      showMouseButton,
      mouseY: y,
      itemToDelete,
      showModal,
    } = this.state;
    const events = this.createEventsList(editable);
    if (isLoading) {
      return (
        <div className="timeline flex vertical center">
          <h3 className="help-text">Loading events...</h3>
          <Icon.RefreshCw className="spinner" />
        </div>
      );
    }
    return (
      <div
        className={`timeline flex ${events.length <= 0 && "vertical"} `}
        ref={el => {
          this.element = el;
        }}
      >
        <Modal
          choices={this.modalChoices()}
          onCloseButtonClick={() => this.onDeleteModalCancel()}
          header="Delete this item?"
          when={showModal}
        >
          <p>
            Are you sure you want to delete item {itemToDelete}? This is an
            irreversable action.
          </p>
        </Modal>

        {events.length > 0 ? (
          [
            <div
              className="timeline-side"
              onMouseEnter={() => this.setState({ showMouseButton: true })}
              onMouseLeave={() => this.setState({ showMouseButton: false })}
              onMouseMoveCapture={e => this.onMouseMove(e)}
              key={0}
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

              <CSSTransition
                timeout={300}
                classNames="fade"
                in={editable && mouseButtonOpened}
                mountOnEnter
              >
                <QuickAdd y={y} />
              </CSSTransition>
            </div>,
            <div className="timeline-content" key={1}>
              <Stagger delay={50}>{events}</Stagger>
            </div>,
          ]
        ) : (
          <h3 className="help-text">
            {helpText} {editable && "Why not add one?"}
          </h3>
        )}
      </div>
    );
  }
}

Timeline.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape()),
  editable: PropTypes.bool,
  isLoading: PropTypes.bool,
  isDeleting: PropTypes.bool,
  helpText: PropTypes.string,
  deleteEvent: PropTypes.func,
};

Timeline.defaultProps = {
  events: [],
  editable: false,
  isLoading: false,
  isDeleting: false,
  helpText: "There's no events yet.",
  deleteEvent: () => {},
};

export default connect(Timeline.mapStateToProps, Timeline.mapDispatchToProps)(
  Timeline,
);
export { default as TimelineItem } from "./TimelineItem";
export { default as TimelineGroup } from "./TimelineGroup";
export { default as TimelineHeader } from "./TimelineHeader";
