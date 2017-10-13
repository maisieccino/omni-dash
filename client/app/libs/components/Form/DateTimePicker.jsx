import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

class DateTimePicker extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(moment),
      PropTypes.instanceOf(Date),
    ]),
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    value: moment(),
    label: "Time",
    placeholder: "",
    onChange: () => {},
  };

  onDateChange(e) {
    // moment() returns a moment instance regardless if the arg is a moment
    // instance or a string.
    const old = moment(this.props.value);
    const newVal = moment(`${e.target.value} ${old.format("HH:mm")}`);
    // only update if the new value is a valid datetime.
    // this sometimes happens if the user tries to select,
    // say, the 30th February...
    this.props.onChange(newVal.isValid() ? newVal : old);
  }

  onTimeChange(e) {
    const old = moment(this.props.value);
    const newVal = moment(`${old.format("YYYY-MM-DD")} ${e.target.value}`);
    this.props.onChange(newVal);
  }

  render() {
    const { id, label, placeholder } = this.props;
    const value = moment(this.props.value);
    return (
      <div>
        <label htmlFor={`${id}_date`}>Start Time</label>
        <div className="input-group">
          <input
            id={`${id}_date`}
            type="date"
            value={value.format("YYYY-MM-DD")}
            onChange={e => this.onDateChange(e)}
            placeholder={`${placeholder} date...`}
          />
          <input
            id={`${id}_time`}
            type="time"
            value={value.format("HH:mm")}
            onChange={e => this.onTimeChange(e)}
            placeholder={`${placeholder} time...`}
          />
        </div>
      </div>
    );
  }
}

export default DateTimePicker;
