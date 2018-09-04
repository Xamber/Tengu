import React, { Component } from 'react';
import Viewer from './components/viewer/viewer'
import Dictionary from './data/english_words.json';

import { initialize } from './utils/service'
import { Storage } from './utils/storage'

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
    this.database = new Storage("v1")

    this.state = INIT_STATE
    this.pickNext = this.pickNext.bind(this)
    this.pickPrev = this.pickPrev.bind(this)
    this.changed = this.changed.bind(this)
  }

  changed() {
    let word = this._dict[this._keys[this.state.next]]
    this.setState({ ...word, next: this.state.next})
    this.database.addhistory(this.state.id)
  }

  pickNext() {
    this.setState({next: this.state.next < WORDS_BY_SESSION ? this.state.next + 1 : 1 })
    this.changed()
  }

  pickPrev() {
    this.setState({next: this.state.next > 1 ? this.state.next -1 : WORDS_BY_SESSION })
    this.changed()
  }

  render() {
    return (
      <Viewer {...this.state} pickNext={this.pickNext} pickPrev={this.pickPrev}></Viewer>
    );
  }
}

export default App;
