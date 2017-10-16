import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { generate } from "shortid";
import NavItem from "libs/components/SplitViewNavItem";

import OverviewPage from "./OverviewPage";
import TimelinePage from "./TimelinePage";

const routes = [
  {
    to: "/event",
    match: "/event/?$",
    label: "Overview",
    exact: true,
    component: OverviewPage,
  },
  {
    to: "/event/timeline",
    label: "Timeline",
    component: TimelinePage,
  },
  {
    to: "/event/live",
    label: "Live Event Page",
  },
  {
    to: "/event/mentor",
    label: "Request a mentor",
  },
  {
    to: "/event/map",
    label: "Venue Map",
  },
  {
    to: "/event/guide",
    label: "Event Guide",
  },
];

// const EventViewPage = ({ events }) => (
//   <div>
//     <h1>Venue Map</h1>
//     <button className="yellow">View Full Map</button>

//     <h1>Live Event Page</h1>
//     <p>
//       A live event page, featuring DJ information, a timeline of events, and
//       most importantly a big countdown clock.
//     </p>
//     <button className="yellow">View Live Page</button>

//     <h1>Request A Mentor</h1>
//     <p>
//       At Hatch, we have a team of mentors who will be happy to help you with any
//       technical problem you have!
//     </p>
//     <button className="mint">Get Support</button>

//     <h1>
//       Your Guide To <span className="accent">Hatch</span>.
//     </h1>
//     <p>
//       A complete guide to everything going on at hatch, including important
//       information about the venue as well as emergency contact information and
//       schedule.
//     </p>
//     <button className="yellow">View The Guide</button>

//     <h1>Upcoming Events</h1>
//     <Timeline events={events} />
//   </div>
// );
const EventViewPage = () => (
  <div className="splitview-main">
    <aside className="splitview-nav">
      {/* programmatically generate navbar from array */}
      {routes.map(route => <NavItem key={generate()} {...route} />)}
    </aside>

    {/* programmatically generate routes from array */}
    <Switch>
      {routes.map(route => (
        <Route key={generate()} path={route.to} {...route} />
      ))}
      <Route render={() => <Redirect to="/event" />} />
    </Switch>
  </div>
);

export default EventViewPage;
