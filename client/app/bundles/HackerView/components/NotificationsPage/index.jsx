import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as pageNavActions from "../../actions/pageNavActions";

class NotificationsPage extends Component {
  static propTypes = {
    updateBackButton: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.updateBackButton();
  }

  render() {
    return (
      <div>
        <h1>Your Notifications</h1>
        <p><i>You have no notifications. Hooray!</i></p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ownProps;

const mapDispatchToProps = dispatch => ({
  updateBackButton: () => dispatch(pageNavActions.pageHasNavigated("/", false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsPage);
