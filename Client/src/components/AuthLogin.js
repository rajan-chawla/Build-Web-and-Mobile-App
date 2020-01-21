import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';

import './componentStyles/login.scss';
{/*hello */}

import {
    Container,
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap'

class AuthLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loginErrors: ''
        };

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
        axios.post('/api/post/login',
        {
            body: {
                email: this.state.email,
                password: this.state.password
            }
        })
        .then(res => {
            if (res.data.success === 'login sucessfull')
            {
                localStorage.setItem('loggedIn', true);
                localStorage.setItem('loggedData', res.data);
                console.log('po');
                console.log(res);
                console.log(res.data);
                console.log(res.data.userid);
                console.log(localStorage.loggedIn);
                window.location.replace("/");
            } else {
                console.log('jo')
            }
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
    }
}

export default withRouter(AuthLogin);