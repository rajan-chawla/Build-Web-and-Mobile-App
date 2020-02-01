var express = require("express");
var productRoutes = express.Router();
var pool = require("./db");
var cloud = require("./config/cloudinaryConfig");
var upload = require("./config/multer");

productRoutes.get("/api/get/productlist", function(req, res, next) {
  console.log("request param is:" + req.body.search);
  const query =
    "select p.*,u.name as seller_name, c.name as category_name from hsfuldadb.product p join hsfuldadb.user u on p.seller_id = u.id join hsfuldadb.category c on c.id = p.category_id where p.buyer_id is null";
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

productRoutes.post("/api/get/productlistbyid", function(req, res, next) {
  console.log("request param is:" + req.body.search);
  var product_id = req.body.product_id;

  const query =
    "select p.*,u.name as seller_name, c.name as category_name from hsfuldadb.product p join hsfuldadb.user u on p.seller_id = u.id join hsfuldadb.category c on c.id = p.category_id where p.id='" +
    product_id +
    "'";
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

//GET /products
productRoutes.get("/api/get/allproducts", function(req, res, next) {
  console.log("request param is:" + req.query.term + "/" + req.query.type);
  var query = "";
  if (req.query.type === "Name") {
    query =
      "select p.*,u.name as seller_name, c.name as category_name from product p join user u on p.seller_id = u.id join category c on c.id = p.category_id WHERE p.name LIKE '%" +
      req.query.term +
      "%' and p.buyer_id is null";
  } else if (req.query.type === "Category") {
    query =
      "select p.*,u.name as seller_name, c.name as category_name from product p join user u on p.seller_id = u.id join category c on c.id = p.category_id WHERE c.name LIKE '%" +
      req.query.term +
      "%' and p.buyer_id is null";
  } else {
    query =
      "select p.*,u.name as seller_name, c.name as category_name from product p join user u on p.seller_id = u.id join category c on c.id = p.category_id WHERE u.name LIKE '%" +
      req.query.term +
      "%' and p.buyer_id is null";
  }
  pool.query(query, (q_err, q_res) => {
    console.log("respOnse:", q_res);
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
productRoutes.get("/api/get/productofuser", function(req, res, next) {
  var id = req.query.id;
  // Category seller name, category name
  const query = `select p.*,u.name as seller_name, c.name as category_name from product p join user u on p.seller_id = u.id join category c on c.id = p.category_id WHERE seller_id=${id}`;
  pool.query(query, (q_err, q_res) => {
    console.log(q_res);
    if (q_err) {
      console.log(q_err);
      res.status(401).json(q_err);
    }
    if (q_res.length < 1) {
      return res.status(404).json({ message: "user not found" });
    } else {
      console.log(JSON.stringify(q_res, null, 2));
      res.status(200).json(q_res);
    }
  });
});

//GET Product by category ID
productRoutes.get("/api/get/productsbycatergory", function(req, res, next) {
  var category_id = req.body.category_id;
  const query =
    "select p.*,u.name as seller_name, c.name as category_name from product p join  user u on p.seller_id = u.id join category c on c.id = p.category_id where category_id= '" +
    category_id +
    "'";
  pool.query(query, (q_err, q_res) => {
    if (q_err) {
      console.log(q_err);
      res.status(401).json(q_err);
    }
    if (q_res.length < 1) {
      return res.status(404).json({ message: "products not found" });
    } else {
      console.log(JSON.stringify(q_res, null, 2));
      res.status(200).json(q_res);
    }
  });
});

//Get Categories
productRoutes.get("/api/get/categories", function(req, res, next) {
  const query = "SELECT * FROM category";
  pool.query(query, (q_err, q_res) => {
    if (q_err) {
      console.log(q_err);
      res.status(401).json(q_err);
    }
    if (q_res.length < 1) {
      return res
        .status(404)
        .json({ message: "error occurred on getting categories." });
    } else {
      console.log(JSON.stringify(q_res, null, 2));
      res.status(200).json(q_res);
    }
  });
});

//GET Product by product ID
productRoutes.get("/api/get/productbyid", function(req, res, next) {
  console.log('Request param is: ' + req.query.id)
  var id = req.query.id;
  const query = `select p.*,u.name as seller_name, c.name as category_name from hsfuldadb.product p join hsfuldadb.user u on p.seller_id = u.id join hsfuldadb.category c on c.id = p.category_id where p.id =${id}`;
  pool.query(query, (q_err, q_res) => {
    if (q_err) {
      console.log(q_err);
      res.status(401).json(q_err);
    }
    if (q_res.length < 1) {
      return res.status(404).json({ message: "products not found" });
    } else {
      console.log(JSON.stringify(q_res, null, 2));
      res.status(200).json(q_res);
    }
  });
});
//add Product for a seller
productRoutes.post("/api/post/addproduct", function(req, res, next) {
  var description = req.body.description;
  var name = req.body.name;
  var picture_link = req.body.picture_link;
  var price = req.body.price;
  var seller_id = req.body.seller_id;
  var category_id = req.body.category_id;
  const query =
    "INSERT INTO `hsfuldadb`.`product` (added_date,description,name, picture_link,price,seller_id, category_id) VALUES (CURRENT_TIMESTAMP, '" +
    description +
    "', '" +
    name +
    "', '" +
    picture_link +
    "' , " +
    price +
    "," +
    seller_id +
    "," +
    category_id +
    ")";
  pool.query(query, (q_err, q_res) => {
    if (q_err) {
      console.log(q_err);
      res.status(401).json(q_err);
    }
    if (q_res.length < 1) {
      return res.status(404).json({ message: "products not found" });
    } else {
      console.log(JSON.stringify(q_res, null, 2));
      res.send({
        code: 200,
        success: "product added"
      });
    }
  });
});

productRoutes.post("/api/post/uploadpic", upload.any(), function(req, res) {
  var cloudImage = req.files[0].path;
  try {
    cloud.uploads(cloudImage).then(result => {
      res
        .status(200)
        .json({ message: "image uploaded successfully", image: result.url });
    });
  } catch (execptions) {
    res.status(404).json({ message: "Could not upload image" });
  }
});

productRoutes.post("/api/post/editproduct", function(req, res, next) {
  var id = req.body.id;
  var description = req.body.description;
  var name = req.body.name;
  var picture_link =
    req.body.picture_link === null ? "" : req.body.picture_link;
  var price = req.body.price;
  var catid = req.body.catid;
  const query = `UPDATE product SET description='${description}',name='${name}', picture_link='${picture_link}',price=${price},category_id=${catid},is_validated=0 WHERE id=${id}`;
  pool.query(query, (q_err, q_res) => {
    if (q_err) {
      console.log(q_err);
      res.status(401).json(q_err);
    }
    if (q_res.length < 1) {
      return res.status(404).json({ message: "products not found" });
    } else {
      console.log(JSON.stringify(q_res, null, 2));
      res.send({
        code: 200,
        success: "product updated"
      });
    }
  });
});

productRoutes.post("/api/post/deleteproduct", function(req, res, next) {
  console.log("request param is:", req.body.pid);
  const query = `Delete  FROM product WHERE id=${req.body.pid}`;
  pool.query(query, (q_err, q_res) => {
    if (q_err != null) {
      console.log(q_err);
      res.status(401).json(q_err);
    } else {
      console.log(JSON.stringify(q_res, null, 2));
      q_res.code = 200;
      res.status(200).json(q_res);
    }
  });
});

module.exports = productRoutes;