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

class BuyerDashboard extends Component {

    constructor(props) {
        super(props);
        this.buyerId = window.sessionStorage.getItem('userid')

        this.state = {
            products: []
        };
    }
    
    async componentDidMount() {
        const products = []
        await axios.get(`/api/get/products/${this.buyerId}`).then(res => {
            for (let i = 0; i < res.data.length; i++) {
                products.push(res.data[i])
            }
        });
        
        const leftFeed = [];
        for (let i=0; i < products.length; i++) {
            await axios.get(`/api/get/feedbackFromBuyerId?buyerId=${this.buyerId}&productId=${products[i].id}`).then(res => {
                if (res.data[0])
                    leftFeed.push({leftFeedback: true});
                else
                    leftFeed.push({leftFeedback: false});
            })
        }

        const productsFinal = [];
        for (let i=0; i<products.length; i++) {
            productsFinal.push({...products[i], ...leftFeed[i]})
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
                        <th>Feedback</th>
                        <th>Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.products.map((result, key) => {
                        return (
                            <tr key={key}>
                                <th scope="row">{result.product_id}</th>
                                <td>{result.name}</td>
                                <td>{result.category_name}</td>
                                <td>{result.price}.00</td>
                                <td>
                                    { result.leftFeedback === true && 
                                        <span>SUBMITTED</span>
                                    }
                                    { result.leftFeedback === false && 
                                        <Link to={{
                                            pathname: `/product/id=${result.id}#feedback`
                                            }} className={styles.feedbackLink}>PROVIDE
                                        </Link>
                                    }
                                </td>
                                <td> Purchased </td>
                            </tr>
                        )
                    })}
                </tbody>
        </Table>
    </Container>
    )
  }
}

export default withRouter(BuyerDashboard);