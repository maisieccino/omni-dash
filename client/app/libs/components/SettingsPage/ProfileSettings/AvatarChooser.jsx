import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as Icon from "react-feather";
import { uploadAvatar } from "libs/actions/userActions";

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
    uploadImage: PropTypes.func,
    isUploadingAvatar: PropTypes.bool,
  };

  static defaultProps = {
    user: {},
    uploadImage: () => {},
    isUploadingAvatar: false,
  };

  static mapStateToProps = state => ({
    user: state.user.user,
    isUploadingAvatar: state.user.isUploadingAvatar,
  });

  static mapDispatchToProps = dispatch => ({
    uploadImage: file => dispatch(uploadAvatar(file)),
  });

  state = {
    file: null,
    imageUrl: "",
  };

  onImagePicked(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file,
        imageUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  onSaveClick(e) {
    e.preventDefault();
    this.props.uploadImage(this.state.file);
  }

  render() {
    const { user, isUploadingAvatar } = this.props;
    const { imageUrl } = this.state;
    return (
      <Fragment>
        <h2>Profile Image</h2>
        <div className="horizontal center-items center flex fullwidth">
          <div>
            <div
              style={{
                backgroundImage: `url(${user.avatar_url ||
                  "/assets/user_missing.png"})`,
              }}
              className="image large round"
            />
            <h3>Old Image</h3>
          </div>
          <div>
            <h3>
              <Icon.ArrowRight />
            </h3>
          </div>
          <div>
            <div
              style={{
                backgroundImage: `url(${imageUrl ||
                  "/assets/user_missing.png"})`,
              }}
              className={`image large round flex center center-items ${isUploadingAvatar
                ? "blur"
                : ""}`}
            >
              {isUploadingAvatar && <Icon.RefreshCw className="spinner" />}
            </div>
            <h3>New Image</h3>
          </div>
        </div>
        <input
          type="file"
          onChange={e => this.onImagePicked(e)}
          accept="image/*"
          multiple={false}
        />
        <p>
          <button onClick={e => this.onSaveClick(e)}>Save</button>
        </p>
      </Fragment>
    );
  }
}

export default connect(
  AvatarChooser.mapStateToProps,
  AvatarChooser.mapDispatchToProps,
)(AvatarChooser);
