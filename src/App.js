import React, { Component } from 'react';
import Viewer from './components/viewer/viewer'
import Dictionary from './data/english_words.json';

import { initialize } from './utils/service'
import { Storage } from './utils/storage'

import './App.css';

const WORDS_BY_SESSION = 20;
const INIT_STATE = {
  id: -1,
  rus: ["Привет!"],
  eng: "Hello!",
  usage: ["Fast English words"],
  next: 1,
  showed: "Times of appears",
  knowed: "Already known",
  power: 0
}

const Notifier = (props) => {
  let style = {
    opacity: props.opacity
  }
  return <div style={style} className="notifier"> 👍 </div>
}

class App extends Component {

  constructor(props) {
    super(props)

    const { dict, keys } = initialize(Dictionary)

    this._dict = dict
    this._keys = keys.slice(0, WORDS_BY_SESSION+1)
    this.database = new Storage("v1")

    this.state = INIT_STATE
    this.pickNext = this.pickNext.bind(this)
    this.pickPrev = this.pickPrev.bind(this)
    this.changed = this.changed.bind(this)
    this.setAsKnown = this.setAsKnown.bind(this)
    this.forceChanged = this.forceChanged.bind(this)
  }

  changed() {
    let word = this._dict[this._keys[this.state.next]]
    this.setState({
       ...word,
       next: this.state.next,
       showed: this.database.getHistory(this.state.id),
       knowed: this.database.getKnown(this.state.id)
    })
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

  setAsKnown() {
    this.database.setAsKnown(this.state.id)
    this.changed()
    this.setState({power: 0})
  }

  forceChanged(power) {
    this.setState({power: power})
  }

  render() {
    return (
      <div>
          <Notifier opacity={this.state.power} />
          <Viewer {...this.state} pickNext={this.pickNext} pickPrev={this.pickPrev} setAsKnown={this.setAsKnown} forceChanged={this.forceChanged}></Viewer>
      </div>
    );
  }
}

export default App;
