import React, { Component } from "react";
import PropTypes from "prop-types";

class QuickAdd extends Component {
  static propTypes = {
    y: PropTypes.number,
  };

  static defaultProps = {
    y: 0,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { y } = this.props;
    return (
      <div className="timeline-quick-add" style={{ top: y }}>
        <h1>Quick Add</h1>
      </div>
    );
  }
}

export default QuickAdd;
