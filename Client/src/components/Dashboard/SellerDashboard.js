import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../componentStyles/Dashboard.module.css';
import 'font-awesome/css/font-awesome.min.css';

import {
    Container,
    Table
}
from 'reactstrap';

/**
 * CURRENT ISSUES:
 * 1. Styling for text.
 * 2. Link with public item page on item name. 
 */

class SellerDashboard extends Component {

    constructor(props) {
        super(props);
        this.sellerId = window.sessionStorage.getItem('userid')

        this.state = {
            products: []
        };
    }
    
    async componentDidMount() {
        const products = []
        await axios.get(`/api/get/productofuser?id=${this.sellerId}`).then(res => {
            for (let i = 0; i < res.data.length; i++) {
                products.push(res.data[i])
            }
        });
        
        const feedCount = [];
        const feedAvg = [];
        for (let i=0; i < products.length; i++) {
            await axios.get(`/api/get/feedbacksCount?id=${products[i].id}`).then(res => {
                feedCount.push(res.data[0]);
            })
            await axios.get(`/api/get/feedbacksAvg?id=${products[i].id}`).then(res => {
                feedAvg.push(res.data[0]);
            })
        }

        const productsFinal = [];
        for (let i=0; i<feedAvg.length; i++) {
            productsFinal.push({...products[i], ...feedCount[i], ...feedAvg[i]})
        }

        console.log(productsFinal)

        this.setState({
            products: productsFinal
        })
    };


render() {
    return (
        <Container className={styles.historyContainer}>
            <h2>Dashboard</h2>
            <Table className={`${styles.table} boxShadow`}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Title</th>
                        <th>Category</th>
                        <th>Price (&euro;)</th>
                        <th>Quantity</th>
                        <th>Feedbacks</th>
                        <th>Average Rating</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.products.map((result, key) => {
                        return (
                            <tr key={key}>
                                <th scope="row">{result.id}</th>
                                <td>{result.name}</td>
                                <td>{result.category_name}</td>
                                <td>{result.price}</td>
                                <td>{result.quantity}</td>
                                <td>
                                    <Link to={{
                                        pathname: '/profile/feedbacks',
                                        productId: result.id,
                                        productName: result.name
                                        }} className="feedbackLink">{result.count} Feedbacks
                                    </Link>
                                </td>
                                <td>
                                    {result.average === null && <span className={styles.nullText}>No rating yet</span>}
                                    {result.average != null && `${parseFloat(result.average).toFixed(2)}/5` }
                                </td>
                                <td> 
                                    {result.is_validated.data[0] === 1 && <span className={styles.success}>Approved</span>}
                                    {result.is_validated.data[0] === 0 && <span className={styles.pending}>Pending</span>}
                                    {result.is_validated.data[0] === -1 && <span className={styles.danger}>Rejected</span>}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
        </Table>
    </Container>
    )
  }
}

export default withRouter(SellerDashboard);