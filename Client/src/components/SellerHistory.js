import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './componentStyles/SellerHistory.module.css';
import 'font-awesome/css/font-awesome.min.css';

import {
    Container,
    Table
}
from 'reactstrap';

class SellerHistory extends Component {
    constructor(props) {
        super(props);

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
    
    componentWillMount() {
        this.getProducts();
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
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Feedbacks</th>
                        <th>Average Rating</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.products.map(result => {
                        return (<tr>
                            <th scope="row">{result.id}</th>
                            <td>{result.name}</td>
                            <td>{result.category_name}</td>
                            <td>{result.price}</td>
                            <td>{result.quantity}</td>
                            <td><Link to="/profile/feedbacks" className="feedbackLink">6 Feedbacks</Link></td>
                            <td> 3.75/5 </td>
                            <td> Pending </td>
                        </tr>)
                    })}
                </tbody>
        </Table>
    </Container>
    )
  }
}

export default withRouter(SellerHistory);