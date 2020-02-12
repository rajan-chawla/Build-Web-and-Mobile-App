import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import './App.css';
import Product from "./components/Product";
import SearchResults from "./components/SearchResults";
import ProfileView from "./components/ProfileView";
import Contactus from "./components/Contactus";
import BuyerView from "./components/BuyerView";
import Search from "./components/Search";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import User from "./components/User";
import UserList from "./components/admin/UserList";
import ProductList from "./components/admin/ProductList";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import NotFound from "./components/NotFound";
import UserInfo from "./components/UserInfo";
import Error5oo from "./components/Error500";
import Purchase from "./components/Purchase";
import buyerProfile from "./components/buyerProfile";
import buyerOrderHistory from "./components/buyerOrderHistory";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import ReactGA from "react-ga";
import GA from "./utils/GoogleAnalytics";
import { Provider } from "react-redux";
import store from "./store/store";
import { HeaderProvider } from "./components/HeaderContext";
import PublicProfile from "./components/PublicProfile/PublicProfile";
import SellerFeedbacks from "./components/SellerFeedbacks";
import PostItem from "./components/PostItem";
import ProductView from "./components/ProductView";
import Dashboard from "./components/Dashboard/Dashboard";
import CartView from "./components/CartView";

class App extends Component {
  render() {
    return (
  <Provider store={store}>
    <Router>
      {GA.init() && <GA.RouteTracker />}
      <div id="wrap">
        <HeaderProvider>
          <div id="content" style={{ paddingBottom: "100px" }}>
            <Header />
            <Switch>
              <Route path="/test" component={buyerOrderHistory} />
              <Route path="/product/id=:id" component = {ProductView} />
              <Route path="/search/term=:term?/category=:category?" component = {SearchResults} />
              <Route path="/publicprofile" component = {ProfileView} />
              <Route path="/contactus" component = {Contactus} />
              <Route path="/profile/edit" component = {ProfileView} />
              <Route path="/buyerview" component = {BuyerView} />
              <Route exact path="/" component={Home} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/detail" component={ProductDetails} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/login" component={SignIn} />
              <Route exact path="/purchase" component={Purchase} />
              <Route path="/signup" component={SignUp} />
              <Route exact path="/user" component={User} />
              <Route exact path="/adminUsers" component={UserList} />
              <Route exact path="/adminProducts" component={ProductList} />
              <Route exact path="/userInfo" component={UserInfo} />
              <Route path="/error500" component={Error5oo} />
              <Route path="/profile/public/id=:id" component = {PublicProfile} />
              <Route path="/profile/dashboard" component = {Dashboard} />
              <Route path="/profile/feedbacks" component = {SellerFeedbacks} />
              <Route path="/profile/post" component = {PostItem} />
              <Route path="/cartview" component = {CartView} />
              <Route path="*" component={NotFound} />
              </Switch>
          </div>
          <Footer />
        </HeaderProvider>
      </div>
    </Router>
  </Provider>
  );
  }
}

function initializeReactGA() {
  ReactGA.initialize("UA-154627567-1");
  ReactGA.pageview("/");
}

//ReactDOM.render(Contents, document.getElementById("root"));

export default App;