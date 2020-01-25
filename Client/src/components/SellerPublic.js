import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import ProductMinified from './ProductMinified';
import styles from './componentStyles/SellerPublic.module.css';
import 'font-awesome/css/font-awesome.min.css';

import {
    Container,
    Row,
    Col
}
from 'reactstrap';

class SellerPublic extends Component {
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
                is_verified: '',
                is_validated: ''
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


    categoryChange(val) {
      this.setState(
            (state) => ({ results: [] }),
            this.getResults('Category', val)
        )
    };
            
render() {
    return (
        <Container className={styles.searchContainer}>
            <Row>
                <Col sm='3' className={`${styles.affix} boxShadow`}>
                    <div className={styles.profileWrapper}>
                        <img className={styles.image} src={this.state.profileData.pic} alt='Profile Picture'/>
                        <h3 className={styles.profileName}>{this.state.profileData.name} {this.state.profileData.lastname}</h3>
                        <h6 className={styles.profileInfoLine}><i className='fa fa-envelope'></i> {this.state.profileData.email}</h6>
                        <h6 className={styles.profileInfoLine}><i className='fa fa-mobile'></i> {this.state.profileData.phone}</h6> 
                        <p className={styles.profileDesc}>{this.state.profileData.desc}</p>
                    </div>
                </Col>
                <Col sm={{ size: 9, offset: 3 }}>
                    {this.state.products.map(result => {
                        return <ProductMinified name={result.name} desc={result.description} price={result.price} img={result.picture_link} prodId={result.id} remove='0'/>
                    })}
                </Col>
            </Row>
        </Container>
    )
  }
}

export default withRouter(SellerPublic);