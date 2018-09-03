import React, { Component } from 'react';

export default class Card extends Component {
    render() {
        let className = "card-word card-word__" + this.props.className
        return (
            <div className={className}>
                <p>
                    {this.props.children}
                </p>
            </div>
        )
    }
}