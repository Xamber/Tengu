import React, { Component } from 'react';
import Viewer from './components/viewer/viewer'
import Dictionary from './data/english_words.json';

const initialize = function (dict) {

  let keys = Object.keys(dict);
  keys = keys.filter(word => dict[word].usage.length > 0)

  for (let i = keys.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [keys[i], keys[j]] = [keys[j], keys[i]];
  }

  return {dict, keys}
}

const {dict, keys} = initialize(Dictionary)

class App extends Component {
  render() {
    return (
      <Viewer keys={keys} dict={dict}></Viewer>
    );
  }
}

export default App;
