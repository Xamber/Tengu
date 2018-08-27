import React, { Component } from 'react';
import './App.css';
import Viewer from './lib/viewer'
import Dictionary from './data/english_words.json';

class App extends Component {
  render() {
    return (
      <Viewer dict={Dictionary}></Viewer>
    );
  }
}

export default App;
