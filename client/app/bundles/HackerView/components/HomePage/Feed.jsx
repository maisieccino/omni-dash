/* eslint react/prop-types: 0 */
import React from "react";
import { generate } from "shortid";
import { FadeInOut, Stagger } from "react-animation-components";

const Feed = ({ children }) => (
  <div className="feed">
    <Stagger delay={100}>
      {children.map(child => <FadeInOut key={generate()}>{child}</FadeInOut>)}
    </Stagger>
  </div>
);

export default Feed;
