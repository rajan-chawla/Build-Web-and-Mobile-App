import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import ProductMinified from '../ProductMinified';
import styles from '.././componentStyles/PublicProfile.module.css';
import 'font-awesome/css/font-awesome.min.css';

import {
    Row,
    Col
}
from 'reactstrap';

class PublicSeller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    getResults = () => {
        axios.get(`/api/get/productofuser?id=${this.props.sellerId}`).then(res => {
            for (let i = 0; i < res.data.length; i++) {
                this.setState(
                    (state) => ({ products: [...this.state.products, res.data[i]] }),
                    () => console.log(this.state.products)
                );
            }
        })
    }

    componentWillMount() {
        this.getResults();
    };
            
render() {
    return (
        <Row>
            <Col sm='3' className={`${styles.affix} boxShadow`}>
                <div className={styles.profileWrapper}>
                    <img className={styles.image} src={this.props.pic} alt='Profile Picture'/>
                    <h3 className={styles.profileName}>{this.props.name} {this.props.lastname}</h3>
                    <h6 className={styles.profileInfoLine}><i className='fa fa-envelope'></i> {this.props.email}</h6>
                    <h6 className={styles.profileInfoLine}><i className='fa fa-mobile'></i> {this.props.phone}</h6> 
                    <p className={styles.profileDesc}>{this.props.desc}</p>
                </div>
            </Col>
            <Col sm={{ size: 9, offset: 3 }}>
                {this.state.products.map(result => {
                    return <ProductMinified name={result.name} desc={result.description} price={result.price} img={result.picture_link} prodId={result.id} remove='0'/>
                })}
            </Col>
        </Row>
    )
  }
}

export default withRouter(PublicSeller);