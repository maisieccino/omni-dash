import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

class CountdownCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeToStart: moment.duration(moment(props.startTime).diff(moment())),
    };
    this.timer = 0;
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  countDown() {
    this.setState({
      timeToStart: moment.duration(moment(this.props.startTime).diff(moment())),
    });
  }

  startTimer() {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  render() {
    const { className, name, startTime } = this.props;
    const { timeToStart } = this.state;
    return (
      <div className={className}>
        <div className="card-body">
          <h2>Countdown to {name}</h2>
          <p className="center">
            {moment(startTime).format("dddd DD MMMM YYYY")}
          </p>
          <div className="flex horizontal center-items">
            <div className="flex center">
              <h3>{Math.floor(timeToStart.asDays())}</h3>
              <p>Days</p>
            </div>
            <div className="flex center">
              <h3>{timeToStart.hours()}</h3>
              <p>Hours</p>
            </div>
            <div className="flex center">
              <h3>{timeToStart.minutes()}</h3>
              <p>Minutes</p>
            </div>
            <div className="flex center">
              <h3>{timeToStart.seconds()}</h3>
              <p>Seconds</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CountdownCard.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  startTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
};

CountdownCard.defaultProps = {
  className: "",
  name: "Event",
  startTime: Date.now(),
};

export default CountdownCard;
