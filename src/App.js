import React, { Component } from 'react';
import './App.css';
import Viewer from './components/viewer'
import {Provider} from 'react-redux';

import {createStore} from 'redux'
import {Reducer, initialState} from './store/store.js';

let store = createStore(Reducer, initialState);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Viewer></Viewer>
      </Provider>
    );
  }
}

export default App;
