import React from "react";
import * as Icon from "react-feather";

const AboutPage = () => (
  <div className="splitview-pane">
    <div className="title-bar">
      <h1>About Hatch Dashboard</h1>
    </div>

    <h2>Version</h2>
    <p>{process.env.APP_VERSION}</p>
    <p>Revision {process.env.APP_REVISION}</p>

    <h2>Author</h2>
    <img
      src="/assets/mattbell-logo-color.png"
      className="icon"
      alt="Matt Bell's logo"
    />
    <p>
      Released by{" "}
      <a href="https://mbell.me" rel="noopener noreferrer" target="_blank">
        Matt Bell
      </a>{" "}
      under the GPL 3.0 license.
    </p>
    <p>
      <a
        href="https://github.com/hatchucl/hatchsite"
        className="button yellow"
        rel="noopener noreferrer"
        target="_blank"
      >
        Source Code
        <Icon.Github />
      </a>
    </p>
  </div>
);

export default AboutPage;
