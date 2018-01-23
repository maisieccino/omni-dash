import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/**
 * Connected component that allows a user to view and change their
 * avatar (profile picture).
 *
 * @class AvatarChooser
 * @extends {Component}
 */
class AvatarChooser extends Component {
  static propTypes = {
    user: PropTypes.shape(),
    uploadImage: PropTypes.func
  };

  static defaultProps = {
    user: {},
    uploadImage: () => {}
  };
}

export default AvatarChooser;
