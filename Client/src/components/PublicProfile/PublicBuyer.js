import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from '.././componentStyles/PublicProfile.module.css';
import 'font-awesome/css/font-awesome.min.css';

import {
    Row,
    Col
}
from 'reactstrap';

class PublicSeller extends Component {
    constructor(props) {
        super(props);
    }
            
render() {
    return (
      
            <Row>
                <Col sm='3' className={`${styles.buyer} ${styles.affix} boxShadow`}>
                    <div className={styles.profileWrapper}>
                        <img className={styles.image} src={this.props.pic} alt='Profile Picture'/>
                        <h3 className={styles.profileName}>{this.props.name} {this.props.lastname}</h3>
                        <h6 className={styles.profileInfoLine}><i className='fa fa-envelope'></i> {this.props.email}</h6>
                        <h6 className={styles.profileInfoLine}><i className='fa fa-mobile'></i> {this.props.phone}</h6> 
                        <p className={styles.profileDesc}>{this.props.desc}</p>
                    </div>
                </Col>
            </Row>
   
    )
  }
}

export default withRouter(PublicSeller);