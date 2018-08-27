import React, { Component } from 'react';

export default class Card extends Component {

    render() {
        return (
            <div className="card">
                <div className="card-word card-word__english">
                    {this.props.eng}
                </div>
                <div className="card-word card-word__russian">
                    {this.props.rus.join(" / ")}
                </div>
                <div className="card-word card-word__usage">
                    <i>{this.props.usage}</i>
                </div>
            </div>
        )
    }
}