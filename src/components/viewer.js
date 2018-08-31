import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Card from './card';
import * as actions from '../store/actions.js';

class Viewer extends Component {
    constructor(props) {
        super(props)
        
        console.log(this.props);

        this.pickNew = this.pickNew.bind(this);
        this.handleTouch = this.handleTouch.bind(this);

        this.ref = React.createRef();
    }

    pickNew() {
        this.props.actions.pickNew()
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
                <Card eng={this.props.eng} id={this.props.id} rus={this.props.rus} usage={this.props.usage} />
            </div>
        )    
    }
}

const viewerState = (state) => ({
    id: state.id,
    rus: state.rus,
    eng:  state.eng,
    usage: state.usage,
    next: state.next,
});
const viewerActions = (dispatch) => ({actions: bindActionCreators(actions, dispatch)});

export default Viewer = connect(viewerState, viewerActions)(Viewer)