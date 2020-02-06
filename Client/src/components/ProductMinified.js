import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'

import styles from './componentStyles/ProductMinified.module.css';

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
        this.props.history.push(`/product/id=${this.props.prodId}`);
    }

    render() {
        return (
            <div className={`${styles.productWrapper} ${styles.boxShadow} boxShadow`} onClick={this.handleParentClick}>
                <img src={this.props.img} className={styles.image}/>
                <div className={styles.descWrapper}>
                    <div className={styles.headerWrapper}>
                        <h3 className={styles.title}>{this.props.name}</h3>
                        <h3 className={styles.price}>&euro;{this.props.price}</h3>
                    </div>
                    <p>{this.props.desc}</p>
                    <div className={styles.buttonWrapper02}>
                        <Button className={styles.buyButton} onClick={this.handleChildClick}>Buy</Button>
                        {this.props.remove !== '1' &&
                        <Button className={styles.cartButton}>Add to Cart</Button>}
                        {this.props.remove === '1' &&
                        <Button className={`${styles.cartButton} ${styles.remove}`}>Remove from Cart</Button>}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ProductMinified);