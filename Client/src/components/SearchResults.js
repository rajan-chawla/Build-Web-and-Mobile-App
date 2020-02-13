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
            selectedIndex: (this.props.match.params.category === undefined) ? 0 : this.props.match.params.category,
            searchCategory: this.props.match.params.category,
            searchTerm: this.props.match.params.term
        };
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

    getResults = (term, category) => {
        axios.get(`/api/get/search?term=${term}&categoryId=${category}`).then(res => {
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
        this.getResults(this.props.match.params.term, this.props.match.params.category);
    };


    categoryChange(val) {
      this.setState(
            (state) => ({ results: [] }),
            this.getResults(this.state.searchTerm, val)
        )
    };
            
render() {
    return (
        <Container className={styles.searchContainer}>
            <Row>
                <Col sm='3' className={`affix boxShadow`}>
                    <div className={styles.categoriesWrapper}>
                        <h4 className={styles.categoryTitle}>Categories</h4>
                        <ul className={styles.categoryList}>
                            {this.state.categories.map((value, index) => {
                                return <li className = {`${styles.categoryItem} ${this.state.selectedIndex == index ? 'selected' : ''}`}
                                key={index} value={value} onClick={() => {this.categoryChange(index)}}> 
                                {value} </li>
                            })}
                        </ul>
                    </div>
                </Col>

                <Col sm={{ size: 9, offset: 3 }}>
                                    {this.state.results.length <= 0 &&
                    <p className={styles.emptySearch}>There are no items for your search.</p>
              	}
                    {this.state.results.map(result => {
                        return <ProductMinified name={result.name} desc={result.description} 
                        price={result.price} img={result.picture_link} prodId={result.id} 
                        address={result.location} date={result.added_date.substring(0, 10)}/>
                    })}
                </Col>

                


            </Row>
        </Container>
    )
  }
}

export default withRouter(SearchResults);