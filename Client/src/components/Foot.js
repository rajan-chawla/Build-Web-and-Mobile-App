import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Foot extends Component {
    render() {
        return (
            <div className='footWrapper boxShadow'>
                <p className='footText'>The wesbite is a univeristy project and not intended for actual use. Copyright © 2020.</p>
            </div>
        )
    }
}

export default withRouter(Foot);