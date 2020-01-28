import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import ProductMinified from './ProductMinified';
import styles from './componentStyles/SellerFeedbacks.module.css';
import 'font-awesome/css/font-awesome.min.css';

import {
    Row,
    Col,
    Container
}
from 'reactstrap';

class SellerFeedbacks extends Component {
    constructor(props) {
        super(props);

        const sellerId = 49;

        this.state = {
            products: []
        };
    }

    getProducts = () => {
        axios.get(`/api/get/productofuser?id=49`).then(res => {
            for (let i = 0; i < res.data.length; i++) {
                this.setState(
                    (state) => ({ products: [...this.state.products, res.data[i]] }),
                    () => console.log(this.state.products)
                );
            }
        })
    }

    getFeedbacks = () => {

    }

    componentWillMount() {
        this.getProducts();
    };
            
render() {
    return (
        <Container className={styles.feedbacksContainer}>
            <Row>
                <Col sm='3' className={`${styles.affix} boxShadow`}>
                    <div className={styles.productsWrapper}>
                        <h4 className={styles.productsTitle}>Products</h4>
                        <ul className={styles.productsList}>
                            {this.state.products.map((value, index) => {
                                return <li className={styles.productsItem} key={index} value={value.id}>{value.name}</li>
                            })}
                        </ul>
                    </div>
                </Col>
                <Col sm={{ size: 9, offset: 3 }}>
                    <div className={styles.pageHeader}>
                        <h2 className={styles.pageTitle}>Product Name</h2>
                        <span className={styles.avgRating}>Avg rating: *****</span>
                    </div>
                    <div className={`${styles.feedbackContainer} boxShadow`}>
                        <div className={styles.header}>
                            <h5 className={styles.feedbackReviewer}><span className={styles.smallText}>from:</span> Blin Varfi</h5>
                            <span className={styles.stars}>*****</span>
                        </div>
                        <p className={styles.description}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
  }
}

export default withRouter(SellerFeedbacks);