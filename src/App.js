import React, { Component } from "react";
import { Provider } from "react-redux";
import SvgCanvas from "./SvgCanvas";
import "./App.css";
import store from "./store";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <SvgCanvas />
        </Provider>
      </div>
    );
  }
}

export default App;
