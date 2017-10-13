import React from "react";
import PropTypes from "prop-types";
import Timeline from "libs/components/Timeline";

const EventViewPage = ({ events }) => (
  <div>
    <h1>Venue Map</h1>
    <button className="yellow">View Full Map</button>

    <h1>Live Event Page</h1>
    <p>
      A live event page, featuring DJ information, a timeline of events, and
      most importantly a big countdown clock.
    </p>
    <button className="yellow">View Live Page</button>

    <h1>Request A Mentor</h1>
    <p>
      At Hatch, we have a team of mentors who will be happy to help you with any
      technical problem you have!
    </p>
    <button className="mint">Get Support</button>

    <h1>
      Your Guide To <span className="accent">Hatch</span>.
    </h1>
    <p>
      A complete guide to everything going on at hatch, including important
      information about the venue as well as emergency contact information and
      schedule.
    </p>
    <button className="yellow">View The Guide</button>

    <h1>Upcoming Events</h1>
    <Timeline events={events} />
  </div>
);

EventViewPage.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape()),
};

EventViewPage.defaultProps = {
  events: [],
};

export default EventViewPage;
