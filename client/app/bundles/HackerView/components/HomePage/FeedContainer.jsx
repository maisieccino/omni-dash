import React, { Component } from "react";
import { generate } from "shortid";
import Feed from "./Feed";
import Card from "./Card";

class FeedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedItems: [
        {
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
        },
        {
          type: "currentLesson",
          currentLesson: {
            courseName: "Intro To React",
            lessonName: "Making Components",
            lessonsCompleted: 5,
            totalLessons: 7,
          },
        },
      ],
    };
  }

  render() {
    // map cards to their respective drawables.
    const cards = this.state.feedItems
      .map(item => <Card key={generate()} {...item} />);

    return (<Feed>
      { cards }
    </Feed>);
  }
}

export default FeedContainer;
