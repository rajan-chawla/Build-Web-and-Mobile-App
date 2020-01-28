import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
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
            category: ''
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

    async handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        //alert(formData.get('name'));
        await axios.post('/api/post/addproduct', {
            body: {
                description: formData.get('description'),
                name: formData.get('name'),
                price: formData.get('price'),
                category_id: 1,
                seller_id: 49,
                picture_link: 'tetete',
                location: formData.get('location'),
            }
        }).then(response => {
            if (response.data.code == 200) {
                alert("hello")
            }
        });
    }


    componentWillMount() {};
            
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
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
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