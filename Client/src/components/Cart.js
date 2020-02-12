import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import "../css/checkout.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import ProductMinified from "./ProductMinified";

import styles from './componentStyles/Cart.module.css';
import './componentStyles/global.scss';
import 'font-awesome/css/font-awesome.min.css';
import {
  	Container,
	Row,
  	Col,
  	Button
}
from 'reactstrap';


class Cart extends Component {
	
	constructor(props) {
		super(props);
		this.userId = parseInt(window.sessionStorage.getItem('userid'));

    	this.state = {
			products: [],
      		buyed: false
		};
		
		this.handleClear = this.handleClear.bind(this);
		this.handleCheckout = this.handleCheckout.bind(this);
  	}
  
  	messagehandle(e) {
    	this.setState({buyed:true});
    	console.log("buy item ",this.buyed)
	}

	getCartItems = () => {
		axios.get(`/api/get/userCartItems?user_id=${this.userId}`).then(res => {
            for (let i = 0; i < res.data.length; i++) {
				console.log(res.data);
                this.setState(
                    (state) => ({ products: [...this.state.products, res.data[i]] }),
                    () => console.log(this.state.products)
                );
            }
        })
	}
	  
	componentDidMount() {
		this.getCartItems();
	}

	// function removes product from state as to avoid another API call for each item deletion from cart. (although item is removed from DB)
	async handleDelete(prodId) {
		let products = this.state.products;
		this.setState({
			products: products.filter((prod) => prod.id !== prodId)
		})
	}

	async handleClear(e) {
		e.stopPropagation();

		await axios.delete(`/api/delete/cart`, {data: {userId: this.userId}}).then(res => {
            console.log(res);
        }); 

		this.emptyProductsState()
	}

	async handleCheckout(e) {
		e.stopPropagation();
		
		// API naming confusing, buy_item actually is checkout the whole cart!!!
		for(let i=0; i<this.state.products.length; i++) {

			await axios.post(`/api/post/transaction`, { user_id: this.userId, product_id: this.state.products[i].id }).then(res => {
				console.log('Post Trans', res);
				axios.delete(`/api/delete/cartItem`, {data: {userId: this.userId, prodId: this.state.products[i].id}}).then(res => {
					axios.post(`/api/post/product/sale`, {id: this.state.products[i].id}).then(res => { 
						this.handleDelete(this.state.products[i].id)
						console.log('Post Sale', res);
					})
					console.log('Delete', res);
				})
			
			})
			/*
			await axios.post(`/api/post/product/sale`, {id: this.state.products[i].id}).then(res => { 
            	console.log('Post Sale', res);
			})
			
			await axios.delete(`/api/delete/cartItem`, {data: {userId: this.userId, prodId: this.state.products[i].id}}).then(res => {
            	console.log('Delete', res);
			})
			
			await this.handleDelete(this.state.products[i].id)*/
		}

		// this.emptyProductsState()
	}

	emptyProductsState() {
		this.setState({
			products: []
		})
	}
  
	render() {
	/*	if (
      	// 	this.props.products.cartItems.length == "undefined" ||
      	// 	this.props.products.cartItems.length == 0
        	this.props.products.purchased===true
    	) {
      	console.log("exec");
      	return <Redirect to="/purchase" />;
    	} else {
    */
    	return (
        	<Container className={styles.cartContainer}>
            	<Row>
              		{this.state.products.length > 0 &&
                		<Col sm='9'>
                    		{this.state.products.map(result => {
                        		return <ProductMinified name={result.name} desc={result.description} 
									price={result.price} img={result.picture_link} prodId={result.id} 
									address={result.location} remove='1' cart='1' handleDelete={this.handleDelete.bind(this)}/>
                    		})}
                		</Col>
              		}
              		{this.state.products.length <= 0 &&
                		<Col sm='9'> <p className={styles.emptyCart}>You have no products in your cart.</p> </Col>
              		}
                
					<Col sm='3' className={`${styles.checkoutBox} boxShadow`}>
                    	<h2>Checkout<sup><small className={styles.clearCart} onClick={this.handleClear}> Clear cart?</small></sup></h2>
					  	<p>Number of items: {this.state.products.length}</p>
						<p>Total price:{" "}
							<strong>{this.state.products.reduce(
								(price, addprice) => price + addprice.price,
								0
							)}&euro;
							</strong>
					  	</p>
                    	<small>Proceed with the checkout?</small>
                    	<Button className={styles.checkoutButton} onClick={this.handleCheckout}>Checkout</Button>
                	</Col>
            	</Row>
        	</Container>
        )
    }
}

const mapStateToProps = state => {
	return {
    	products: state.getProductReducer
  	};
};

function removeFromItem(product_id, dispatch) {
	return axios
    	.post("/api/post/deleteitemincart", {
      		user_id: window.sessionStorage.getItem("userid"),
      		product_id: product_id
    	})
    .then(response => {
      	if (response.data.code == 200) {
        	dispatch({
          		type: "DELETE_FROM_CART",
          		payload: product_id
        	});
      	}
    });
}

function buyItem(userID, dispatch) {
  // console.log("USERID:",userID)
  	return axios
    	.post("/api/post/buy_item", {
      		userID: window.sessionStorage.getItem("userid")
    })
    .then(response => {
      	if (response.data.code == 200) {
        	dispatch({type: "BUY_PRODUCT",payload: true})
    	}
    });
}

const mapDispatchToProps = dispatch => {
  	return {
    	removeCartitemDb: product_id => {
      		removeFromItem(product_id, dispatch);
		},
		removeCartItem: product_id => {
			dispatch({
				type: "DELETE_FROM_CART",
				payload: product_id
			});
		},
		// quantity: (event, product) => {
		//   // console.log(product);
		//
		//   dispatch({
		//     type: "QUANTITY",
		//     payload: product,
		//     quantity: event.target.value
		//   });
		// },
		buyItem: () => {
			let userID = window.sessionStorage.getItem("userid");
			buyItem(userID,dispatch);
		// console.log(product);
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
