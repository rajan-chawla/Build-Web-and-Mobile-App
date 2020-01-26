import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import {
    Container
}
from 'reactstrap';

class SellerFeedbacks extends Component {
    constructor(props) {
        super(props);
    }

            
render() {
    return (
        <Container>
            FEEDBACKS 
        </Container>
    )
  }
}

export default withRouter(SellerFeedbacks);