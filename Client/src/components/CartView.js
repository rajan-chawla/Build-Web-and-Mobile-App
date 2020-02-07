import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import ProductMinified from './ProductMinified';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from './componentStyles/Cart.module.css';

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
          buyed: false
      };
  }

  messagehandle(e) {
      this.setState({
          buyed: true
      });
      console.log("buy item ", this.buyed)
  }
    
    getResults = () => {
        axios.get('/api/get/productlist').then(res => {
            for (let i = 0; i < res.data.length; i++) {
                this.setState(
                    (state) => ({ results: [...this.state.results, res.data[i]] })
                );
            }
        })
    }

    removeFromItem(product_id, dispatch) {
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

    buyItem(userID, dispatch) {
        // console.log("USERID:",userID)
        return axios
            .post("/api/post/buy_item", {
                userID: window.sessionStorage.getItem("userid")
            })
            .then(response => {
                if (response.data.code == 200) {
                    dispatch({
                        type: "BUY_PRODUCT",
                        payload: true
                    })
                }
            });
    }

    componentWillMount() {
        //this.getResults();
    };

    test() {
        console.log(this.props.products)
    }

    render() {
        return (
            <Container className={styles.cartContainer}>
            <Row>
                
                <Col sm='9'>
                    {this.state.results.map(result => {
                        return <ProductMinified name={result.name} desc={result.description} 
                            price={result.price} img={result.picture_link} prodId={result.id} 
                            address={result.location} date={result.added_date.substring(0, 10)} cart={true}/>
                        })
                    }
                </Col>
                <Col sm='3' className={`${styles.checkoutBox} boxShadow`}>
                    <h2>Checkout</h2>
                    <p>Proceed with the checkout?</p>
                    <Button className={styles.checkoutButton} onClick={this.test}>Checkout</Button>
                </Col>
            </Row>
        </Container>
        )
    }

        mapStateToProps = state => {
        //console.log(state.getProductReducer)
        return {
            products: state.getProductReducer
        };
    };


    mapDispatchToProps = dispatch => {
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
    buyItem: () => {
      let userID = window.sessionStorage.getItem("userid");
      buyItem(userID,dispatch);
      // console.log(product);
    }
    };
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);