import React, { Component } from 'react';
import './App.css';
import Viewer from './lib/viewer'
import Dictionary from './data/english_words.json';

const shuffleArray = function (arr) {
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

let keys = Object.keys(Dictionary);
keys = keys.filter(word => Dictionary[word].usage.length > 0)
shuffleArray(keys);

class App extends Component {
  render() {
    return (
      <Viewer keys={keys} dict={Dictionary}></Viewer>
    );
  }
}

export default App;
