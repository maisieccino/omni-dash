import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "libs/components/Modal";
import { deleteUser } from "libs/actions/userActions";

class UserActions extends Component {
  static propTypes = {
    userId: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    isDeleting: PropTypes.bool,
    deleteUser: PropTypes.func,
    onDeleteUser: PropTypes.func,
  };

  static defaultProps = {
    isDeleting: false,
    deleteUser: () => {},
    onDeleteUser: () => {},
  };

  static mapStateToProps = state => ({
    isDeleting: state.user.isDeleting,
    error: "",
  });

  static mapDispatchToProps = dispatch => ({
    deleteUser: id => dispatch(deleteUser(id)),
  });

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      deleteSuccess: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // if user deleted successfully
    if (nextProps.isDeleting === false && this.props.isDeleting === true) {
      this.setState({ deleteSuccess: true });
      this.props.onDeleteUser();
    }
  }

  onDeleteConfirm() {
    this.setState({ isModalVisible: false });
    this.props.deleteUser(this.props.userId);
  }

  modalChoices = () => [
    <button key={0} className="primary" onClick={() => this.onDeleteConfirm()}>
      Delete
    </button>,
    <button onClick={() => this.setState({ isModalVisible: false })} key={1}>
      Cancel
    </button>,
  ];

  render() {
    const { userId, firstName, lastName, isDeleting } = this.props;
    if (this.state.deleteSuccess) {
      return (
        <td>
          <p>Deleted!</p>
        </td>
      );
    }
    return (
      <td>
        <Link className="button" to={`/user/${userId}`}>
          View Profile
        </Link>
        <button title="Edit User" className="square">
          <i className="fa fa-pencil" aria-label="Edit user" />
        </button>
        <button
          onClick={() => this.setState({ isModalVisible: true })}
          title="Delete User"
          className="square"
        >
          {isDeleting ? (
            <i
              className="fa fa-refresh spinner"
              aria-label="Deleting User..."
            />
          ) : (
            <i className="fa fa-trash" aria-label="Delete User" />
          )}
        </button>
        <Modal
          choices={this.modalChoices()}
          onCloseButtonClick={() => this.setState({ isModalVisible: false })}
          header="Delete this user?"
          when={this.state.isModalVisible}
        >
          <p>
            Are you sure you want to delete {firstName} {lastName}?
          </p>
        </Modal>
      </td>
    );
  }
}

export default connect(
  UserActions.mapStateToProps,
  UserActions.mapDispatchToProps,
)(UserActions);
