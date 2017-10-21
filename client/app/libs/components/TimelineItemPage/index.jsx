/* eslint react/no-danger: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as Icon from "react-feather";
import moment from "moment";
import marked from "marked";
import { fetchTimelineItem } from "libs/actions/timelineItemActions";
import Flash from "libs/components/Flash";

class TimelineItemPage extends Component {
  static propTypes = {
    fetchTimelineItem: PropTypes.func,
    timelineItem: PropTypes.shape(),
    isFetching: PropTypes.bool,
    error: PropTypes.string,
  };

  static defaultProps = {
    match: { params: {} },
    fetchTimelineItem: () => {},
    timelineItem: {},
    isFetching: false,
    error: "",
  };

  static mapStateToProps = state => ({
    timelineItem: state.timelineItem.timelineItem,
    isFetching: state.timelineItem.isFetching,
    error: state.timelineItem.error,
  });

  static mapDispatchToProps = (dispatch, { match }) => ({
    fetchTimelineItem: () => dispatch(fetchTimelineItem(match.params.id)),
  });

  componentWillMount() {
    this.props.fetchTimelineItem();
  }

  render() {
    const { timelineItem, isFetching, error } = this.props;
    const {
      name = `${error ? "Error loading event" : "Untitled Event"}`,
      description,
      start_time: startTime,
      end_time: endTime,
    } = timelineItem;

    let timeText = "";
    if (Date.parse(startTime) > Date.now()) {
      timeText = `Starts ${moment(startTime).fromNow()}`;
    } else if (Date.parse(endTime) > Date.now()) {
      timeText = "Currently happening";
    } else {
      timeText = `Finished ${moment(endTime).fromNow()}`;
    }

    return (
      <div>
        <div className="title-bar">
          <button
            className="yellow square"
            title="Go back"
            onClick={() => window.history.back()}
          >
            <Icon.ArrowLeft />
          </button>
          <h1>{name}</h1>
          <button
            className="mint square"
            disabled={isFetching}
            onClick={() => this.props.fetchTimelineItem()}
          >
            <Icon.RefreshCw className={isFetching ? "spinner" : ""} />
          </button>
          <button className="mint square">
            <Icon.Bell />
          </button>
        </div>
        <Flash type="alert" when={error.length > 0}>
          {error}
        </Flash>

        {!error && (
          <div>
            <h3>{timeText}</h3>
            <h3>
              {moment(startTime).format("dddd Mo MMMM, HH:mm")} -{" "}
              {moment(endTime).format("HH:mm")}
            </h3>
            <h2>Description</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: marked(
                  description || "_No description provided for this event._",
                ),
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  TimelineItemPage.mapStateToProps,
  TimelineItemPage.mapDispatchToProps,
)(TimelineItemPage);
