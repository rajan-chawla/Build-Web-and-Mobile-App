var express = require("express");
var productRoutes = express.Router();
var pool = require("./db");

//GET /products
productRoutes.get("/api/get/allproducts", function(req, res, next) {
    console.log("request param is:" + req.query.term);
    const query =
      "SELECT * FROM `BwmaDb`.`product` WHERE Title LIKE '%" +
      req.query.term +
      "%'";
    pool.query(query, (q_err, q_res) => {
      if (q_err != null) {
        console.log(q_err);
        res.status(401).json(q_err);
      } else {
        console.log(JSON.stringify(q_res, null, 2));
        res.status(200).json(q_res);
      }
    });
  });

//GET Product by user ID
productRoutes.get('/api/get/productofuser', function (req, res, next) {
    console.log("request param is:" + req.query.term);
    const query = ""; // Write a query to get the requested product from the table
    pool.query(query, (q_err, q_res) => {
        if (q_err) {
            console.log(q_err);
            res.status(401).json(q_err);
        }
        if (products.length < 1) {
            return res.status(404).json({ message: "products not found" })
        }
        else{
            // Add a condition to show all matched products.
            res.json({ products: products })
        }
        
    });
});

//GET Product by category ID
productRoutes.get('/api/get/productsbycatergory', function (req, res, next) {
    console.log("request param is:" + req.query.term);
    const query = ""; // Write a query to get the requested product from the table with specific to the category
    pool.query(query, (q_err, q_res) => {
        if (q_err) {
            console.log(q_err);
            res.status(401).json(q_err);
        }
        if (products.length < 1) {
            return res.status(404).json({ message: "products not found" })
        }
        else{
            // Add a condition to show all matched products specific to a cateory id
            res.json({ products: products })
        }
        
    });
});

module.exports = productRoutes;