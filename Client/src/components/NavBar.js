import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";

import styles from './componentStyles/Navbar.module.css';
import './componentStyles/global.scss';
import 'font-awesome/css/font-awesome.min.css';
import {
  	Container,
	Row,
  	Col,
  	Button
}
from 'reactstrap';


class NavBar extends Component {
	
    constructor(props) {
        super(props);
        
        this.userId = window.sessionStorage.getItem('userid')

        this.state = { };
    }

    
            
render() {
    return (
        
    )
  }
};

export default withRouter(NavBar);
