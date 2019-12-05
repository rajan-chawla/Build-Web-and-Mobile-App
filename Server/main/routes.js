var express = require("express");
var router = express.Router();
var pool = require("./db");
var authcheck = require("./authcheck");

router.get("/api/get/allproducts", function(req, res, next) {
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

router.use("/", authcheck);
module.exports = router;