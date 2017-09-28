import React from "react";
import moment from "moment";
import TimelineComponent, {
  TimelineItem,
  TimelineGroup,
  TimelineHeader,
} from "libs/components/Timeline";

const items = [
  <TimelineItem
    name="How To Use APIs"
    startTime={moment("2017/11/24 19:00")}
    endTime={moment("2017/11/24 20:30")}
    key={0}
  >
    <p>Learn how you can use APIs to give your project super powers!</p>
  </TimelineItem>,
  <TimelineItem
    name="Hosting Your App on AWS"
    startTime={moment("2017/11/24 19:10")}
    endTime={moment("2017/11/24 21:00")}
    key={1}
  >
    <p>
      AWS is a popular service you can use to host your app on the cloud for
      others to use.
    </p>
  </TimelineItem>,
];

const Timeline = () => (
  <div className="splitview-pane">
    <h1>Event Timeline</h1>
    <TimelineComponent editable>
      <TimelineHeader>Friday 24th November</TimelineHeader>
      <TimelineItem
        name="React Workshop"
        startTime={moment("2017/11/24 18:00")}
        endTime={moment("2017/11/24 20:00")}
      >
        <p>
          In this workshop, we{"'"}ll dive straight into the world of React and
          you{"'"}ll build a responsive, interactive webapp.
        </p>
      </TimelineItem>

      <TimelineGroup items={items} />
    </TimelineComponent>
  </div>
);

export default Timeline;
