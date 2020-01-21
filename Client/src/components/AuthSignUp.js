import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';

import './componentStyles/login.scss';

import {
    Container,
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap'

class AuthSignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            signUpErrors: ''
        };

        let formEnabled = true;
        let responseStatus = "";

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.formEnabled = false;
        const formdata = new FormData(event.target);
        var data = {};
        for (let name of formdata.keys()) {
            const value = formdata.get(name);
            data[name] = value;
        }
        axios
            .post("/api/post/signup", data)
            .then(response => {
                console.log("Response data ", response.data);
                this.responseStatus = response.data;
                if (response.data.code == 200) {
                    // return <Redirect to="/login" />;
                    window.location.replace("/");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

        render() {
                return (
<Container className='loginContainer boxShadow'>
                <div className='loginHeaderWrapper'>
                    <h2 className='loginTitle'>Log in </h2>
                    <Link className='headerSmall' to='/signup'>Sign up instead?</Link>
                </div>
                <Form className='formLogin' onSubmit={e => this.handleSubmit(e)}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" 
                            placeholder="email@email.com" value={this.state.email}
                            onChange={this.handleChange} 
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" 
                            placeholder="password" value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
    
                    <Button className='loginButton' type="submit">Log in</Button>

                </Form>
            </Container>
                )
        };
}


export default withRouter(AuthSignUp);