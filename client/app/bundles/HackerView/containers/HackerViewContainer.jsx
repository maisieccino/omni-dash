// Simple example of a React "smart" component

import { connect } from "react-redux";
import { fetchCompetition } from "libs/actions/competitionActions";
import {
  onReceiveNotification,
  fetchNotifications,
} from "libs/actions/notificationsActions";
import HackerView from "../components/HackerView";

navigator.serviceWorker.register("/assets/sw.js");

// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = state => ({
  current_user: state.current_user,
  notifications: state.notifications.notifications,
});

const mapDispatchToProps = dispatch => ({
  fetchCompetition: () => dispatch(fetchCompetition()),
  fetchNotifications: () => dispatch(fetchNotifications()),
  onReceiveNotification: notification =>
    dispatch(onReceiveNotification(notification)),
});

// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(mapStateToProps, mapDispatchToProps)(HackerView);
