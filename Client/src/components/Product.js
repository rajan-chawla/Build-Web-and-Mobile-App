import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './componentStyles/product.scss';
import {
    Container,
    Row,
    Col,
    Button,
    Form, 
    Input,
    Label,
    FormGroup
}
from 'reactstrap';

class Product extends Component {

    constructor(props) {
        super(props);
        
        this.amBuyer = true;
        this.leftFeedback = false;
        
        this.state = {
            productId: this.props.match.params.id,
            productTitle: null,
            productPrice: null,
            productImageLink: null,
            productPostedDate: null,
            productDescription: null,
            productSellerId: null,
            productSeller: 'World\'sBestCompany',
            productHasSold: false
        };
    }

    getShareOnFacebookText() {
        return `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
    }

    getShareOnTwitterText() {
        return `https://twitter.com/intent/tweet?text=Checkout%20this%20amazing%20product%20on%20SampleMe:&url=${window.location.href}&hashtags=sampleMe,bargainSale`
    }

    getProduct = () => {
        axios.get('/api/get/productbyid', {
            params: {
                id: this.state.productId
            }
        }).then(res => {
            this.setState({
                productId: res.data[0].id,
                productTitle: res.data[0].name,
                productPrice: res.data[0].price,
                productPostedDate: res.data[0].added_date.substring(0, 10),
                productDescription: res.data[0].description,
                productSellerId: res.data[0].seller_id,
                productImageLink: res.data[0].picture_link,
                productHasSold: (res.data[0].sold_date !== null)
            });
        });
    };

    componentWillMount() {
        this.getProduct();
    };

    render() {
        return (
            <Container className='productContainer'>
                <Row>
                    <Col sm='4' className='productImageWrapper'> 
                        <Row className='noGutters'>
                            <Col sm='12' className='imgWrapper boxShadow'>
                            <img src={`${process.env.PUBLIC_URL}${this.state.productImageLink}`}
                                alt='Product image' />    
                            </Col>
                       </Row>
                       <Row className='noGutters'>
                           <Col sm='12' className='sellerWrapper boxShadow'>
                               <span>Offered by <span className='productSeller'>{this.state.productSeller}</span></span>
                           </Col>
                       </Row>
                    </Col>
                    <Col sm='8'>
                        <Row className='productDescriptionWrapper boxShadow'>
                            <Row className='descriptionRow noGutters'>
                                <Col sm='4'><h3 className='titleText'>{this.state.productTitle}</h3></Col>
                                <Col sm='8'><h3 className='priceText'>&euro;{this.state.productPrice}</h3></Col>
                            </Row>
                            <Row className='descriptionRow noGutters'>
                                <Col sm='6'><small className='dateText'>Published on: {this.state.productPostedDate}</small></Col>
                                <Col sm='6'>
                                    <span className='shareIcons'>
                                        <small>Share: </small>
                                        <a href={this.getShareOnFacebookText()} className=''><i className='fa fa-facebook-square'></i></a>
                                        <a href={this.getShareOnTwitterText()}
                                            className='twitter-share-button'>
                                                <i className='fa fa-twitter-square'></i>
                                        </a>
                                    </span>
                                </Col>
                            </Row>
                            <Row className='descriptionRow noGutters descriptionWrapper'>
                                <Col sm='12'><p className='descText'>{this.state.productDescription}</p></Col>
                            </Row>
                            { this.state.productHasSold === false &&
                                <Row className='descriptionRow buttonsWrapper noGutters'>
                                    <Col sm='6' className='buttonWrapper'>
                                        <Button className='buyButton'>Buy</Button>
                                    </Col>
                                    <Col sm='6' className='buttonWrapper'>
                                        <Button className='cartButton'>Add to Cart</Button>
                                    </Col>
                                </Row>
                            }
                            { this.state.productHasSold === true &&
                                <Row className='descriptionRow noGutters'>
                                    <Col sm='12'>
                                        <h5 className='productSold'> Sorry, this product has been sold!</h5>
                                    </Col>
                                    <Col sm={{ size: 6, offset: 3 }} className='buttonWrapper'>
                                        <Button>Checkout Other Products</Button>
                                    </Col>
                                </Row>
                            }
                        </Row>
                        { this.amBuyer === true && this.leftFeedback === false && 
                            <Row className='feedbackWrapper boxShadow'>
                                <Row className='feedbackForm noGutters'>
                                    <Col sm='12'>
                                        <Form>
                                            <Row className='noGutters'>
                                                <Col sm='12'><h3 className='titleText noPadding'>Leave feedback</h3><small>Looks like you have bought this product in the past, time for your review!</small></Col>
                                            </Row>
                                            <FormGroup className='topDistance'>
                                                <Label for="ratingSelect">How much did you enjoy this product?</Label>
                                                <Input type="select" name="ratingSelect" id="ratingSelect" className='inputHalf'>
                                                    <option value='1'>1</option>
                                                    <option value='2'>2</option>
                                                    <option value='3'>3</option>
                                                    <option value='4'>4</option>
                                                    <option value='5'>5</option>
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="feedbackText">Your honest opition about it:</Label>
                                                <Input type="textarea" name="feedbackText" id="feedbackText" rows='8'/>
                                            </FormGroup>
                                            <Button type='submit' className='submitButton'>Submit Feedback</Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </Row>
                        }
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(Product);