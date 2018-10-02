import React, { Component } from "react";
import _ from "lodash";
import Message from "./message";
import "../App.css";
import fire from "./fire";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      value3: ""
    };
    this.db = fire;
    let app = this.db.database().ref("scraper");
    app.on("value", snapshot => {
      this.getData(snapshot.val());
    });
  }

  handleChange3 = event => {
    this.setState({ value3: event.target.value });
  };

  getData(values) {
    let messagesVal = values;
    let messages = _(messagesVal)
      .keys()
      .map(messageKey => {
        let cloned = _.clone(messagesVal[messageKey]);
        cloned.key = messageKey;
        return cloned;
      })
      .value();
    this.setState({
      messages: messages
    });
  }

  send_scraper = e => {
    fetch("http://127.0.0.1:8000/search/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        search: this.state.value3
      })
    }).catch(error => {
      console.error(error);
    });
  };

  render() {
    let messageNodes = this.state.messages.map(message => {
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
        <form onSubmit={this.send_scraper}>
          <input
            style={{ padding: 5, marginRight: 5 }}
            type="text"
            value={this.state.value3}
            onChange={this.handleChange3}
          />

          <button
            style={{ padding: 8, fontWeight: "bold" }}
            type="submit"
            value="Submit"
          >
            Submit
          </button>
        </form>
        {messageNodes}
      </div>
    );
  }
}

export default News;
