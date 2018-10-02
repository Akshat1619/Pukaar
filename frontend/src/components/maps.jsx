import React, { Component } from "react";
import Leaflet from "leaflet";
import "../App.css";
import _ from "lodash";
import fire from "./fire";

export default class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
      messages: []
    };
  }

  componentDidMount() {
    var mymap = Leaflet.map("mapid", {
      center: [30.2514, 77.0475],
      zoom: 13
    });
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
    Leaflet.marker([30.2514, 77.0475])
      .addTo(mymap)
      .bindPopup("Need Help!!!")
      .openPopup();
    var circle = Leaflet.circle([30.2514, 77.0475], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 500
    }).addTo(mymap);
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <h1>Get the real time notification of help and unsafe area</h1>
        <br />
        <div id="mapid" style={{ height: 400 }} />
      </div>
    );
  }
}
