import React from "react";
import moment from "moment";
import TimelineComponent, {
  TimelineItem,
  TimelineGroup,
  TimelineHeader,
} from "libs/components/Timeline";

const itemActions = (
  <div className="button-group">
    <button>View</button>
    <button className="square">
      <i className="fa fa-edit" />
    </button>
    <button className="square">
      <i className="fa fa-trash" />
    </button>
  </div>
);

const items = [
  <TimelineItem
    name="How To Use APIs"
    startTime={moment("2017/11/24 19:00")}
    endTime={moment("2017/11/24 20:30")}
    key={0}
  >
    <p>Learn how you can use APIs to give your project super powers!</p>
    {itemActions}
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
    {itemActions}
  </TimelineItem>,
];

const Timeline = () => (
  <div className="splitview-pane">
    <div className="title-bar">
      <h1>Event Timeline</h1>
      <button className="square">
        <i className="fa fa-refresh" />
      </button>
      <button className="square">
        <i className="fa fa-code" />
      </button>
    </div>
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
        {itemActions}
      </TimelineItem>

      <TimelineGroup items={items} />
    </TimelineComponent>
  </div>
);

export default Timeline;
