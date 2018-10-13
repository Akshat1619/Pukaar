import React, { Component } from "react";
import Leaflet from "leaflet";
import L from "leaflet-routing-machine";
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
    console.log(this.props.loc);
    var mymap = Leaflet.map("mapid", {
      center: [30.749521, 76.758864],
      zoom: 14
    });
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
    Leaflet.marker([30.749521, 76.758864])
      .addTo(mymap)
      .bindPopup("Home")
      .openPopup();
    Leaflet.Routing.control({
      waypoints: [
        Leaflet.latLng(30.749521, 76.758864),
        Leaflet.latLng(30.749286, 76.7662681)
      ],
      routeWhileDragging: true
    })
      .on("routesfound", function(e) {
        var routes = e.routes;
        alert("Found " + routes.length + " route(s).");
      })
      .on("routeselected", function(e) {
        var route = e.route;
        alert(
          "Showing route between waypoints:\n" +
            JSON.stringify(route.inputWaypoints, null, 2)
        );
      })
      .addTo(mymap);
    var circle = Leaflet.circle([30.749521, 76.758864], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 150
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
        <div id="mapid" style={{ height: 400, marginBottom: 14 }} />
        <div className="footer">
          Pukaar - Voice of girls © PUKAAR | All rights reserved
        </div>
      </div>
    );
  }
}
