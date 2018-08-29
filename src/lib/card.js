import React, { Component } from 'react';

const UsageCommon = (props) => (
    <span>{props.word} </span>
)

const UsageHighlated = (props) => (
    <b>{props.word} </b>
)

const Usage = (props) => (
    props.word===props.eng ? <UsageHighlated word={props.word} /> : <UsageCommon word={props.word} />
)


export default class Card extends Component {
    render() {
        let usage = this.props.usage.split(" ").map(
            (word, index) => (<Usage key={index} word={word} eng={this.props.eng} />)
        )

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