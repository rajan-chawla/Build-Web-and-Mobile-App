import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styles from './componentStyles/ProfileView.module.css';

import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input
}
from 'reactstrap';

class ProfileView extends Component {

    constructor(props) {
        super(props);

        this.userId = window.sessionStorage.getItem('userid');

        this.state = {
            userData: {}
        };
        this.getUserData();
    }

    componentWillMount() {

    };

    componentDidUpdate() {
 
    }

    getUserData = async () => {
        //NEED CHANGE
        const params = { id: this.userId};
        await axios.get('/api/get/profile', { params }).then(result => {
            for (var attr in result.data[0]) {
                if (result.data[0][attr] === "undefined") {
                    console.log(result.data[0][attr]);
                    result.data[0][attr] = "";
                }
            }
            this.setState(
                this.state.userData = result.data[0],
                () => console.log(this.state.userData)
            );
        })
            .catch(err => {
                console.log(err);
            });
    };

    uploadPhoto  = async imgFile  => {
        var formData = new FormData();
        formData.append("files", imgFile);
        console.log(formData);
        //NEED CHANGE
        formData.append("id", this.userId);
        await axios
          .post("/api/post/updateprofilepic", formData)
          .then(result => {
            if (result.status == 200) {
              console.log("Profile image upload=>" + result.data.image);
              this.setState(
                this.state.userData.photo_link = result.data.image,
                () => console.log(this.state.userData)
            );
            } else {
              console.log(result);
            }
          })
          .catch(err => {
            console.log(err);
            // window.location.replace("/error500");
          });
    };

    updateProfile = e => {
        e.preventDefault();
    };

    updateProfile = e => {
        e.preventDefault();
        this.updateProfileRequest();
      };
    
      updateProfileRequest = async () => {
      //NEED CHANGE
        const data = {
          id: this.userId,
          name: this.state.userData.name,
          lastname: this.state.userData.lastname,
          date_of_birth: this.state.userData.date_of_birth,
          email: this.state.userData.email,
          phone: this.state.userData.phone,
          photo_link: this.state.userData.photo_link,
          description: this.state.userData.description
        };
        await axios
          .post("/api/post/updateprofile", data)
          .then(result => {
            console.log(result.status);
          })
          .catch(err => {
            console.log(err);
          });
      };

    render() {
        return (
            <Container className={styles.postContainer}>
                <div className={styles.pageHeader}>
                    <h2 className={styles.pageTitle}>Profile Details</h2>
                </div>
                <Form className={`${styles.postForm} boxShadow`} onSubmit={this.handleSubmit}>
                    <Row>
                        <Col sm='4' className={styles.btnImgWrapper}>
                            <img src={
                                this.state.userData.photo_link === null || this.state.userData.photo_link === ""
                                ? "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                : this.state.userData.photo_link
                                }  className={styles.profileThumb} alt="avatar" />
                           
                            <span className={styles.btnFile}>
                                <Input type="file" name="fileLoader" id="fileLoader" onChange={e => this.uploadPhoto(e.target.files[0])} />
                            </span>
                        </Col>
                        <Col sm={{size: 4}}>
                            <FormGroup>
                                <Label>First name:</Label>
                                <Input type="text" placeholder="First Name" value={this.state.userData.name}  
                                    onChange={e => (e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col sm={{size: 4}}>
                            <FormGroup>
                                <Label for="lastname">Last Name</Label>
                                <Input type="text" placeholder="Last Name" value={this.state.userData.lastname} 
                                    />
                            </FormGroup>
                        </Col>
                        <Col sm={{size: 4}}>
                            <FormGroup>
                                <Label for="lastname">Email</Label>
                                <Input type="text" value={this.state.userData.email} disabled 
                                    />
                            </FormGroup>
                        </Col>
                        <Col sm={{size: 4}}>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" value="" onChange={e => (e.target.value)} placeholder="Password"
                                    />
                            </FormGroup>
                        </Col>
                        <Col sm={{size: 4}}>
                            <FormGroup>
                                <Label for="confPassword">Confirm Password</Label>
                                <Input type="password" value="" onChange={e => (e.target.value)} placeholder="Confirm Password"
                                    />
                            </FormGroup>
                        </Col>
                    
                        <Col sm={{ size: 4, offset: 4 }} className='actionBtnWrapper'>
                            <Button type="submit" value="Submit" className={`${styles.submitBtn} defaultBtn`}>Update Profile</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}

export default withRouter(ProfileView);