import React, { Component } from "react";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  render() {
    return (
      <nav>
        <p><a rel="nofollow" data-method="delete" href="/auth/sign_out">Sign Out</a></p>
      </nav>
    );
  }
}
