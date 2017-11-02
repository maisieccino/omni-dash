import React from "react";
import * as Icon from "react-feather";
import moment from "moment";
import Flash from "libs/components/Flash";
import Timeline from "libs/components/Timeline";

const events = [
  {
    name: "Test Event",
    start_time: moment(),
    end_time: moment().add(1, "hour"),
  },
];

const TestPage = () => (
  <div>
    <h1>Component Test Page</h1>
    <p>Use for testing styling of components and elements.</p>

    <h2>Buttons</h2>
    <h3>Text Buttons</h3>
    <div className="title-bar">
      <button>Default Button</button>
      <button className="yellow">Yellow Button</button>
      <button className="mint">Mint Button</button>
      <button className="blue">Blue Button</button>
      <button disabled>Disabled Button</button>
    </div>
    <h3>Symbol Buttons</h3>
    <p>
      Icons from <a href="https://feathericons.com/">Feather Icons</a>.
    </p>
    <div className="title-bar">
      <button className="square">
        <Icon.Bell />
      </button>
      <button className="square yellow">
        <Icon.Navigation />
      </button>
      <button className="square mint">
        <Icon.Headphones />
      </button>
      <button className="square blue">
        <Icon.Cast />
      </button>
      <button disabled className="square">
        <Icon.Trash2 />
      </button>
      <button className="square">
        <Icon.RefreshCw className="spinner" />
      </button>
    </div>

    <h2>Timeline</h2>
    <h3>Read-only Timeline</h3>
    <Timeline events={events} />
    <h3>Modifiable Timeline</h3>
    <Timeline editable events={events} />

    <h2>Flash</h2>
    <Flash>This is an uncoloured flash.</Flash>
    <Flash when type="notice">
      This is a notice
    </Flash>
    <Flash when type="alert">
      This is for errors.
    </Flash>
    <Flash when type="warning">
      This is for warnings.
    </Flash>
    <Flash when type="success">
      This is for successful actions!
    </Flash>

    <span className="blue">blue</span>
  </div>
);

export default TestPage;
