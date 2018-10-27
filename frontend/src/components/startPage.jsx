import React, { Component } from "react";
import "../App.css";
import main from "../static/carousel.jpg";
import help from "../static/help1.png";
import { relative } from "path";

class StartPage extends Component {
  state = {};

  render() {
    return (
      <div>
        <div style={{ height: "100vh" }}>
          <div style={{ position: relative }}>
            <img
              src={main}
              style={{ height: "100vh", float: "right", position: relative }}
            />
          </div>
          <div
            className="helper"
            style={{ position: "absolute", top: 420, left: 780 }}
          >
            <img src={help} />
          </div>
        </div>
        <div style={{ padding: 20, background: "#000" }}>
          <div>
            <p style={{ fontSize: 55, margin: 5, color: "#fff" }}>Features</p>
          </div>
          <br />
          <div style={{ padding: 30 }}>
            <div className="col-md-4 row">
              <div className="card-purple">Maps</div>
              <div className="card-white">
                We have a map feature in our web app.As soon as someone feels
                threat, they would use our pukaar app for sending SOS message,
                their location will be plotted on the web app map and this
                location can be seen by all the pukaar users so anyone can help
                that girl. It also shows the number of routes along with the
                best possible route from her current location to her home.
              </div>
            </div>

            <div className="col-md-4 row">
              <div className="card-purple">News</div>
              <div className="card-white">
                You can search the current news about any topic you want. Girls
                can seacrh about any news around their locality. This will
                create awareness among girls.
              </div>
            </div>

            <div className="col-md-4 row">
              <div className="card-purple">Blockchain</div>
              <div className="card-white">
                Blockchain technology is used in the Pukaar for the safest and
                secured transactions. As soon as the girl confirms the idenity
                of her saviour, this technology will take place and 2 ethers
                (for simplicity purpose, we know 2 ether = 29,220.92 Indian
                Rupee) will be deducted from her account to the saviour's
                etherium account.
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          Pukaar - Voice of girls © PUKAAR | All rights reserved
        </div>
      </div>
    );
  }
}

export default StartPage;
