import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { generate } from "shortid";
import Feed from "./Feed";
import Card from "./Card";

class FeedContainer extends Component {
  static mapStateToProps = state => ({
    competition: state.competition.competition,
  });

  static propTypes = {
    competition: PropTypes.shape(),
  };

  static defaultProps = {
    competition: {},
  };

  static generateFeedItems = competition => {
    const eventHasStarted =
      Date.now() - Date.parse(competition.start_time) >= 0;
    // const eventHasEnded = Date.now() - Date.parse(competition.end_time) >= 0;
    const feedItems = [];

    if (!eventHasStarted) {
      feedItems.push({
        type: "countdown",
        startTime: competition.start_time,
        name: competition.name,
      });
      feedItems.push({
        type: "directions",
        location: competition.location,
      });
    } else {
      feedItems.push({
        type: "currentEvents",
        currentEvent: {
          name: "React Workshop",
          startTime: "18:00",
          endTime: "19:00",
          location: "Gustav Tuck Lecture Theatre",
        },
        nextEvent: {
          name: "Pitching Your Hack",
          startTime: "18:30",
          endTime: "18:40",
          location: "Main Quad Marquee",
        },
      });
    }

    feedItems.push({
      type: "currentLesson",
      currentLesson: {
        courseName: "Intro To React",
        lessonName: "Making Components",
        lessonsCompleted: 5,
        totalLessons: 7,
      },
    });

    return feedItems;
  };

  constructor(props) {
    super(props);
    this.state = {
      feedItems: FeedContainer.generateFeedItems(props.competition),
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      feedItems: FeedContainer.generateFeedItems(newProps.competition),
    });
  }

  render() {
    // map cards to their respective drawables.
    const cards = this.state.feedItems.map(item =>
      <Card key={generate()} {...item} />,
    );

    return (
      <Feed>
        {cards}
      </Feed>
    );
  }
}

export default connect(FeedContainer.mapStateToProps)(FeedContainer);
