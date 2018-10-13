import React, { Component } from "react";
import _ from "lodash";
import Message from "./message";
import "../App.css";
import fire from "./fire";
import trim from "trim";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
    this.db = fire;
  }

  handleChange3 = event => {
    this.setState({ searchTerm: event.target.value });
    console.log(this.searchTerm);
  };

  onKeyup = e => {
    if (e.keyCode === 13 && trim(e.target.value) !== "") {
      e.preventDefault();
      let dbCon = this.db.database().ref("messages");
      dbCon.push({
        message: trim(e.target.value)
      });
      this.setState({
        searchTerm: ""
      });
    }
  };

  render() {
    let messageNodes = this.props.chat.map(message => {
      return (
        <div
          style={{
            textAlign: "center",
            width: 400,
            margin: 10,
            backgroundColor: "#fff",
            display: "inline-block",
            borderRadius: 3
          }}
        >
          <div>
            <Message message={message.scraped} />
          </div>
        </div>
      );
    });

    return (
      <div>
        <br />
        <br />
        <br />
        <br />

        <h1>Search the trending news around you in real-time</h1>
        <br />
        <form>
          <textarea
            style={{ padding: 5, marginRight: 5, resize: "none" }}
            placeholder="Search the topic you want news about"
            cols="30"
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleChange3}
            onKeyUp={this.onKeyup}
          />
        </form>
        {messageNodes}
        <br />
        <br />
      </div>
    );
  }
}

export default News;
