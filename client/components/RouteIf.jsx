// https://gist.github.com/kud/6b722de9238496663031dbacd0412e9d
import React from "react";
import { Route } from "react-router-dom";

const RouteIf = ({ condition, path, component, elseComponent }) =>
  condition ? (
    <Route path={path} component={component} />
  ) : (
    <Route path={path} component={elseComponent} />
  );

export default RouteIf;
