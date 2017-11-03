import React from "react";
import * as Icon from "react-feather";

const FeedbackContainer = () => (
  <div className="splitview-pane">
    <h1>Submit Feedback</h1>
    <p>This feature isn{"'"}t quite ready yet. Come back later!</p>

    <h2>Bugs And Issues</h2>
    <p>
      If you encounter a technical fault with this app, or have any suggestions,
      you can submit feedback by creating an issue on the GitHub project.
    </p>
    <p>
      <a
        href="https://github.com/hatchucl/hatch-site/issues"
        className="button yellow"
        rel="noopener noreferrer"
        target="_blank"
      >
        Feedback
        <Icon.Github />
      </a>
    </p>
  </div>
);

export default FeedbackContainer;
