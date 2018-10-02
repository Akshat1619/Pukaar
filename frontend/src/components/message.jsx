import React, { Component } from "react";
import "../App.css";

class Message extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div style={{ padding: 20, margin: 40 }}>{this.props.message}</div>;
  }
}
export default Message;
