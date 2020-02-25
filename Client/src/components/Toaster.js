import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";

import styles from './componentStyles/Toaster.module.css';
import './componentStyles/global.scss';
import 'font-awesome/css/font-awesome.min.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
	InputGroup,
	InputGroupAddon,
	InputGroupButtonDropdown,
	Input,
	Button
}
from 'reactstrap';


class Toaster extends Component {
	
    constructor(props) {
        super(props);
        console.log(this.props.show)
        this.state = {
            type: this.props.type,
            text: this.props.text,
            show: this.props.show
        };

    }

    componentDidMount() {
        setInterval(() => this.setState({
            show: 'false'
        }), 3000)
    }
            
render() {
    return (
        <div className={`${styles.toaster} 
            ${this.state.type === 'success' ? styles.success : styles.failure} 
            ${this.state.show === 'true' ? styles.showAnim : styles.hideAnim}
            boxShadow`}>
            <div className={styles.wrapper}>
                <i className={this.state.type === 'success' ? 'fa fa-check-circle' : 'fa fa-exclamation-circle'}></i>
                <span className={styles.text}> {this.state.text} </span>
            </div>
        </div>
      );
  }
};

export default withRouter(Toaster);
