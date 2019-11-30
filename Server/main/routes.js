var express = require("express");
var router = express.Router();
var pool = require("./db");

router.get("/api/get/allproducts", function(req, res, next) {
  console.log("request param is:" + req.query.term);
  const query =
    "SELECT * FROM `hsfuldadb`.`Products` WHERE Title LIKE '%" +
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

module.exports = router;