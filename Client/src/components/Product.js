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
      <div className="col-md-4 col-lg-3 d-flex align-items-stretch">

        <div className="product">
          <Link to={{ pathname: "/detail" }} onClick={() => { this.props.productDetailID(product_id); }}>
            <div className="product-img">
              <img
                src={
                  product_img === null ||
                    product_img === "" ||
                    product_img === "null"
                    ? "https://icon-library.net//images/product-icon-png/product-icon-png-29.jpg"
                    : product_img
                }
                style={{ maxHeight: "130px" }}
                alt="product_name"
              />

            </div>
          </Link>
          <div className="product-body">
            <Typography gutterBottom variant="h6" component="h6">
              {product_name}
            </Typography>
            <Typography className="product-category">
              {product_category}
            </Typography>
            <Typography gutterBottom variant="h6" component="h6">
              € {product_price}
            </Typography>
            <CardActions>
              <IconButton aria-label="add to favorites" color="secondary">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="add to cart" color="inherit" component={Link} to="/detail">
                <AddShoppingCartIcon />
              </IconButton>
              <IconButton aria-label="share" color="inherit">
                <ShareIcon />
              </IconButton>
              {del_icon}
            </CardActions>
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
