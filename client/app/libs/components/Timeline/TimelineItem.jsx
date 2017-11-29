import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ItemActions from "./ItemActions";

const TimelineItem = ({
  id,
  name,
  startTime,
  endTime,
  children,
  editable,
  onDeleteClick,
  isDeleting,
}) => {
  const start = startTime ? moment(startTime).format("HH:mm") : null;
  const end = endTime ? moment(endTime).format("HH:mm") : "TBC";
  const timeText = start ? `${start} - ${end}` : "Time TBC";
  return (
    <div className="timeline-item">
      <div className="timeline-item-header">
        <h1>
          {editable && `#${id}:`} {name}
        </h1>
        <h2>{timeText}</h2>
      </div>
      <div className="timeline-item-content">
        {children}
        <ItemActions
          onDeleteClick={onDeleteClick}
          editable={editable}
          id={id}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
};

TimelineItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  startTime: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.string,
  ]),
  endTime: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.string,
  ]),
  children: PropTypes.node,
  editable: PropTypes.bool,
  onDeleteClick: PropTypes.func,
  isDeleting: PropTypes.bool,
};

TimelineItem.defaultProps = {
  name: "Untitled Event",
  startTime: null,
  endTime: null,
  children: (
    <p>
      <i>This event has not yet been given a description</i>
    </p>
  ),
  editable: false,
  onDeleteClick: () => {},
  isDeleting: false,
};

export default TimelineItem;
