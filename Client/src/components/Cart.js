import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import "../css/checkout.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buyed:false
    };

  }
  messagehandle(e)
  {
    this.setState({buyed:true});
    console.log("buy item ",this.buyed)

  }
  render() {

    if (
      // this.props.products.cartItems.length == "undefined" ||
      // this.props.products.cartItems.length == 0
        this.props.products.purchased===true
    ) {
      console.log("exec");
      return <Redirect to="/purchase" />;
    } else {
     
      return (
        <div className="container">
          {this.props.products.cartItems.length > 0 ? (
            <table id="cart" className="table table-hover table-condensed">
              <thead>
                <tr>
                  <th style={{ width: 50 }}>Product</th>
                  <th style={{ width: 40 }}>Price</th>
                  <th style={{ width: 8 }}></th>
                  <th style={{ width: 22 }} className="text-center">
                  </th>
                  <th style={{ width: 10 }}></th>
                </tr>
              </thead>
              <tbody>
                {this.props.products.cartItems.map((product, index) => (
                  <tr key={index}>
                    <td data-th="Product">
                      <div className="row">
                        <div className="col-sm-2 hidden-xs">
                          {console.log("pictur",product.picture_link)}
                          <img
                            src={
                              product.picture_link === null ||
                              product.picture_link === "" ||
                              product.picture_link === "null"
                                ? "https://icon-library.net//images/product-icon-png/product-icon-png-29.jpg"
                                : product.picture_link
                            }
                            alt={product.name}
                            className="img-responsive"
                            style={{ maxHeight: "100" }}
                          />
                        </div>
                        <div className="col-sm-10">
                          <h4 className="nomargin">{product.name}</h4>
                          <p>{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td data-th="Price">{product.price} €</td>
                    <td data-th="Quantity">
                      {/*<input*/}
                      {/*  type="number"*/}
                      {/*  onChange={e => {*/}
                      {/*    this.props.quantity(e, product);*/}
                      {/*  }}*/}
                      {/*  className="form-control text-center"*/}
                      {/*  value={product.quantity}*/}
                      {/*/>*/}
                    </td>
                    <td data-th="Subtotal" className="text-center">
                      {/*{product.price * product.quantity} €*/}
                    </td>
                    <td className="actions" data-th="">
                      <button
                        onClick={
                          window.sessionStorage.getItem("userid") !== null
                            ? e => {
                                this.props.removeCartitemDb(product.id);
                              }
                            : this.props.removeCartItem.bind(this, product.id)
                        }
                        className="btn btn-danger btn-sm"
                      >
                        <i className="fa fa-trash-o"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="visible-xs">
                  <td colSpan="2" className="hidden-xs"></td>
                  <td colSpan="2" className="hidden-xs"></td>
                  <td className="text-right">
                    <strong>
                      Total{" "}
                      {this.props.products.cartItems.reduce(
                        (price, addprice) => price + addprice.price,
                        0
                      )}{" "}
                      €
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="/" className="btn btn-secondary">
                      <i className="fa fa-angle-left"></i> Continue Shopping
                    </Link>
                  </td>
                  <td colSpan="2" className="hidden-xs"></td>
                  <td className="hidden-xs text-center"></td>
                  <td>
                    {window.sessionStorage.getItem("userid") !== null ? (
                        <button
                            onClick={
                              e => {
                               const buy= this.props.buyItem();
                              }
                            }
                            className="btn btn-primary btn-block"
                        >
                          Buy Now <i className="fa fa-angle-right"></i>
                        </button> ): (<Link to={{pathname:'/login',fromCart:'cart'}} className="btn btn-primary btn-block" >{"Buy Now"}</Link> )}
                  </td>
                </tr>
              </tfoot>
            </table>
          )
          : (<div className="alert alert-primary" role="alert">
            Your cart is empty!
          </div>)
          }
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    products: state.getProductReducer
  };
};
function removeFromItem(product_id, dispatch) {
  return axios
    .post("/api/post/deleteitemincart", {
      user_id: window.sessionStorage.getItem("userid"),
      product_id: product_id
    })
    .then(response => {
      if (response.data.code == 200) {
        dispatch({
          type: "DELETE_FROM_CART",
          payload: product_id
        });
      }
    });
}
function buyItem(userID, dispatch) {
  // console.log("USERID:",userID)
  return axios
    .post("/api/post/buy_item", {
      userID: window.sessionStorage.getItem("userid")
    })
    .then(response => {
      if (response.data.code == 200) {
        dispatch({type: "BUY_PRODUCT",payload: true})
      }
    });
}

const mapDispatchToProps = dispatch => {
  return {
    removeCartitemDb: product_id => {
      removeFromItem(product_id, dispatch);
    },

    removeCartItem: product_id => {
      dispatch({
        type: "DELETE_FROM_CART",
        payload: product_id
      });
    },
    // quantity: (event, product) => {
    //   // console.log(product);
    //
    //   dispatch({
    //     type: "QUANTITY",
    //     payload: product,
    //     quantity: event.target.value
    //   });
    // },
    buyItem: () => {
      let userID = window.sessionStorage.getItem("userid");
      buyItem(userID,dispatch);
      // console.log(product);


    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
