import { Component } from "react";

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      location: "",
    };
  }
}

export default EditEvent;
