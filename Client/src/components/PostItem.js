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
        var userLoggedInId = window.sessionStorage.getItem('userid');
        if(userLoggedInId == null){
            window.location.replace("/");
        }
        this.userId = window.sessionStorage.getItem('userid')

        this.state = {
            name: '',
            price: '',
            quantity: '',
            description: '',
            location: '',
            category: '',
            imgFile: '',
            imgFileURL: '',
            categories: [],  // for select dropdown
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getFileImage = this.getFileImage.bind(this)
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
        if (this.validateForm()) {
            // get data from the submitted form.
            const formData = new FormData(event.target);

            // get final URL from cloudinary.
            const imgData = new FormData();
            imgData.append("image", this.state.imgFile);

            await axios.post('/api/post/uploadpic', imgData)
                .then(res => {
                    this.setState({
                        product_link: res.data.image
                    })
                });

            // process product submittion.
            await axios.post('/api/post/addproduct', {
                description: formData.get('description'),
                name: formData.get('name'),
                quantity: formData.get('quantity'),
                picture_link: this.state.product_link,
                price: formData.get('price'),
                seller_id: this.userId,      // update to logged in user id
                category_id: formData.get('category'),
                location: formData.get('location')
            }).then(response => {
                if (response.data.code == 200) {
                    this.props.history.push('/profile/dashboard')    // redirect to url (maybe not best practice, need to recheck)
                }
            });
        }
    }

    validateForm() {
        let name = this.state.name;
        let price = this.state.price;
        let quantity = this.state.quantity;
        let description = this.state.description;
        let imgFile = this.state.imgFile;
        let formIsValid = true;
        let errors = {};

        if (!name) {
            formIsValid = false;
            window.alert("Please enter your name.");
            errors["name"] = "Please enter your name.";
        }
        else
        if (!price) {
            formIsValid = false;
            errors["price"] = "Please enter price.";
            window.alert("Please enter price");
        }
        else
        if (!quantity) {
            formIsValid = false;
            errors["quantity"] = "Please enter quantity";
            window.alert("Please enter quantity");
        }
        else
        if (!description) {
            formIsValid = false;
            errors["description"] = "*Please enter product description.";
            window.alert("Please enter product description.");
        }
        else
        if (!imgFile) {
            formIsValid = false;
            errors["imgFile"] = "*Please upload the image.";
            window.alert("Please upload the image.");
        }

        return formIsValid;

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

    getFileImage(event) {
       
        this.setState({
            imgFile: event.target.files[0],
            imgFileURL: URL.createObjectURL(event.target.files[0])
        });
    }


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
                                    value={this.state.name} onChange={this.handleChange} />
                                      <div className="errorMsg">{this.state.errors.name}</div>
                            </FormGroup>
                        </Col>
                        <Col sm='4'>
                            <FormGroup>
                                <Label for="location">Location</Label>
                                <Input type="text" name="location" id="location" placeholder="Product location"
                                    value={this.state.location} onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                        <Col sm='4'>
                            <FormGroup>
                                <Label for="price">Price</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">&euro;</InputGroupAddon>
                                    <Input type="number" name="price" id="price" placeholder="Price" min={0} step="1"
                                        value={this.state.price} onChange={this.handleChange}  inputmode="numeric" pattern="[0-9]"/>
                                    <InputGroupAddon addonType="append">.00</InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col sm='4'>
                            <FormGroup>
                                <Label for="quantity">Quantity</Label>
                                <Input type="number" name="quantity" id="quantity" placeholder="Quantity" min={0} step="1"
                                    value={this.state.quantity} onChange={this.handleChange} />
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
                                    value={this.state.description} onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                        <Col sm='4' className={styles.btnImgWrapper}>
                            <img src={
                                this.state.imgFile === null || this.state.imgFile === ""
                                ? "http://res.cloudinary.com/doanqz7r8/image/upload/v1582476132/yzggv3vr0tgetdjjxbx6.png"
                                : this.state.imgFileURL
                                }  className={styles.profileThumb} alt="avatar" />
                            <span className={styles.btnFile}>
                                <Input type="file" name="fileLoader" id="fileLoader" onChange={this.getFileImage} />
                            </span>
                        </Col>
                        <Col sm={{ size: 4, offset: 4 }} className='actionBtnWrapper'>
                            <Button type="submit" value="Submit" className={`${styles.submitBtn} defaultBtn`}>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}

export default withRouter(PostItem);