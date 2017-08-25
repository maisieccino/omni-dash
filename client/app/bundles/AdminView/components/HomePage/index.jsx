/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as pageNavActions from "../../actions/pageNavActions";

class HomePage extends Component {
  static propTypes = {
    updateBackButton: PropTypes.func.isRequired,
    user: PropTypes.shape(),
  };

  static defaultProps = {
    user: {},
  };

  componentDidMount() {
    this.props.updateBackButton();
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>
          Hello, <span className="accent">{user.first_name}</span>.
        </h1>
        <h2>Admin Dashboard</h2>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ownProps;

const mapDispatchToProps = dispatch => ({
  updateBackButton: () => dispatch(pageNavActions.pageHasNavigated("/", false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
