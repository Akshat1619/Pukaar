import React, { Component } from "react";
import "../App.css";
import main from "../static/1.png";

class StartPage extends Component {
  state = {};

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="carousel">
          <img className="carousel" src={main} />
        </div>
      </div>
    );
  }
}

export default StartPage;
