import React, { Component } from 'react';

const Usage = function(props) {
    if (props.word === props.eng) {
        return <span className="highlighted">{props.word} </span>
    }
    return <span>{props.word} </span>
}

class CardWord extends Component {
    render() {
        let className = "card-word card-word__" + this.props.className
        return (
            <div className={className}>
                <p>{this.props.body}</p>
            </div>
        )
    }
}

export default class Card extends Component {
    render() {
        let usage = this.props.usage.split(" ").map(
            (word, index) => (<Usage key={index} word={word} eng={this.props.eng} />)
        )

        return (
            <div className="card">
                <CardWord body={this.props.eng} className="english" />
                <CardWord body={this.props.rus.join(" / ")} className="russian" />
                <CardWord body={usage} className="usage" />
            </div>
        )
    }
}