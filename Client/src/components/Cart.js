import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import ProductMinified from './ProductMinified';

import './componentStyles/cart.scss';

import {
    Container,
    Row,
    Col,
    Button
} from 'reactstrap'


class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: []
        };
    }

    getResults = () => {
        axios.get('/api/get/productlist').then(res => {
            for (let i = 0; i < res.data.length; i++) {
                this.setState(
                    (state) => ({ results: [...this.state.results, res.data[i]] }),
                    () => console.log(this.state.results)
                );
            }
        })
    }

    componentWillMount() {
        this.getResults();
    };

    render() {
        return (
            <Container className='cartContainer'>
            <Row>
                <Col sm='9'>
                    {this.state.results.map(result => {
                        return <ProductMinified name={result.name} desc={result.description} price={result.price} img={result.picture_link} remove='1'/>
                    })}
                </Col>
                <Col sm='3' className='checkoutBox boxShadow'>
                    <h2>Checkout</h2>
                    <p>Proceed with the checkout?</p>
                    <Button className='checkoutButton'>Checkout</Button>
                </Col>
            </Row>
        </Container>
        )
    }
}

export default withRouter(Cart);