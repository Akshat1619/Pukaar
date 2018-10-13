import React, { Component } from "react";
import logo from "./static/splash.png";
import "./App.css";
import Home from "./components/home";
import News from "./components/news";
import fire from "./components/fire";
import { BrowserRouter, Route, Link } from "react-router-dom";
import StartPage from "./components/startPage";
import EtherTransfer from "./components/etherTransfer";
import Maps from "./components/maps";
import Badge from "@material-ui/core/Badge";
import trim from "trim";
import _ from "lodash";
import { relative } from "path";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      msg: []
    };
    this.db = fire;
    let app = this.db.database().ref("scraper");
    app.on("value", snapshot => {
      this.getData(snapshot.val());
    });
    let mlocation = this.db.database().ref("data");
    app.on("value", snapshot => {
      this.getDataq(snapshot.val());
    });
  }

  getDataq(values) {
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
      msg: messages
    });
    console.log(messages);
  }

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
    console.log(messages);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <nav style={{ zIndex: 4 }}>
              <div className="menu-icon">
                <i className="fa fa-bars fa-2x" />
              </div>
              <div className="logo">
                <Link to="/">
                  <img style={{ width: 40, height: 40 }} src={logo} />
                </Link>
              </div>
              <div className="menu">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/blockchain">Rewards</Link>
                  </li>
                  <li>
                    <Link to="/news">News</Link>
                    <Badge
                      badgeContent={"1"}
                      color="primary"
                      style={
                        this.state.messages[0]
                          ? {
                              marginRight: 8,
                              marginLeft: 17
                            }
                          : {
                              marginRight: 8,
                              marginLeft: 17,
                              display: "none"
                            }
                      }
                    />
                  </li>
                  <li>
                    <Link to="/maps">Maps</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
          <Route exact path="/" component={StartPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/blockchain" component={EtherTransfer} />
          <Route
            exact
            path="/news"
            component={() => <News db={fire} chat={this.state.messages} />}
          />
          <Route exact path="/start" component={StartPage} />
          <Route
            exact
            path="/maps"
            component={() => <Maps db={fire} loc={this.state.msg} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
