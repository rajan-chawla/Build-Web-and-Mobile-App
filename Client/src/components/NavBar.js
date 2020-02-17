import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";

import styles from './componentStyles/NavBar.module.css';
import './componentStyles/global.scss';
import 'font-awesome/css/font-awesome.min.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
	InputGroup,
	InputGroupAddon,
	InputGroupButtonDropdown,
	Input,
	Button
}
from 'reactstrap';


class NavBar extends Component {
	
    constructor(props) {
        super(props);
	
		if (window.sessionStorage.getItem("userid") == null && window.localStorage.getItem("userid") !=null) {
			window.sessionStorage.setItem('userid', window.localStorage.getItem("userid"));
			window.sessionStorage.setItem('userrole', window.localStorage.getItem("userrole"));
		}

		this.userId = window.sessionStorage.getItem('userid');
		this.userRole = window.sessionStorage.getItem('userrole'); // 1 buyer, 2 seller, 3 admin

        this.state = {
			dropdownOpen: false,
			searchCategories: false,
			categories: ['All'],
			searchCategory: 0,
			searchTerm: ''
        };

		this.toggleDropDown = this.toggleDropDown.bind(this);
		this.termChange = this.termChange.bind(this);
		this.categoryChange = this.categoryChange.bind(this);
		this.searchClick = this.searchClick.bind(this);
		this.keyPressChecker = this.keyPressChecker.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
    }

	toggleDropDown(e) {
		e.stopPropagation();

		let prevState = this.state.dropdownOpen;
		this.setState({
			dropdownOpen: !prevState
		})
	}

	getCategories() {
		axios.get('/api/get/categories').then(res => {
			for (let i = 0; i < res.data.length; i++) {
				this.setState(
					(state) => ({ categories: [...this.state.categories, res.data[i].name] }),
					() => console.log(this.state.categories)
				);
			}
		});
	}

	categoryChange(event) {

    	this.setState({
			searchCategory: event.target.value
		})
	};
	
	termChange(event) {

		this.setState({
			searchTerm: event.target.value
		})
	}

	searchClick(event) {
		window.location.reload(false);
    	window.location.replace(`/search/term=${this.state.searchTerm}/category=${this.state.searchCategory}`);
	}

	keyPressChecker(event) {
		if (event.key === 'Enter')
			this.searchClick();
	}

	goToProfile() {
		window.location.reload(false);
		window.location.replace(`/profile/public/id=${window.sessionStorage.getItem("userid")}`);
	}

	handleLogout() {
		console.log("User logged out");
		window.sessionStorage.clear();
		window.localStorage.clear();
    	window.location.reload(false);
    	window.location.replace("/");
	}

	componentDidMount() {
		console.log('test', window.sessionStorage.getItem('userrole'))
		this.getCategories();
	}
    
            
render() {
    return (
        <div>
          	<Navbar expand="md" className={`${styles.headerBody} boxShadow`}>
            	<NavbarBrand className={`${styles.navText}`} href="/">SampleME</NavbarBrand>
            	<NavbarToggler/>
				<div className={`${styles.searchBar} ml-auto mr-auto`}>
					<InputGroup className={styles.searchFormContainer}>
						<Input className={`${styles.categoriesDropdown}`} type="select" name="select" id="34t4f" onChange={this.categoryChange}>
							{this.state.categories.map((value, index) => {
                                return <option key={index} value={index}> 
                                			{value} </option>
                            })}
						</Input>
						<Input type="text" name="text" id="et3t43" onChange={this.termChange} onKeyPress={this.keyPressChecker}/>
						<InputGroupAddon addonType="prepend">
							<Button className={styles.searchButton} onClick={this.searchClick}>
								<i className="fa fa-search"></i>
							</Button>
						</InputGroupAddon>
					</InputGroup>
				</div>
            	<Collapse navbar>
              		<Nav className={`${styles.navMenu} ml-auto`} navbar>
						{this.userId === null &&
							<NavItem inNavbar>
								<NavLink className={`${styles.navText}`} href="/login">
									<i class="fa fa-sign-in"></i>&nbsp;Log in
								</NavLink>
							</NavItem> 
						}

						{this.userId === null &&
							<NavItem inNavbar>
								<NavLink className={`${styles.navText}`} href="/signup">
									<i className="fa fa-user-plus"></i>&nbsp;Register
								</NavLink>
							</NavItem>
						}  

					  	{this.userRole === '1' && 
							<NavItem>
								<NavLink className={`${styles.navText}`} href="/cart/">
									<i className="fa fa-shopping-cart"></i>&nbsp;Shopping Cart
								</NavLink>
							</NavItem>
						}
					
						{this.userId !== null &&
							<UncontrolledDropdown right inNavbar>
								<DropdownToggle className={`${styles.navText}`} nav caret>
									<i className="fa fa-user-circle"></i>&nbsp;Account
								</DropdownToggle>
								<DropdownMenu right>
									{(this.userRole === '2' || this.userRole === '1') &&
									<DropdownItem href="/profile/dashboard">
										<i className="fa fa-tachometer"></i>&nbsp;Dashboard
									</DropdownItem>}
									<DropdownItem href="/profile/edit">
										<i className="fa fa-edit"></i>&nbsp;Edit Profile
									</DropdownItem>
									<DropdownItem onClick={this.goToProfile}>
										<i className="fa fa-user-circle"></i>&nbsp;Public Profile
									</DropdownItem>
									{this.userRole === '2' && 
									<DropdownItem href="/profile/post">
										<i className="fa fa-plus-circle"></i>&nbsp;Post Item
									</DropdownItem>}
									{this.userRole === '2' && 
									<DropdownItem href="/profile/feedbacks">
										<i className="fa fa-comment"></i>&nbsp;Feedbacks
									</DropdownItem>}
									<DropdownItem divider />
									<DropdownItem onClick={this.handleLogout}>
										<i className="fa fa-sign-out" ></i>&nbsp;Log Out
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						}
              		</Nav>
					
            </Collapse>
          </Navbar>
        </div>
      );
  }
};

export default withRouter(NavBar);
