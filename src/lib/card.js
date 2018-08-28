import React, { Component } from 'react';

export default class Card extends Component {
    render() {

        const handler = (word) => (word==this.props.eng ? <b>{word} </b> : <span>{word} </span>)

        let usage = this.props.usage.split(" ").map(handler)

        return (
            <div className="card">
                <div className="card-word card-word__english">
                    {this.props.eng}
                </div>
                <div className="card-word card-word__russian">
                    {this.props.rus.join(" / ")}
                </div>
                <div className="card-word card-word__usage">
                    <p>{usage}</p>
                </div>
            </div>
        )
    }
}