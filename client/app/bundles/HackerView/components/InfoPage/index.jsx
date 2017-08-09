import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as pageNavActions from "../../actions/pageNavActions";

class InfoPage extends Component {
  static propTypes = {
    updateBackButton: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.updateBackButton();
  }

  render() {
    return (
      <div>
        <h1>Venue Map</h1>
        <button>View Full Map</button>

        <h1>Live Event Page</h1>
        <p>A live event page, featuring DJ information, a timeline of events, and
          most importantly a big countdown clock.
        </p>
        <button>View Live Page</button>

        <h1>Request A Mentor</h1>
        <p>
          At Hatch, we have a team of mentors who will be happy to help you with
          any technical problem you have!
        </p>
        <button>Get Support</button>

        <h1>Your Guide To <span className="accent">Hatch</span>.</h1>
        <p>A complete guide to everything going on at hatch, including important
          information about the venue as well as emergency contact information and
          schedule.
        </p>
        <button>View The Guide</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ownProps;

const mapDispatchToProps = dispatch => ({
  updateBackButton: () => dispatch(pageNavActions.pageHasNavigated("/", false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage);
