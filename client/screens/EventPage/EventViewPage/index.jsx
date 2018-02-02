/* eslint react/no-array-index-key: 0 */
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { generate } from "shortid";
import { FadeInOut, Stagger } from "react-animation-components";
import NavItem from "../../../components/SplitViewNavItem";

import OverviewPage from "./OverviewPage";
import TimelinePage from "./TimelinePage";
import LiveEventPage from "./LiveEventPage";
import RequestHelpPage from "./RequestHelpPage";
import VenueMapPage from "./VenueMapPage";
import GuidePage from "./GuidePage";

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
    component: LiveEventPage,
  },
  {
    to: "/event/help",
    label: "Request Help",
    component: RequestHelpPage,
  },
  {
    to: "/event/map",
    label: "Venue Map",
    component: VenueMapPage,
  },
  {
    to: "/event/guide",
    label: "Event Guide",
    component: GuidePage,
  },
];

const EventViewPage = () => (
  <div className="splitview-main">
    <aside className="splitview-nav">
      {/* programmatically generate navbar from array */}
      <Stagger delay={50}>
        {routes.map((route, i) => (
          <FadeInOut key={i}>
            <NavItem key={generate()} {...route} />
          </FadeInOut>
        ))}
      </Stagger>
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
