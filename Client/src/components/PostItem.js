import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router'
import styles from './componentStyles/PostItem.module.css';
import 'font-awesome/css/font-awesome.min.css';

import {
    Container,
    Row,
    Col,
    Button, 
    Form,
    FormGroup,
    Label,
    Input,
    InputGroup,
    InputGroupAddon
}
from 'reactstrap';

/**
 * CURRENT ISSUES:
 * 1. Form validation.
 * 2. Call toaster as notifier. 
 * 3. Get URL for image.
 */

class PostItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: '',
            quantity: '',
            description: '',
            image: '',
            location: '',
            category: '',
            categories: []
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        let stateName = event.target.name;
        console.log(event.target.value);
        
        this.setState({
            [stateName]: event.target.value
        })
        console.log(this.state.category);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        axios.post('/api/post/addproduct', {  
                description: formData.get('description'),
                name: formData.get('name'),
                quantity: formData.get('quantity'),
                picture_link: "",   // how to get img link
                price: formData.get('price'),
                seller_id: 43,      // update to logged in user id
                category_id: formData.get('category'),
                location: formData.get('location')
        }).then(response => {
            if (response.data.code == 200) {
                this.props.history.push('/profile/history')    // redirect to url (maybe not best practice, need to recheck)
            }
        });
    }

    getCategories = () => {
        axios.get('/api/get/categories').then(res => {
            for (let i = 0; i < res.data.length; i++) {
                this.setState(
                    (state) => ({ categories: [...this.state.categories, [res.data[i].name, res.data[i].id]] }),
                    () => console.log(this.state.categories)
                );
            }
        });
    };


    componentWillMount() {
        this.getCategories();
    };
            
render() {
    return (
        <Container className={styles.postContainer}>
            <div className={styles.pageHeader}>
                <h2 className={styles.pageTitle}>Post a new product</h2>
            </div>
            <Form className={`${styles.postForm} boxShadow`} onSubmit={this.handleSubmit}>
                <Row>
                    <Col sm='4'>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Product name"
                                value={this.state.name} onChange={this.handleChange}/>
                        </FormGroup>
                    </Col>
                    <Col sm='4'>
                        <FormGroup>
                            <Label for="location">Location</Label>
                            <Input type="text" name="location" id="location" placeholder="Product location"
                                value={this.state.location} onChange={this.handleChange}/>
                        </FormGroup>
                    </Col>
                    <Col sm='4'>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">&euro;</InputGroupAddon>
                                <Input type="number" name="price" id="price" placeholder="Price" min={0} step="1"
                                    value={this.state.price} onChange={this.handleChange}/>
                                <InputGroupAddon addonType="append">.00</InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col sm='4'>
                        <FormGroup>
                            <Label for="quantity">Quantity</Label>
                            <Input type="number" name="quantity" id="quantity" placeholder="Quantity" min={0} step="1"
                                value={this.state.quantity} onChange={this.handleChange}/>
                        </FormGroup>
                    </Col>
                    <Col sm='4'>
                        <FormGroup>
                            <Label for="location">Category</Label>
                            <Input type="select" name="category" id="category"
                                value={this.state.category} onChange={this.handleChange}>
                                {this.state.categories.map((value, key) => <option value={value[1]} key={key}>{value[0]}</option>)}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col sm='8'>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="textarea" name="description" id="description" placeholder="Describe your product as best as you can here." rows="6"
                                value={this.state.description} onChange={this.handleChange}/>
                        </FormGroup>
                    </Col>                                   
                    <Col sm='4'>
                        <Label for="fileLoader">Load image</Label>
                        <span className={styles.btnFile}>
                            <Input type="file" name="fileLoader" id="fileLoader" />
                        </span>
                    </Col>
                    <Col sm={{ size: 4, offset: 4 }}>
                        <Button type="submit" value="Submit" className={`${styles.submitBtn} defaultBtn`}>Submit</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
  }
}

export default withRouter(PostItem);