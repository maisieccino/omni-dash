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

  static generateFeedItems = competition => {
    const eventHasStarted =
      Date.now() - Date.parse(competition.start_time) >= 0;
    // const eventHasEnded = Date.now() - Date.parse(competition.end_time) >= 0;
    const feedItems = [];

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

    // feedItems.push({
    //   type: "currentLesson",
    //   currentLesson: {
    //     courseName: "Intro To React",
    //     lessonName: "Making Components",
    //     lessonsCompleted: 5,
    //     totalLessons: 7,
    //   },
    // });
    feedItems.push({
      type: "directions",
      location: competition.location,
      latitude: competition.latitude,
      longitude: competition.longitude,
    });

    return feedItems;
  };

  constructor(props) {
    super(props);
    this.state = {
      feedItems: FeedContainer.generateFeedItems(props.competition),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      feedItems: FeedContainer.generateFeedItems(nextProps.competition),
    });
    this.forceUpdate();
  }

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
