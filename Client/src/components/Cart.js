import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import "../css/checkout.css";
import { connect } from "react-redux";
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
		var userLoggedInId = window.sessionStorage.getItem('userid');
        if(userLoggedInId == null){
            window.location.replace("/");
        }
		this.userId = parseInt(window.sessionStorage.getItem('userid'));

    	this.state = {
			products: [],
      		buyed: false,
			showToaster: false
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
		var products = this.state.products;

		for(var i=0; i<products.length; i++) {
			var prodId = products[i].id;
			axios.all([axios.post(`/api/post/transaction`, { user_id: this.userId, product_id: prodId }),
			axios.post(`/api/post/product/sale`, {id: prodId}),
			axios.delete(`/api/delete/cartItem`, {data: {userId: this.userId, prodId: prodId}})])
		  	.then(axios.spread((firstResponse, secondResponse, thirdResponse) => {  
				this.emptyProductsState();
		  		console.log(firstResponse.data,secondResponse.data, thirdResponse.data);
			}))
			.catch(error => console.log(error));	
		}
	}

	emptyProductsState() {
		this.setState({
			products: [],
			showToaster: true
		});
		
	}
  
	render() {

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
