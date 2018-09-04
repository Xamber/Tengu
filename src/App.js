import React, { Component } from 'react';
import Viewer from './components/viewer/viewer'
import Dictionary from './data/english_words.json';

import { initialize } from './utils/service'

const WORDS_BY_SESSION = 20;
const INIT_STATE = {
  id: -1,
  rus: ["Привет!"],
  eng: "Hello!",
  usage: ["Fast English words"],
  next: 1,
}

class App extends Component {

  constructor(props) {
    super(props)

    const { dict, keys } = initialize(Dictionary)

    this._dict = dict
    this._keys = keys
    this._localStorage = window.localStorage

    this.state = INIT_STATE
    this.pick = this.pick.bind(this)
  }

  pick() {
    let word = this._dict[this._keys[this.state.next]]

    this.setState({ ...word, next: this.state.next < WORDS_BY_SESSION ? this.state.next + 1 : 1 })

    let key = `history:${this.id}`
    let value = this._localStorage.getItem(key)
    value = (value === null) ? 0 : parseInt(value, 10)
    this._localStorage.setItem(key, value + 1)
  }

  render() {
    return (
      <Viewer {...this.state} pick={this.pick}></Viewer>
    );
  }
}

export default App;
