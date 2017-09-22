import React from "react";
import MarkdownEditor from "libs/components/MarkdownEditor";

const ContactAttendees = () => (
  <div className="splitview-pane">
    <h1>Contact Attendees</h1>
    <form>
      <p>
        Contact your attendees by sending them a notification. If they aren{"'"}t
        logged in, they{"'"}ll receive an email as well.
      </p>
      <label htmlFor="message-title">Title</label>
      <div className="input-group">
        <input id="message-title" type="text" placeholder="Hello!" />
      </div>

      <label htmlFor="message-body">Message Content</label>
      <MarkdownEditor id="message-body" />
      <p>
        <button>
          Send <i className="fa fa-paper-plane" />
        </button>
      </p>
    </form>
  </div>
);

export default ContactAttendees;
