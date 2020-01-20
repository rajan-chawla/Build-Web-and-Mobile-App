import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './componentStyles/search.scss';
import {
    Container,
    Row,
    Col
}
from 'reactstrap';
import ProductMinified from './ProductMinified';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params.input);
        this.state = {
            categories: ['All'],
            results: [],
            selectedIndex: 0
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

    getResults = () => {
        axios.get('/api/get/productlist').then(res => {
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
        this.getResults();
    };

    test(key) {
        this.setState({
            selectedIndex: key
        })
    }

render() {
    return (
        <Container className='searchContainer'>
            <Row>
                <Col sm='3' className='affix boxShadow'>
                    <h4 className='categoryTitle'>Categories</h4>
                    <ul className='categoryList'>
                        {this.state.categories.map((value, index) => {
                            return <li className={`categoryItem ${this.state.selectedIndex == index ? 'selected' : 'notSelected'}`} key={index} onClick={() => {this.test(index)}}>{value}</li>
                        })}
                    </ul>
                </Col>
                <Col sm={{ size: 9, offset: 3 }}>
                    {this.state.results.map(result => {
                        return <ProductMinified name={result.name} desc={result.description} price={result.price} img={result.picture_link} remove='0'/>
                    })}
                </Col>
            </Row>
        </Container>
    )
  }
}

export default withRouter(SearchResults);