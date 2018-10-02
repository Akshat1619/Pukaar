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

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <nav>
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
          <Route exact path="/news" component={() => <News db={fire} />} />
          <Route exact path="/start" component={StartPage} />
          <Route exact path="/maps" component={Maps} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
