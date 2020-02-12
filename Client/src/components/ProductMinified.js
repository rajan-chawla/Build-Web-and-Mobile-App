import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
import axios from 'axios';
import styles from './componentStyles/ProductMinified.module.css';
import 'font-awesome/css/font-awesome.min.css';

import {
    Button
}
from 'reactstrap';

class ProductMinified extends Component {
    constructor(props) {
        super(props);
 
        this.userId = parseInt(window.sessionStorage.getItem('userid'));
        this.state = {
    
        };

        this.handleRemove = this.handleRemove.bind(this);
        this.handleGoToProduct = this.handleGoToProduct.bind(this);
        this.handleBuyProduct = this.handleBuyProduct.bind(this);
    }

    async handleBuyProduct(e) {
        e.stopPropagation();

        await axios.post(`/api/post/transaction`, { user_id: this.userId, product_id: this.props.prodId }).then(res => {
            console.log(res);
            this.setState({
                alreadyBought: true,
                leftFeedback: false
            })
        }).then(axios.post(`/api/post/product/sale`, {id: this.props.prodId}).then(res => { 
            console.log(res);
        })).then( axios.delete(`/api/delete/cartItem`, {data: {userId: this.userId, prodId: this.props.prodId}}).then(res => {
            console.log(res);
        }))

        this.props.handleDelete(this.props.prodId);
    }

    handleRemove(e) {
        e.stopPropagation();
        // delete request needs to have data keyword, then provide body params.
        axios.delete(`/api/delete/cartItem`, {data: {userId: this.userId, prodId: this.props.prodId}}).then(res => {
            console.log(res);
        }); 

        this.props.handleDelete(this.props.prodId);
    }

    handleGoToProduct(e) {
        e.stopPropagation();
        //alert(this.props.prodId);
        this.props.history.push(`/product/id=${this.props.prodId}`);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={`${styles.productWrapper} ${styles.boxShadow} boxShadow`} onClick={this.handleGoToProduct}>
                <img src={this.props.img} className={styles.image}/>
                <div className={styles.descWrapper}>
                    <div className={styles.headerWrapper}>
                        <div className={styles.titleWrapper}>
                        <h3 className={styles.title}>{this.props.name}</h3>
                        <small className='dateText'><i className="fa fa-map-marker"></i> {this.props.address}</small>
                        </div>
                        <h3 className={styles.price}>&euro;{this.props.price}</h3>
                    </div>
                    <p>{this.props.desc}</p>
                    <div className={styles.buttonsWrapper02}>
                        {this.props.cart && 
                            <Button className={`${styles.buyButton} ${styles.remove}`} onClick={this.handleBuyProduct}><i className="fa fa-credit-card"></i> Buy</Button>
                        }
                        {this.props.remove !== '1' &&
                        <Button className={styles.cartButton}><i className="fa fa-shopping-cart"></i> Add to Cart</Button>}
                        {this.props.remove === '1' &&
                        <Button className={`${styles.cartButton} ${styles.remove}`} onClick={this.handleRemove}><i className="fa fa-shopping-cart"></i> Remove</Button>}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ProductMinified);