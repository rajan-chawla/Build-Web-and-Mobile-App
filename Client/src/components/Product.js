import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
/**
 * Material UI cards for showing brief information of
 * each product in home page
 */

class Product extends Component {

  constructor(props) {
    super(props);
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  async deleteProduct(product_id) {
    const params = { pid: product_id};
    console.log("Clicked " + product_id);
    await axios.post('/api/post/deleteproduct', params).then(response => {
      if (response.data.code == 200) {
        alert("Product deleted successfully");
        window.location.reload();
      }
  });
  }

  getShareOnTwitterText(product_id) {
    return `https://twitter.com/intent/tweet?text=Checkout%20this%20amazing%20product%20on%20SampleMe:&url=${window.location.href}/product/id=${product_id}&hashtags=sampleMe,bargainSale`
  }

  render() {
    const {
      product_id,
      product_name,
      product_img,
      product_description,
      product_category,
      product_price,
      product_seller_name,
      product_seller_id
    } = this.props;

    let del_icon;
    if (window.sessionStorage.getItem("userrole") == "3") {
      del_icon = <IconButton aria-label="delete" onClick={() => this.deleteProduct(product_id)}><DeleteIcon /></IconButton>
    }

    return (
      <div className="productContainer col-md-4 col-lg-3 d-flex align-items-stretch">

        <div className="product boxShadow">
          <Link to={{ pathname: "/product/id=" + product_id }} onClick={() => { this.props.productDetailID(product_id); }}>
            <div className="product-img">
              <img
                className="homeProdImg"
                src={
                  product_img === null ||
                    product_img === "" ||
                    product_img === "null"
                    ? "https://icon-library.net//images/product-icon-png/product-icon-png-29.jpg"
                    : product_img
                }
                style={{ maxHeight: "200px" }}
                alt="product_name"
              />

            </div>
          </Link>
          <div className="product-body">
            <h6 className="productTitle">
              {product_name}
            </h6>
            <h6 className="productPrice">
              €{product_price}
            </h6>
            <a href={this.getShareOnTwitterText(product_id)} className='twitterForHomepage'>
              <i className='fa fa-twitter'></i>
            </a>
          </div>

        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    productDetailID: product_id => {
      console.log(product_id);
      dispatch({
        type: "SET_PRODUCT_DETAIL_ID",
        payload: product_id
      });
    }
  };
};

export default connect(mapDispatchToProps, mapDispatchToProps)(Product);
