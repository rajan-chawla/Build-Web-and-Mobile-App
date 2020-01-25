import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import ProductMinified from '../ProductMinified';
import PublicSeller from './PublicSeller';
import PublicBuyer from './PublicBuyer';

import styles from '.././componentStyles/PublicProfile.module.css';
import 'font-awesome/css/font-awesome.min.css';

import {
    Container,
    Row,
    Col
}
from 'reactstrap';

class PublicProfile extends Component {
    constructor(props) {
        super(props);
        const sellerId = 49;
        
        this.state = {
            profileData: {
                name: '',
                lastname: '',
                email: '',
                desc: '',
                pic: '',
                phone: '',
                is_seller: 1
            }, 
            products: []
        };
    }

    getProfileDetails = () => {
        axios.get(`/api/get/profile?id=49`).then(res => { 
            this.setState( prevState => {
                let profileData = Object.assign({}, prevState.profileData);
                profileData.name = res.data[0].name;
                profileData.lastname = res.data[0].lastname;
                profileData.email = res.data[0].email;
                profileData.desc = res.data[0].description;
                profileData.pic = res.data[0].photo_link;
                profileData.phone = res.data[0].phone;
                return { profileData };
            });
            console.log(this.state.profileData.email);
        });
    };

    getResults = () => {
        axios.get(`/api/get/productofuser?id=49`).then(res => {
            for (let i = 0; i < res.data.length; i++) {
                this.setState(
                    (state) => ({ products: [...this.state.products, res.data[i]] }),
                    () => console.log(this.state.products)
                );
            }
        })
    }

    componentWillMount() {
        this.getProfileDetails();
        this.getResults();
    };
            
render() {
    return (
        <Container className={styles.profileContainer}>
            
                { this.state.profileData.is_seller === 0 &&
                <PublicSeller pic={this.state.profileData.pic} name={this.state.profileData.name} lastname={this.state.profileData.lastname}
                email={this.state.profileData.email} phone={this.state.profileData.phone} desc={this.state.profileData.desc} sellerId={this.sellerId} /> }

                { this.state.profileData.is_seller === 1 &&
                <PublicBuyer pic={this.state.profileData.pic} name={this.state.profileData.name} lastname={this.state.profileData.lastname}
                email={this.state.profileData.email} phone={this.state.profileData.phone} desc={this.state.profileData.desc} /> }
                
     
        </Container>
    )
  }
}

export default withRouter(PublicProfile);