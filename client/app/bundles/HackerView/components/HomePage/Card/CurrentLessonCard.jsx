/* eslint react/prop-types: 0 */
import React from "react";

const CurrentLessonCard = ({
  currentLesson,
  className,
}) => (<div className={className}>
  <div className="card-body">
    <h2>Continue Learning</h2>
    <h3>{currentLesson.courseName}</h3>
    <p>Current Lesson: {currentLesson.lessonName}</p>
    <button>Continue Lesson</button>
  </div>
  <div className="card-footer">
    <p>5/7 completed</p>
    <progress value="5" max="7" />
  </div>
</div>);

export default CurrentLessonCard;
