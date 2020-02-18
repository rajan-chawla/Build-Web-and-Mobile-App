// Express. js is a Node js web application server framework
// Pool is used to create a database connection

var express = require("express");
var router = express.Router();
var authcheck = require("./authcheck");
var user = require("./user");
var product = require("./product");
var cart = require("./cart");
var review = require('./review');

router.use('/', authcheck);
router.use("/", user);
router.use("/", product);
router.use("/", cart);
router.use('/', review);

module.exports = router;