import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as pageNavActions from "../../actions/pageNavActions";

class CoursesPage extends Component {
  static propTypes = {
    updateBackButton: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.updateBackButton();
  }

  render() {
    return (<div>
      <h1>Skill Tree</h1>
      <h1>Workshops At <span className="accent">Hatch</span>.</h1>
    </div>);
  }
}

const mapStateToProps = (state, ownProps) => ownProps;

const mapDispatchToProps = dispatch => ({
  updateBackButton: () => dispatch(pageNavActions.pageHasNavigated("/", false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
