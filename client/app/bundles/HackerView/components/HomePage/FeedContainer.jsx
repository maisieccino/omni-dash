import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { generate } from "shortid";
import * as Icon from "react-feather";
import Feed from "./Feed";
import Card from "./Card";

class FeedContainer extends Component {
  static mapStateToProps = state => ({
    competition: state.competition.competition,
    isFetching: state.competition.isFetching,
  });

  static propTypes = {
    competition: PropTypes.shape(),
    isFetching: PropTypes.bool,
    fetchCompetition: PropTypes.func,
  };

  static defaultProps = {
    competition: {},
    isFetching: false,
    fetchCompetition: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      feedItems: this.generateFeedItems(props.competition),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      feedItems: this.generateFeedItems(nextProps.competition),
    });
    this.forceUpdate();
  }

  generateFeedItems = competition => {
    const eventHasStarted =
      Date.now() - Date.parse(competition.start_time) >= 0;
    const eventHasEnded = Date.now() - Date.parse(competition.end_time) >= 0;
    const feedItems = [];

    if (!eventHasEnded) {
      if (!eventHasStarted) {
        feedItems.push({
          type: "countdown",
          startTime: competition.start_time || "",
          name: competition.name,
        });
      } else {
        feedItems.push({
          type: "currentEvents",
          competitionStart: competition.start_time || "",
          competitionEnd: competition.end_time || "",
          currentEvent: competition.current_event || {},
          nextEvent: competition.next_event || {},
        });
      }
      feedItems.push({
        type: "directions",
        location: competition.location,
        latitude: competition.latitude,
        longitude: competition.longitude,
      });
    } else {
      feedItems.push({
        type: "informational",
        title: `Thanks for attending ${competition.name}!`,
        children: (
          <p>
            Photos and media will be on our website shortly. Keep an eye on our
            social media for more information!
          </p>
        ),
      });
    }

    if ("Notification" in window) {
      if (Notification.permission !== "granted") {
        feedItems.push({
          type: "notificationPermission",
          onGranted: () =>
            this.setState({
              feedItems: this.generateFeedItems(this.props.competition),
            }),
        });
      }
    }

    // feedItems.push({
    //   type: "currentLesson",
    //   currentLesson: {
    //     courseName: "Intro To React",
    //     lessonName: "Making Components",
    //     lessonsCompleted: 5,
    //     totalLessons: 7,
    //   },
    // });

    return feedItems;
  };
  render() {
    // map cards to their respective drawables.
    const cards = this.state.feedItems.map(item => (
      <Card key={generate()} {...item} />
    ));

    if (this.props.isFetching) {
      return (
        <div>
          <h3 className="help-text">Loading Feed...</h3>
          <h3 className="help-text">
            <Icon.RefreshCw className="spinner" />
          </h3>
          <h3 className="help-text">{JSON.stringify(this.props, "\n", 3)}</h3>
        </div>
      );
    }
    return <Feed>{cards}</Feed>;
  }
}

export default connect(FeedContainer.mapStateToProps)(FeedContainer);
