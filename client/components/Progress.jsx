import React, { Component } from "react";
import PropTypes from "prop-types";

class Progress extends Component {
  static propTypes = {
    value: PropTypes.number,
    max: PropTypes.number,
  };

  static defaultProps = {
    value: 0,
    max: 10,
  };

  constructor(props) {
    super(props);
    this.el = null;
    this.state = {
      isVisible: false,
    };
  }

  componentDidMount() {
    this.isInViewport();
  }

  isInViewport(offset = 0) {
    if (!this.el) return;
    const top = this.el.getBoundingClientRect().top;
    if (top + offset >= 0 && top - offset <= window.innerHeight) {
      const update = this.setState.bind(this, { isVisible: true });
      setTimeout(update, 1000);
    }
  }

  render() {
    const { isVisible } = this.state;
    return (
      <progress
        className={isVisible ? "" : "hidden"}
        onScroll={() => this.isInViewport()}
        ref={el => {
          this.el = el;
        }}
        {...this.props}
      />
    );
  }
}

export default Progress;
