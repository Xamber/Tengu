import React, { Component } from 'react';
import Card from './card';

export default class Viewer extends Component {
    constructor(props) {
        super(props)
        
        this.pickNew = this.pickNew.bind(this);
        this.handleTouch = this.handleTouch.bind(this);

        this.state = {
            "id": -1,
            "rus": ["Привет!"],
            "eng": "Hello!",
            "usage": "Fast English words",
            "next": 0,
        }

        this.ref = React.createRef();
    }

    pickNew() {
        let word = this.props.dict[this.props.keys[this.state.next]]
        this.setState({
            "id": word.id,
            "rus": word.rus,
            "eng":  word.eng,
            "usage": word.usage ? word.usage[0] : "",
            "next": this.state.next + 1,
        });
    }

    handleTouch() {
        this.pickNew()
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