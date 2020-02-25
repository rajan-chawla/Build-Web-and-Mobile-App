import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import Toaster from './Toaster';

import styles from './componentStyles/ProductView.module.css';
import './componentStyles/global.scss';
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
        
        this.userRole = window.sessionStorage.getItem('userrole');
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
            leftFeedback: null,
            alreadyBought: false,
            alreadyInCart: false,
            showToaster: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
        this.handleBuyProduct = this.handleBuyProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    handleAddToCart() {
        axios.post('/api/post/addtocart', {user_id: this.userId, product_id: this.state.productId})
            .then(res => {
                console.log(res);
                this.setState({
                    alreadyInCart: true,
                    showToaster: 'true'
            })
        })
    }

    async handleBuyProduct() {
        await axios.post(`/api/post/transaction`, { user_id: this.userId, product_id: this.state.productId }).then(res => {
                console.log(res);
                this.setState({
                    alreadyBought: true,
                    leftFeedback: false
            })
        });

        await axios.post(`/api/post/product/sale`, {id: this.state.productId}).then(res => { 
            
            console.log(res);
        })
    }

    handleRemoveFromCart() {
        // delete request needs to have data keyword, then provide body params.
        axios.delete(`/api/delete/cartItem`, {data: {userId: this.userId, prodId: this.state.productId}}).then(res => {
            console.log(res);
            this.setState({
                alreadyInCart: false
            });
        }); 
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
            // redirect to homepage if product ID is invalid
            this.props.history.push('/');
        }))
    
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
        });

        // get if user has already bought this item before 
        await axios.get(`/api/get/transaction/${this.userId}/${this.state.productId}`)
        .then(res => {
            this.setState({
                alreadyBought: true
            }); 
        }).catch(err => {
            console.log(err)
        });

        if (this.userRole === '1' && this.state.alreadyBought === true) {
            // check if user has already provided feedback
            await axios.get(`/api/get/feedbackFromBuyerId?buyerId=${this.userId}&productId=${this.state.productId}`)
            .then(res => {
                if (res.data[0]) {
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

        this.amOwner();
    };

    amOwner() {
        console.log("TETET")
        console.log(this.userId);
        console.log(this.state.productSellerId);
        this.setState({
            amOwner: (this.userId === this.state.productSellerId)
        })
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
                this.setState({
                    leftFeedback: true
                });
                //this.props.history.push('/profile/history') // redirect to url (maybe not best practice, need to recheck)
            }
        });
    }

    async deleteProduct(product_id) {
        const params = { pid: product_id};
        console.log("Clicked " + product_id);
        await axios.post('/api/post/deleteproduct', params).then(response => {
          if (response.data.code == 200) {
            alert("Product deleted successfully");
            window.location.replace("/");
          }
      });
      }

    componentDidMount() {
        this.getProductData();
    };

    render() {
        if (this.state.amOwner === null)
            return null;
        return (
            <Container className={styles.productContainer}>
                
                <Row>
                    <Col sm='4' className={styles.productImageWrapper}> 
                        <Row className='noPadding noGutters'>
                            <Col sm='12' className={`${styles.imgWrapper} boxShadow`}>
                            <img src={`${process.env.PUBLIC_URL}${this.state.productImageLink}`}
                                alt='Product image' />    
                            </Col>
                       </Row>
                       <Row className='noGutters noPadding'>
                           <Col sm='12' className={`${styles.sellerWrapper} boxShadow`}>
                               <span>Offered by:&nbsp;
                                    <Link to={{pathname: `/profile/public/id=${this.state.productSellerId}`}}
                                        className={styles.productSeller}>
                                         {this.state.productSellerName}
                                    </Link>
                                </span>
                                <br/>
                                <small className={styles.dateText}>
                                    <i class="fa fa-calendar"></i>&nbsp;{this.state.productPostedDate}
                                </small>
                           </Col>
                       </Row>
                    </Col>
                    <Col sm='8'>
                        <Row className={`${styles.productDescriptionWrapper} boxShadow`}>
                            <Row className={`${styles.descriptionRow}`}>
                                <Col sm='4'>
                                    <h3 className={styles.titleText}>{this.state.productTitle}</h3>
                                </Col>
                                <Col sm='8'>
                                    <h3 className={styles.priceText}>&euro;{this.state.productPrice}</h3>
                                </Col>
                            </Row>
                            <Row className={`${styles.descriptionRow}`}>
                                <Col sm='6'>
                                    <small className={styles.dateText}>
                                        <i class="fa fa-map-marker"></i>&nbsp;{this.state.productLocation}
                                    </small>
                                </Col>
                                <Col sm='6'>
                                    <span className={styles.shareIcons}>
                                        <small>Share: </small>
                                        <a href={this.getShareOnFacebookText()}><i className='fa fa-facebook-square'></i></a>
                                        <a href={this.getShareOnTwitterText()}
                                            className='twitter-share-button'>
                                                <i className='fa fa-twitter-square'></i>
                                        </a>
                                    </span>
                                </Col>
                            </Row>
                            <Row className={`${styles.descriptionRow} ${styles.descriptionWrapper}`}>
                                <Col sm='12'><p className={styles.descText}>{this.state.productDescription}</p></Col>
                            </Row>
                            
                            { this.userRole === null && 
                                <Row className={`${styles.descriptionRow} noGutters`}>
                                    <Col sm='12'>
                                        <h5 className={styles.productSold}> You need to login to interact with this product!</h5>
                                    </Col>
                                </Row>
                            }
                            { this.userRole === '1' && this.state.productQuantity > 0 && this.state.alreadyBought === false && 
                                // User is buyer, product is valid and product has not been bought.
                                <Row className={`${styles.descriptionRow} ${styles.buttonsWrapper} noGutters`}>
                                    <Col sm='6' className={styles.buttonWrapper}>
                                        <Button className={styles.buyButton} onClick={this.handleBuyProduct}>Buy</Button>
                                    </Col>
                                    <Col sm='6' className={styles.buttonWrapper}>
                                        { this.state.alreadyInCart === false && 
                                            <Button className={styles.cartButton} onClick={this.handleAddToCart}>Add to Cart</Button>
                                        }
                                        { this.state.alreadyInCart === true && 
                                            <Button className={styles.cartButton} onClick={this.handleRemoveFromCart}>Remove from Cart</Button>
                                        }
                                    </Col>
                                </Row>
                            }
                            { this.userRole === '1' && this.state.productQuantity > 0 && this.state.alreadyBought === true && this.state.leftFeedback === false &&
                                // User is buyer, product is valid and has already bought the product.
                                <Row className={`${styles.descriptionRow} noGutters`}>
                                    <Col sm='12'>
                                        <h5 className={styles.productSold}> You've already bought this item.</h5>
                                    </Col>
                                </Row>
                            }

                            { this.userRole === '1' && this.state.productQuantity > 0 && this.state.alreadyBought === true && this.state.leftFeedback === true &&
                           
                                <Row className={`${styles.descriptionRow} noGutters`}>
                                    <Col sm='12'>
                                        <h5 className={styles.productSold}> Feedback submitted! </h5>
                                    </Col>
                                </Row>
                            }

                            { this.userRole === '2' && this.state.amOwner === true && 
                                // User is seller AND owner.
                                <Row className={`${styles.descriptionRow} ${styles.buttonsWrapper} noGutters`}>
                                    <Col sm='6' className={styles.buttonWrapper}>
                                        <Button className={styles.buyButton} onClick={() => this.deleteProduct(this.state.productId)}>Delete Product</Button>
                                    </Col>
                                </Row>
                            }
                            { this.userRole === '3' &&
                                // User is admin.
                                <Row className={`${styles.descriptionRow} ${styles.buttonsWrapper} noGutters`}>
                                    <Col sm='6' className={styles.buttonWrapper}>
                                        <Button className={styles.buyButton} onClick={() => this.deleteProduct(this.state.productId)}>Delete Product</Button>
                                    </Col>
                                </Row>
                            }
                            { this.userRole === '1' && this.state.productQuantity <= 0 &&
                                // Product is unavailable due to lack of quantity AND user is buyer.
                                <Row className={`${styles.descriptionRow} noGutters`}>
                                    <Col sm='12'>
                                        <h5 className={styles.productSold}> This product is out of stock!</h5>
                                    </Col>
                                </Row>
                            }
                            { this.userRole === '2' && this.state.amOwner === false &&
                                // User is seller AND not owner.
                                <Row className={`${styles.descriptionRow} noGutters`}>
                                    <Col sm='12'>
                                        <h5 className={styles.productSold}> Sorry, you are not a buyer!</h5>
                                    </Col>
                                </Row>
                            }
                        </Row>
                        { this.userRole === '1' && this.state.alreadyBought === true && this.state.leftFeedback === false &&
                            // User is available to provide feedback.
                            <Row className={`${styles.feedbackWrapper} boxShadow`}>
                                <Row className={`noPadding ${styles.feedbackForm}`}>
                                    <Col sm='12'>
                                        <Form onSubmit={this.handleSubmit}>
                                            <Row className={styles.feedbackContainer}>
                                                <Col sm='12'><h3 className={`${styles.titleText} noPadding noGutters`}>Leave feedback</h3>
                                                <small>Looks like you have bought this product in the past, time for your review!</small></Col>
                                            </Row>
                                            <FormGroup className={styles.topDistance}>
                                                <a name="feedback"></a>
                                                <Label for="ratingSelect">How much did you enjoy this product?</Label>
                                                <Input type="select" name="ratingSelect" id="ratingSelect" className={styles.inputHalf}>
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
                                            <Button type='submit' className={styles.submitButtonFeedback}>Submit Feedback</Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </Row>
                        }
                    </Col>
                </Row>
                <Toaster type='success' text='hihihi' show={this.state.showToaster} />
            </Container>
        );
    }
}

export default withRouter(Product);