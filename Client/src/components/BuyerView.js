import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class BuyerView extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.userId);
        console.log(props.userId);
        this.state = {
            isSeller: false
        };
    }

    componentDidUpdate() {
        console.log(this.props.userId);
       
    }

    render() {
        return (
            <h1> Hi </h1>
        );
    }
}

export default withRouter(BuyerView);