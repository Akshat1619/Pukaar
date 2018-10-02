import React, { Component } from "react";
import fire from "./fire";
import News from "./news";
import "../App.css";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    todos: [],
    value1: "",
    value2: "",
    value3: ""
  };

  componentDidMount() {
    this.interval = setInterval(() => this.fetcher(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleChange1 = event => {
    this.setState({ value1: event.target.value });
  };

  handleChange2 = event => {
    this.setState({ value2: event.target.value });
  };

  handleChange3 = event => {
    this.setState({ value3: event.target.value });
  };

  handleSubmit = event => {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  };

  fetcher = e => {
    fetch("http://127.0.0.1:8000/task/")
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          todos: json
        });
      });
  };

  sender = e => {
    fetch("http://127.0.0.1:8000/task/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task_name: this.state.value1,
        task_desc: this.state.value2
      })
    }).catch(error => {
      console.error(error);
    });
  };

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
    return (
      <div>
        {this.state.todos.map(item => (
          <div key={item.id}>
            <h1>{item.task_name}</h1>
            <span>{item.task_desc}</span>
          </div>
        ))}
        <h1> Posting in django </h1>
        <form onSubmit={this.sender}>
          <input
            type="text"
            value={this.state.value1}
            onChange={this.handleChange1}
          />
          <input
            type="text"
            value={this.state.value2}
            onChange={this.handleChange2}
          />
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Home;
