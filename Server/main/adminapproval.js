var express = require("express");
var approveProductRoutes = express.Router();
var approveUserRoutes = express.Router();
var pool = require("./db");
var cloud = require("./config/cloudinaryConfig");
var upload = require("./config/multer");

approveProductRoutes.get("/api/get/notapprovedproducts", function(req, res, next) {
  console.log("request param is:" + req.query.term);
  const query =
    "SELECT p.*, p.name as name, p.description as description FROM hsfuldadb.product p WHERE p.is_validated = 0 or p.is_validated != 1";
  pool.query(query, (q_err, q_res) => {
    console.log("response", q_res);
    if (q_err != null) {
      console.log(q_err);
      res.status(401).json(q_err);
    } else {
      console.log(JSON.stringify(q_res, null, 2));
      res.status(200).json(q_res);
    }
  });
});

approveProductRoutes.post("/api/post/validateproduct", function(req, res, next) {
  console.log("request param is:" + req.body.search);
  var productId = req.body.params.productId;

  const query =
    "UPDATE hsfuldadb.product SET is_validated = 1 WHERE id = '" + productId +"'";
  pool.query(query, (q_err, q_res) => {
    if (q_err != null) {
      console.log(q_err);
      res.status(401).json(q_err);
    }
    if (q_res.length < 1) {
      return res.status(404).json({ message: "products not found" });
     } else {
      console.log(JSON.stringify(q_res, null, 2));
      res.send({
        code: 200,
        success: "product approved"
      });
    }
    
  });
});

approveProductRoutes.post("/api/post/rejectproduct", function(req, res, next) {
    console.log("request param is:" + req.body.search);
    var product_id = req.body.params.productId;
  
    const query =
      "DELETE FROM hsfuldadb.product WHERE is_validated = 0 AND id = '" + productId +"'";
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

  approveProductRoutes.get("/api/get/notverifiedassellers", function(req, res, next) {
    console.log("request param is:" + req.query.term);
    const query =
      "SELECT u.*, u.email as email, u.name as name, u.lastname as lastname, u.phone as phone, u.description as description from hsfuldadb.user u where is_verified=0";
    pool.query(query, (q_err, q_res) => {
      console.log("response", q_res);
      if (q_err != null) {
        console.log(q_err);
        res.status(401).json(q_err);
      } else {
        console.log(JSON.stringify(q_res, null, 2));
        res.status(200).json(q_res);
      }
    });
  });

  approveUserRoutes.post("/api/post/grantsellerrole", function(req, res, next) {
    console.log("request param is:" + req.body.search);
    var userId = req.body.params.userId;
  
    const query =
      "UPDATE hsfuldadb.user SET is_verified = 1 AND is_validates = 1 WHERE id = '" + userId +"'";
    pool.query(query, (q_err, q_res) => {
      if (q_err != null) {
        console.log(q_err);
        res.status(401).json(q_err);
      }
      if (q_res.length < 1) {
        return res.status(404).json({ message: "products not found" });
       } else {
        console.log(JSON.stringify(q_res, null, 2));
        res.send({
          code: 200,
          success: "product approved"
        });
      }
      
    });
  });


module.exports = approveProductRoutes, approveUserRoutes;