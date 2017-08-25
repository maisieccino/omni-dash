import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as pageNavActions from "../../actions/pageNavActions";

class EventsPage extends Component {
  static propTypes = {
    updateBackButton: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.updateBackButton();
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <p>Manage courses and their lessons.</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ownProps;

const mapDispatchToProps = dispatch => ({
  updateBackButton: () => dispatch(pageNavActions.pageHasNavigated("/", false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
