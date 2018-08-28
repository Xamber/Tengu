import React, { Component } from 'react';
import './App.css';
import Viewer from './lib/viewer'
import Dictionary from './data/english_words.json';
import {shuffleArray} from './lib/utils';

let keys = Object.keys(Dictionary);
keys = keys.filter(word => Dictionary[word].usage.length > 0)
console.log(keys);
shuffleArray(keys);

class App extends Component {
  render() {
    return (
      <Viewer keys={keys} dict={Dictionary}></Viewer>
    );
  }
}

export default App;
