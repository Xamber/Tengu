import React, { Component } from 'react';
import Card from './card';

const TIMEOUT = 1300;

export default class Viewer extends Component {
    constructor(props) {
        super(props)
        this.dict = props.dict;
        this.state = {
            "rus": ["Привет!"],
            "eng": "Hello!",
            "usage": "Fast English words",
        }

        this.pickNew = this.pickNew.bind(this);

        this._keys = Object.keys(this.dict);
        for (let i = this._keys.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this._keys[i], this._keys[j]] = [this._keys[j], this._keys[i]];
        }
        this.next = 0;

        setInterval(this.pickNew, TIMEOUT)
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

    render() {
        return (
            <div className="viewer">
                <Card eng={this.state.eng} rus={this.state.rus} usage={this.state.usage} />
            </div>
        )    
    }
}