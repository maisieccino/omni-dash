import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const TopNav = ({ href, visible }) => (<div>
  { visible && <Link className="button" to={href}>Back</Link>}
</div>);

TopNav.propTypes = {
  href: PropTypes.string,
  visible: PropTypes.bool,
};

TopNav.defaultProps = {
  href: "/",
  visible: false,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  href: state.pageNav.abovePath,
  visible: state.pageNav.showBackButton,
});

export default connect(mapStateToProps)(TopNav);
