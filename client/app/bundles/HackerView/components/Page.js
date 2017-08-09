import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as pageNavActions from "../actions/pageNavActions";

class Page extends Component {
  componentDidMount() {
    this.props.updateBackButton();
  }
}

Page.propTypes = {
  updateBackButton: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ownProps;

const mapDispatchToProps = dispatch => ({
  updateBackButton: () => dispatch(pageNavActions.pageHasNavigated("/", true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
