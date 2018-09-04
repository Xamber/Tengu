import React, { Component } from 'react';
import './card.css';

export const Usage = function (props) {
    if (!props.body) return ""
    return props.body[0].split(" ").map(
        (word, index) => (<span key={index} className={word === props.highlight ? "highlighted" : ""}>{word} </span>)
    )
}

export const Eng = function (props) {
    return <span>{props.body}</span>
}

export const Rus = function (props) {
    return <span>{props.body.join(" / ")}</span>
}


export class Card extends Component {
    render() {

        let style = {
            backgroundColor: this.props.color,
            fontSize: this.props.fontSize || "25px",
            flex: this.props.flex || ""
        }

        return (
            <div style={style} className="card">
                <p>
                    {this.props.children}
                </p>
            </div>
        )
    }
}