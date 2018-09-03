import React, { Component } from 'react';
import Card from '../card/card';

const Usage = function(props) {
    return props.body.split(" ").map(
        (word, index) => (<span key={index} className={word === props.highlight ? "highlighted": ""}>{word} </span>)
    )
}

const Eng = function(props) {
    return <span>{props.body}</span>
}

const Rus = function(props) {
    return <span>{props.body.join(" / ")}</span>
}

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
                <div className="card">
                    <Card body={this.state.eng} className="english" >
                        <Eng body={this.state.eng} />
                    </Card>
                    <Card body={this.state.rus.join(" / ")} className="russian">
                        <Rus body={this.state.rus} />
                    </Card>
                    <Card  className="usage">
                        <Usage body={this.state.usage} highlight={this.state.eng} />
                    </Card>
                </div>
            </div>
        )    
    }
}