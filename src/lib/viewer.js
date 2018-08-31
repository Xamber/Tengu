import React, { Component } from 'react';
import Card from './card';
import {store, ConnectStore} from './store';

export default class Viewer extends ConnectStore(Component, store, ["id", "rus", "eng", "usage", "next", "pickNew"]) {
    constructor(props) {
        super(props)
    
        this.handleTouch = this.handleTouch.bind(this);
        this.ref = React.createRef();
    }

    handleTouch() {
        this.state.pickNew()
    }

    componentDidMount() {
        this.ref.current.addEventListener("touchstart", this.handleTouch, false);
    }

    render() {
        return (
            <div className="viewer" ref={this.ref}>
                <Card eng={this.state.eng} id={this.state.id} rus={this.state.rus} usage={this.state.usage} />
            </div>
        )    
    }
}