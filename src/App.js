import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Charts from './Components/Charts/Charts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" width="200" height="200" />
          <Charts />
        </header>
      </div>
    );
  }
}

export default App;
