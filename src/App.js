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
  cursor: 0,
  
  showed: "Times of appears",
  knowed: "Already known",
  power: 0,
  
  remain: WORDS_BY_SESSION-1,
  testMode: false
}

const Notifier = (props) => {
  let style = {
    opacity: props.opacity
  }
  return <div style={style} className="notifier"> <span role="img" aria-label="s"> 👍 </span> </div>
}

class App extends Component {

  constructor(props) {
    super(props)
    this.startGame()
    
    this.database = new Storage("v1")

    this.state = INIT_STATE
    this.pickNext = this.pickNext.bind(this)
    this.pickPrev = this.pickPrev.bind(this)
    this.changed = this.changed.bind(this)
    this.setAsKnown = this.setAsKnown.bind(this)
    this.forceChanged = this.forceChanged.bind(this)
    this.toggleMode = this.toggleMode.bind(this)
  }

  changed() {
    let word = this._dict[this._keys[this.state.cursor]]
    this.setState({
        ...word,
        cursor: this.state.cursor,
        power: 0
    })
    this.setState({
      remain: this._keys.length-1,
      showed: this.database.getHistory(this.state.id),
      knowed: this.database.getKnown(this.state.id),
    }) 
    this.database.addhistory(this.state.id)
  }

  startGame() {
    const { dict, keys } = initialize(Dictionary)
    this._dict = dict
    this._keys = keys.slice(0, WORDS_BY_SESSION)
  }

  pickNext() {
    this.setState({cursor: this.state.cursor < this._keys.length-1 ? this.state.cursor + 1 : 0})
    this.changed()
  }

  pickPrev() {
    this.setState({cursor: this.state.cursor > 0 ? this.state.cursor - 1 : this._keys.length-1})
    this.changed()
  }

  toggleMode() {
    this.setState({testMode: !this.state.testMode})
  }

  setAsKnown() {
    this.database.setAsKnown(this.state.id)
    this._keys = this._keys.filter(word => this.database.getKnown(this._dict[word].id) !== "Yes")

    if (this._keys.length < 1) { this.startAgain() }
    if (this.state.cursor > this._keys.length-1) { this.setState({ cursor: 0 }) }

    this.changed()
  }

  forceChanged(power) {
    this.setState({power: power > 0.4 ? power : 0})
  }

  render() {
    return (
      <div>
          <Notifier opacity={this.state.power} />
          <Viewer {...this.state} 
          pickNext={this.pickNext} pickPrev={this.pickPrev}
          setAsKnown={this.setAsKnown} forceChanged={this.forceChanged}
          toggleMode={this.toggleMode}></Viewer>
      </div>
    );
  }
}

export default App;