import React, { Component } from 'react';
import { Card, Rus, Eng, Usage } from '../card/card';
import './viewer.css';

import Touch from '../../utils/touch';

export default class Viewer extends Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef();
        this.state = {power: 0}
        this.touch = new Touch(50);

        this.touch.on("left", this.props.pickPrev)
        this.touch.on("right", this.props.pickNext)
        this.touch.on("force_done", this.props.setAsKnown)
    }

    componentDidMount() {
        this.touch.configure(this.ref.current)
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
                    Knowed: {this.props.knowed} | {this.props.next} / 20 | Showed: {this.props.showed}
                </Card>
            </div>
        )
    }
}