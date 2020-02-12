var express = require("express");
var transactionRoutes = express.Router();
var pool = require("./db");

transactionRoutes.get("/api/get/getTransactions", function(req, res, next) {
  var userId = req.query.id;
  const query =
    "SELECT  p.name as product_name, price, u.name as seller_name, sold_date FROM hsfuldadb.product p join hsfuldadb.user u on u.id = p.seller_id where buyer_id = " + userId;
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

  
  // add new transaction row to DB
  transactionRoutes.post("/api/post/transaction", function (req, res) {

    let userId = req.body.user_id;
    let productId = req.body.product_id
    console.log(req.body);
    console.log({userId})

    const q = `INSERT INTO transactions (product_id, user_id, sold_date) VALUES ("${productId}", "${userId}", CURRENT_TIMESTAMP)`;

    pool.query(q, (q_err, q_res) => {
      if (q_err) {
        console.log('ERROR: ', q_err);
        res.send({
          code: 401,
          success: "Error registering transaction!"
        });
      } else {
        console.log('SUCCESS: NEW ROW INSERTED');
        res.send({
          code: 200,
          success: "Transaction added!"
        });
      }
  })
})

module.exports = transactionRoutes;