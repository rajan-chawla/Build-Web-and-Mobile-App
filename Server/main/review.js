// Express. js is a Node js web application server framework
// Pool is used to create a database connection

var express = require("express");
var reviewRoutes = express.Router();
var pool = require("./db");

// get feedbacks (review + rating), from product ID.
reviewRoutes.get('/api/get/feedbacks', function (req, res, next) {
  console.log('Request body ID is: ', req.query.id);
  let product_id = req.query.id;
  const query = `SELECT review.*, user.name, user.lastname FROM review INNER JOIN user ON review.buyer_id=user.id WHERE Product_id = "${product_id}"`;
  pool.query(query, (q_err, q_res) => {
    if (q_err) {
      console.log(q_err);
      res.status(401).json(q_err);
    }
    if (q_res.length < -1) {
      return res
        .status(404)
        .json({ message: "error retreiving feedbacks." })
    } else {
      res.status(200).json(q_res);
    }
  })
});

reviewRoutes.get('/api/get/feedbacksCount', function (req, res, next) {
  let product_id = req.query.id;
  const query = `SELECT COUNT(*) AS count FROM review WHERE Product_id = "${product_id}"`;
  pool.query(query, (q_err, q_res) => {
    if (q_err) {
      console.log(q_err);
      res.status(401).json(q_err);
    }
    if (q_res.length < -1) {
      return res
        .status(404)
        .json({ message: "error retreiving feedback count." })
    } else {
      res.status(200).json(q_res);
    }
  })
})

reviewRoutes.get('/api/get/feedbackFromBuyerId', function (req, res, next) {
  let buyer_id = req.query.buyerId;
  let product_id = req.query.productId;
  console.log(buyer_id)
  const query = `SELECT * FROM review WHERE buyer_id = "${buyer_id}" AND Product_id = "${product_id}"`;
  pool.query(query, (q_err, q_res) => {
    if (q_err) {
      console.log(q_err);
      res.status(401).json(q_err);
    }
    if (q_res.length < 0) {
      return res
        .status(404)
        .json({ message: "error retreiving feedback count." })
    } else {
      res.status(200).json(q_res);
    }
  })
})

reviewRoutes.get('/api/get/feedbacksAvg', function (req, res, next) {
  let product_id = req.query.id;
  const query = `SELECT AVG(rate) AS average FROM review WHERE Product_id = "${product_id}"`;
  pool.query(query, (q_err, q_res) => {
    if (q_err) {
      console.log(q_err);
      res.status(401).json(q_err);
    }
    if (q_res.length < 1) {
      return res
        .status(404)
        .json({
          message: "error retreiving average."
        })
    } else {
      res.status(200).json(q_res);
    }
  })
})

reviewRoutes.post("/api/post/addFeedback", function (req, res, next) {

  console.log(req.body)
  var seller_id = req.body.seller_id;
  var buyer_id = req.body.buyer_id;
  var rating = req.body.rating;
  var product_id = req.body.product_id;
  var description = req.body.description;

  const query = `INSERT INTO review (seller_id, buyer_id, date, rate, Product_id, text) 
    VALUES ("${seller_id}", "${buyer_id}", CURRENT_TIMESTAMP, "${rating}", "${product_id}", "${description}")`

  pool.query(query, (q_err, q_res) => {
    console.log(q_res);
    if (q_err) {
      console.log(q_err);
      res.status(401).json(q_err);
    }
    if (q_res.length < 1) {
      return res.status(404).json({
        message: "feedback not posted"
      });
    } else {
      console.log(JSON.stringify(q_res, null, 2));
      res.send({
        code: 200,
        success: "feedback added"
      });
    }
  });
});


module.exports = reviewRoutes;