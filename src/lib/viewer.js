import React, { Component } from 'react';
import Card from './card';
import {shuffleArray} from './utils';

const TIMEOUT = 1300;

export default class Viewer extends Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef();
        this.dict = props.dict;
        this.state = {
            "rus": ["Привет!"],
            "eng": "Hello!",
            "usage": "Fast English words",
        }

        this.pickNew = this.pickNew.bind(this);
        this.handleTouch = this.handleTouch.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);

        this._keys = Object.keys(this.dict)
        shuffleArray(this.dict);

        this.next = 0;
        this.ticker = setInterval(this.pickNew, TIMEOUT)
    }

    pickNew() {
        let word = this.dict[this._keys[this.next]]
        this.setState({
            "rus": word.rus,
            "eng":  word.eng,
            "usage": word.usage ? word.usage[0] : "",
        });
        this.next++;
    }

    handleTouch() {
        clearInterval(this.ticker);
    }

    handleTouchEnd() {
        this.pickNew()
        this.ticker = setInterval(this.pickNew, TIMEOUT)
    }

    componentDidMount() {
        this.ref.current.addEventListener("touchstart", this.handleTouch, false);
        this.ref.current.addEventListener("touchend", this.handleTouchEnd, false);
    }

    render() {
        return (
            <div className="viewer" ref={this.ref}>
                <Card eng={this.state.eng} rus={this.state.rus} usage={this.state.usage} />
            </div>
        )    
    }
}