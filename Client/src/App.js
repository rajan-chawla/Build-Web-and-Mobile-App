import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Foot from "./components/Foot";
import './App.css';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Product from "./components/Product";
import SearchResults from "./components/SearchResults";
import ProductMinified from "./components/ProductMinified";
import ProfileView from "./components/ProfileView";
import Cart from "./components/Cart";
import Contactus from "./components/Contactus";
import Resetpassword from "./components/Resetpassword";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/product/id=:id" component = {Product} />
              <Route path="/search/:input?/:category?" component = {SearchResults} />
              <Route path="/cart" component = {Cart} />
              <Route path="/Contactus" component = {Contactus} />
              <Route path="/Resetpassword" component = {Resetpassword} />
             <Route path="/publicprofile" component = {ProfileView} />
            </Switch>
          </div>
          <Foot />
        </Router>
      </div>
    );
  }
}

export default App;
