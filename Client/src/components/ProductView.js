import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

import './componentStyles/product.scss';
import 'font-awesome/css/font-awesome.min.css';
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
        
        this.userRole = '1';
        this.userId = parseInt(window.sessionStorage.getItem('userid'));

        this.state = {
            productId: this.props.match.params.id,
            productTitle: null,
            productPrice: null,
            productImageLink: null,
            productPostedDate: null,
            productDescription: null,
            productSellerId: null,
            productSellerName: null,
            productValid: null,
            productQuantity: null,
            productLocation: null,
            amOwner: null,
            leftFeedback: false,
            alreadyBought: false,
            alreadyInCart: false
        };

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    getShareOnFacebookText() {
        return `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
    }

    getShareOnTwitterText() {
        return `https://twitter.com/intent/tweet?text=Checkout%20this%20amazing%20product%20on%20SampleMe:&url=${window.location.href}&hashtags=sampleMe,bargainSale`
    }

    async getProductData() {
        await axios.get('/api/get/productbyid', {
            params: {
                id: this.state.productId
            }
        }).then(res => {
            // check if product is validated or not
            if (res.data[0].is_validated.data[0] != 1) {
                this.props.history.push('/');
            }

            console.log(res.data[0])
            this.setState({
                productId: res.data[0].id,
                productTitle: res.data[0].name,
                productPrice: res.data[0].price,
                productPostedDate: res.data[0].added_date.substring(0, 10),
                productDescription: res.data[0].description,
                productSellerId: res.data[0].seller_id,
                productSellerName: res.data[0].seller_name,
                productImageLink: res.data[0].picture_link,
                productValid: res.data[0].is_validated.data[0],
                productQuantity: res.data[0].quantity,
                productLocation: res.data[0].location
            });
        }, (err => {
            // redirect if ID invalid
            this.props.history.push('/');
        }))
        if (this.userRole === '1') {
            // get if user has already provided feedback
            await axios.get(`/api/get/feedbackFromBuyerId?id=${this.userId}`)
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        leftFeedback: true
                    })
                } else {
                    this.setState({
                        leftFeedback: false
                    })
                }
            })
        }
        // get if user has this item in cart 
        await axios.get(`/api/get/cartHasItem?bid=${this.userId}&pid=${this.state.productId}`)
        .then(res => {
            if (res.data.length > 0) {
                this.setState({
                    alreadyInCart: true
                })
            } else {
                this.setState({
                    alreadyInCart: false
                })
            }
        })

        this.amOwner();
    };

    amOwner() {
        this.setState({
            amOwner: (this.userId === this.state.productSellerId)
        })
    }

    haveBought() {
        // check if buyer id === user id. CHANGE BUYER_ID COLUMN TO ARRAY OF IDS?
    }

    addToCart() {
        // import from Rajan code
    }

    removeFromCart() {
        // import from Rajan code
    }

    buyProduct() {
        // import from Rajan code
    }

    deleteItem() {
        // import from Rajan code
    }

    // submitting feedback
    async handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        await axios.post('/api/post/addFeedback', {
            description: formData.get('feedbackText'),
            rate: formData.get('ratingSelect'),
            seller_id: this.state.productSellerId,
            buyer_id: this.userId,
            product_id: this.state.productId
        }).then(response => {
            if (response.data.code == 200) {
                alert('success')
                //this.props.history.push('/profile/history') // redirect to url (maybe not best practice, need to recheck)
            }
        });
    }

    componentDidMount() {
        this.getProductData();
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
                               <span>Offered by:&nbsp;
                                    <Link to={{pathname: `/public/profile/id=${this.state.productSellerId}`}}
                                        className='productSeller'>
                                         {this.state.productSellerName}
                                    </Link>
                                </span>
                                <br/>
                                <span>Located at: {this.state.productLocation}</span>
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
                            { this.userRole === '1' && this.state.productQuantity > 0 && this.state.alreadyBought === false && 
                                // User is buyer, product is valid and product has not been bought.
                                <Row className='descriptionRow buttonsWrapper noGutters'>
                                    <Col sm='6' className='buttonWrapper'>
                                        <Button className='buyButton'>Buy</Button>
                                    </Col>
                                    <Col sm='6' className='buttonWrapper'>
                                        { this.state.alreadyInCart === false && 
                                            <Button className='cartButton'>Add to Cart</Button>
                                        }
                                        { this.state.alreadyInCart === true && 
                                            <Button className='cartButton'>Remove from Cart</Button>
                                        }
                                    </Col>
                                </Row>
                            }
                            { this.userRole === '1' && this.state.productQuantity > 0 && this.state.alreadyBought === true && 
                                // User is buyer, product is valid and has already bought the product.
                                <Row className='descriptionRow noGutters'>
                                    <Col sm='12'>
                                        <h5 className='productSold'> You've already bought this item.</h5>
                                    </Col>
                                </Row>
                            }
                            { this.userRole === '2' && this.state.amOwner === true && 
                                // User is seller AND owner.
                                <Row className='descriptionRow buttonsWrapper noGutters'>
                                    <Col sm='6' className='buttonWrapper'>
                                        <Button className='buyButton'>Delete Product</Button>
                                    </Col>
                                </Row>
                            }
                            { this.userRole === '3' &&
                                // User is admin.
                                <Row className='descriptionRow buttonsWrapper noGutters'>
                                    <Col sm='6' className='buttonWrapper'>
                                        <Button className='buyButton'>Delete Product</Button>
                                    </Col>
                                </Row>
                            }
                            { this.userRole === '1' && this.state.productQuantity <= 0 &&
                                // Product is unavailable due to lack of quantity AND user is buyer.
                                <Row className='descriptionRow noGutters'>
                                    <Col sm='12'>
                                        <h5 className='productSold'> This product is out of stock!</h5>
                                    </Col>
                                </Row>
                            }
                            { this.userRole === '2' && this.state.amOwner === false &&
                                // User is seller AND not owner.
                                <Row className='descriptionRow noGutters'>
                                    <Col sm='12'>
                                        <h5 className='productSold'> Sorry, you are not a buyer!</h5>
                                    </Col>
                                </Row>
                            }
                        </Row>
                        { this.userRole === '1' && this.state.alreadyBought === true && this.state.leftFeedback === false &&
                            // User is available to provide feedback.
                            <Row className='feedbackWrapper boxShadow'>
                                <Row className='feedbackForm noGutters'>
                                    <Col sm='12'>
                                        <Form onSubmit={this.handleSubmit}>
                                            <Row className='noGutters'>
                                                <Col sm='12'><h3 className='titleText noPadding'>Leave feedback</h3>
                                                <small>Looks like you have bought this product in the past, time for your review!</small></Col>
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