import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import ProductMinified from './ProductMinified';
import styles from './componentStyles/SearchResults.module.css';

import {
    Container,
    Row,
    Col
}
from 'reactstrap';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: ['All'],
            results: [],
            selectedIndex: 0,
            searchType: this.props.match.params.type,
            searchTerm: this.props.match.params.term
        };

        console.log('search type ', this.state.searchType)
    }

    getCategories = () => {
        axios.get('/api/get/categories').then(res => {
            for (let i = 0; i < res.data.length; i++) {
                this.setState(
                    (state) => ({ categories: [...this.state.categories, res.data[i].name] }),
                    () => console.log(this.state.categories)
                );
            }
        });
    };

    getResults = (a, b) => {
        axios.get(`/api/get/allproducts?type=${a}&term=${b}`).then(res => {
            for (let i = 0; i < res.data.length; i++) {
                this.setState(
                    (state) => ({ results: [...this.state.results, res.data[i]] }),
                    () => console.log(this.state.results)
                );
            }
        })
    }

    componentWillMount() {
        this.getCategories();
        this.getResults('Name', '');
    };


    categoryChange(val) {
      this.setState(
            (state) => ({ results: [] }),
            this.getResults('Category', val)
        )
    };
            
render() {
    return (
        <Container className={styles.searchContainer}>
            <Row>
                <Col sm='3' className={`${styles.affix} boxShadow`}>
                    <h4 className={styles.categoryTitle}>Categories</h4>
                    <ul className={styles.categoryList}>
                        {this.state.categories.map((value, index) => {
                            return <li className={`${styles.categoryItem} ${this.state.selectedIndex == index ? 'selected' : 'notSelected'}`} key={index} value={value} onClick={() => {this.categoryChange(value)}}>{value}</li>
                        })}
                    </ul>
                </Col>
                <Col sm={{ size: 9, offset: 3 }} className={styles.results}>
                    {this.state.results.map(result => {
                        return <ProductMinified name={result.name} desc={result.description} price={result.price} img={result.picture_link} prodId={result.id} remove='0'/>
                    })}
                </Col>
            </Row>
        </Container>
    )
  }
}

export default withRouter(SearchResults);