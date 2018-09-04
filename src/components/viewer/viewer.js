import React, { Component } from 'react';
import { Card, Rus, Eng, Usage } from '../card/card';
import './viewer.css';

import Touch from '../../utils/touch';

export default class Viewer extends Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef();

        this.touch = new Touch(50);

        this.touch.on("single", this.props.pickNext)
    }

    componentDidMount() {
        this.ref.current.addEventListener("touchstart", this.touch.handleTouchStart, false);
        this.ref.current.addEventListener("touchend", this.touch.handleTouchEnd, false);
    }

    render() {
        return (
            <div className="viewer" ref={this.ref}>
                <Card color="#466f70">
                    <Eng body={this.props.eng} />
                </Card>
                <Card color="#7d4373">
                    <Rus body={this.props.rus} />
                </Card>
                <Card color="#a03232" fontSize="15px" flex="130px 0 0">
                    <Usage body={this.props.usage} highlight={this.props.eng} />
                </Card>
                <Card color="#000000" fontSize="8px" flex="5px 0 0">
                    {this.props.next} / 20
                </Card>
            </div>
        )
    }
}