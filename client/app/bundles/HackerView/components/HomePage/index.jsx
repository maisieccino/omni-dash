/* eslint react/prop-types: 0 */
import React from "react";
import FeedContainer from "./FeedContainer";

const HomePage = ({ user }) => (
  <div>
    <h1>Hello, <span className="accent">{ user.first_name }</span>.</h1>

    {/* <div className="feed">
      <div className="feed-card flex-card">
        <div className="card-body">
          <section className="card-section">
            <h2>What{"'"}s On</h2>
            <h3>React Workshop</h3>
            <p>18:00 - 19:00</p>
            <p>Gustav Tuck Lecture Theatre</p>
            <button>Learn More</button>
          </section>
          <section className="card-section">
            <h2>Coming Up Next</h2>
            <h3>Pitching Your Hack</h3>
            <p>18:30 - 18:40</p>
            <p>Main Quad Marquee</p>
            <button>Learn More</button>
          </section>
        </div>
        <div className="card-footer">
          <p>Hackathon Progress</p>
          <progress value="9" max="24" />
          <p>15 hours remaining</p>
        </div>
      </div>

      <div className="feed-card">
        <div className="feed-body">
          <h2>Continue Learning</h2>
          <h3>Intro To React</h3>
          <p>Current lesson: Making Components</p>
          <button>Continue</button>
        </div>
        <div className="card-footer">
          <p>5/7 completed</p>
          <progress value="5" max="7" />
        </div>
      </div>

    </div> */}

    <FeedContainer />
  </div>
);

export default HomePage;
