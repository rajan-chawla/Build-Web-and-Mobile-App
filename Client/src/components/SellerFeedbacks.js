import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styles from './componentStyles/SellerFeedbacks.module.css';
import 'font-awesome/css/font-awesome.min.css';

import {
    Row,
    Col,
    Container
}
from 'reactstrap';

/**
 * CURRENT ISSUES:
 * 1. Product name updates faster than feedbacks.
 * 
 * POSSIBLE FEATURES:
 * 1. Show number of feedbacks next to product name.
 */ 

class SellerFeedbacks extends Component {
    constructor(props) {
        var userLoggedInId = window.sessionStorage.getItem('userid');
        if(userLoggedInId == null){
            window.location.replace("/");
        }
        super(props);

        this.sellerId = window.sessionStorage.getItem('userid');
        this.state = {
            products: [],
            product_id: this.props.location.productId,
            product_name: this.props.location.productName,
            feedbacks: [],
            selected_product: this.props.location.productId,
            average_rating: 0
        };

        this.handleClick = this.handleClick.bind(this)
        console.log('jij',this.state.selected_product)
    }

    getProducts = () => {
        axios.get(`/api/get/productofuser?id=${this.sellerId}`).then(res => {
            for (let i = 0; i < res.data.length; i++) {
                this.setState(
                    (state) => ({ products: [...this.state.products, res.data[i]] }),
                    () => console.log(this.state.products)
                );
            }
        })
    }

    getFeedbacks = (prod_id) => {
        axios.get(`/api/get/feedbacks?id=${prod_id}`).then(res => {
            if (res.data.length === 0) {
                this.setState({
                    feedbacks: []
                })
            } else {
                this.state.feedbacks = [];
                for (let i = 0; i < res.data.length; i++) {
                    this.setState(
                        (state) => ({ feedbacks: [...this.state.feedbacks, res.data[i]] })
                    );
                }
            }
        });
    }

    calcAvg = () => {
        let sum = 0;
        
        for (let i=0; i<this.state.feedbacks.length; i++) {
            sum += this.state.feedbacks[i].rate;
        }

        return (sum / this.state.feedbacks.length).toFixed(2)
    }

    handleClick(event) {
        this.getFeedbacks(event.target.value);
        this.setState({
            product_name: event.target.innerHTML,   // get current products Title
            product_id: event.target.value,          // get current products ID
            selected_product: event.target.value
        })
    }

    componentWillMount() {
        this.getProducts();
        this.getFeedbacks(this.state.product_id);
    };

    checkSelected(clickedId, currentId) {
        if (clickedId === currentId) {
            return styles.selected
        } else {
            return styles.notSelected
        }
    }
            
render() {
    return (
        <Container className={styles.feedbacksContainer}>
            <Row>
                <Col sm='3' className={`affix boxShadow`}>
                    <div className={styles.productsWrapper}>
                        <h4 className={styles.productsTitle}>Products</h4>
                        <ul className={styles.productsList}>
                            {this.state.products.map((value, index) => {
                                return <li className={`${styles.productsItem} ${this.checkSelected(this.state.selected_product, value.id)} `} key={index} value={value.id} onClick={this.handleClick}>{value.name}</li>
                            })}
                        </ul>
                    </div>
                </Col>
                <Col sm={{ size: 9, offset: 3 }}>
                    
                    { this.state.feedbacks.length <= 0 ? ( 
                            <p className={styles.noFeedbacks}>No feedbacks for selected item.</p>
                        ) : ( 
                            <div className={styles.pageHeader}>
                                <h2 className={styles.pageTitle}>{this.state.product_name}</h2>
                                <span className={styles.avgRating}>Avg rating: {this.calcAvg()}</span>
                            </div>
                        )
                    }

                    {this.state.feedbacks.map((result, key) =>
                        <div className={`${styles.feedbackContainer} boxShadow`} key={key}>
                        <div className={styles.header}>
                            <h5 className={styles.feedbackReviewer}><span className={styles.smallText}>from:</span> {result.name} {result.lastname}</h5>
                            <span className={styles.stars}>{result.rate}</span>
                        </div>
                        <p className={styles.description}>{result.text}</p>
                        </div>    
                    )}
                </Col>
            </Row>
        </Container>
    )
  }
}

export default withRouter(SellerFeedbacks);