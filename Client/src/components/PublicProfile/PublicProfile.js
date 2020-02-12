import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PublicSeller from './PublicSeller';
import PublicBuyer from './PublicBuyer';

import styles from '.././componentStyles/PublicProfile.module.css';
import 'font-awesome/css/font-awesome.min.css';

import {
    Container
}
from 'reactstrap';

class PublicProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profileData: {
                id: this.props.match.params.id,
                name: '',
                lastname: '',
                email: '',
                desc: '',
                pic: '',
                phone: '',
                is_seller: 0
            }
        };
    }

    getProfileDetails = () => {
        axios.get(`/api/get/profile?id=${this.props.match.params.id}`).then(res => {
            this.setState( prevState => {
                let profileData = Object.assign({}, prevState.profileData);
                profileData.name = res.data[0].name;
                profileData.lastname = res.data[0].lastname;
                profileData.email = res.data[0].email;
                profileData.desc = res.data[0].description;
                profileData.pic = res.data[0].photo_link;
                profileData.phone = res.data[0].phone;
                profileData.is_seller = res.data[0].isSeller;
                return { profileData };
            });
        });
    };

    componentWillMount() {
        this.getProfileDetails();
    };
            
render() {
    return (
        <Container className={styles.profileContainer}>
            { this.state.profileData.is_seller === 1 &&
            <PublicSeller pic={this.state.profileData.pic} name={this.state.profileData.name} lastname={this.state.profileData.lastname}
            email={this.state.profileData.email} phone={this.state.profileData.phone} desc={this.state.profileData.desc} sellerId={this.state.profileData.id} /> }

            { this.state.profileData.is_seller === 0 &&
            <PublicBuyer pic={this.state.profileData.pic} name={this.state.profileData.name} lastname={this.state.profileData.lastname}
            email={this.state.profileData.email} phone={this.state.profileData.phone} desc={this.state.profileData.desc} /> }    
        </Container>
    )
  }
}

export default withRouter(PublicProfile);