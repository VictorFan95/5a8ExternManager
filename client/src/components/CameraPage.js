import React, { Component } from "react";
import EventList from "./EventList";
import Scanner from "./Scanner";

class CameraPage extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="CameraPage">
        <EventList />
        <Scanner />
      </div>
    );
  }
}

export default CameraPage;
