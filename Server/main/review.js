var express = require("express");
var reviewRoutes = express.Router();
var pool = require("./db");

// get feedbacks (review + rating), from product ID.
reviewRoutes.get('/api/get/feedbacks', function(req, res, next) {
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
        .json({ message: "error retreiving feedbacks." });
    } else {
      res.status(200).json(q_res);
    }
})
});





































module.exports = reviewRoutes;