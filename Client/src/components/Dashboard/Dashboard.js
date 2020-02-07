import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import BuyerDashboard from "./BuyerDashboard";
import SellerDashboard from "./SellerDashboard";
import styles from '../componentStyles/Dashboard.module.css';
import 'font-awesome/css/font-awesome.min.css';

import {
    Row,
    Col
}
from 'reactstrap';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.userRole = window.sessionStorage.getItem('userrole');
        this.state = { };
    }
            
render() {
    return (
        <div>
            { this.userRole === '1' &&
            <BuyerDashboard /> }
            { this.userRole === '2' &&
            <SellerDashboard /> }   
        </div>
    )
  }
}

export default withRouter(Dashboard);