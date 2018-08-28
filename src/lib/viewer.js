import React, { Component } from 'react';
import Card from './card';

const TIMEOUT = 1700;

export default class Viewer extends Component {
    constructor(props) {
        super(props)
        
        this.pickNew = this.pickNew.bind(this);
        this.handleTouch = this.handleTouch.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);

        this.state = {
            "rus": ["Привет!"],
            "eng": "Hello!",
            "usage": "Fast English words",
            "next": 0,
            "ticker": setInterval(this.pickNew, TIMEOUT),
        }

        this.ref = React.createRef();
    }

    pickNew() {
        let word = this.props.dict[this.props.keys[this.state.next]]
        this.setState({
            "rus": word.rus,
            "eng":  word.eng,
            "usage": word.usage ? word.usage[0] : "",
            "next": this.state.next + 1
        });
    }

    handleTouch() {
        clearInterval(this.state.ticker);
    }

    handleTouchEnd() {
        this.pickNew()
        let ticker = setInterval(this.pickNew, TIMEOUT)
        this.setState({
            "ticker": ticker
        })
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