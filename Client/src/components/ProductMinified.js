import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'

import styles from './componentStyles/ProductMinified.module.css';
import 'font-awesome/css/font-awesome.min.css';

import {
    Button
}
from 'reactstrap';

class ProductMinified extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);

        this.state = {
    
        };

        this.handleParentClick = this.handleParentClick.bind(this);
    }

    handleChildClick(e) {
        e.stopPropagation();
        console.log('child');
       
    }

    handleParentClick(e) {
        e.stopPropagation();
        //alert(this.props.prodId);
        this.props.history.push(`/product/id=${this.props.prodId}`);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={`${styles.productWrapper} ${styles.boxShadow} boxShadow`} onClick={this.handleParentClick}>
                <img src={this.props.img} className={styles.image}/>
                <div className={styles.descWrapper}>
                    <div className={styles.headerWrapper}>
                        <div className={styles.titleWrapper}>
                        <h3 className={styles.title}>{this.props.name}</h3>
                        <small className='dateText'><i class="fa fa-map-marker"></i> {this.props.address}</small>
                        </div>
                        <h3 className={styles.price}>&euro;{this.props.price}</h3>
                    </div>
                    <p>{this.props.desc}</p>
                    <div className={styles.buttonsWrapper02}>
                        {this.props.cart && 
                            <Button className={`${styles.buyButton} ${styles.remove}`}><i class="fa fa-credit-card"></i> Buy</Button>
                        }
                        {this.props.remove !== '1' &&
                        <Button className={styles.cartButton}><i class="fa fa-shopping-cart"></i> Add to Cart</Button>}
                        {this.props.remove === '1' &&
                        <Button className={`${styles.cartButton} ${styles.remove}`}>Remove from Cart</Button>}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ProductMinified);