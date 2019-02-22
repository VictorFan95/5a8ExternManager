import React, { Component } from "react";
import CameraPage from "./components/CameraPage";
import "./App.css";

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="App">
        <CameraPage />
      </div>
    );
  }
}

export default App;
