import React, { Component } from "react";

class EventList extends Component {
  constructor() {
    super();
    this.state = {
      event: []
    };
  }

  componentDidMount() {
    fetch("/api/v1/Events")
      .then(res => res.json())
      .then(event => this.setState({ event }));
  }

  render() {
    return (
      <div className="EventList">
        <select>
          {this.state.event.map(event => (
            <option key={event.id}>
              {new Date(event.eventtime).toISOString().split("T")[0]}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default EventList;
