var express = require("express");
var userRoutes = express.Router();
var pool = require("./db");
var cloud = require("./config/cloudinaryConfig");
var upload = require("./config/multer");

userRoutes.get("/api/get/profile", function(req, res) {
  var id = req.query.id;
  const query =
    "Select email, name, lastname, DATE_FORMAT(date_of_birth,'%Y-%m-%d') AS date_of_birth, phone, description, photo_link, is_verified, is_validated, " +
    "(select count(*) from `H7j0c1CcvW`.`user_role` where user_id = id and role_id = 2) as isSeller," +
    "(select count(*) from `H7j0c1CcvW`.`user_role` where user_id = id and role_id = 3) as isAdmin from `H7j0c1CcvW`.`user` where id='" +
    id +
    "'";
  pool.query(query, (q_err, q_res) => {
    if (q_err) {
      console.log(q_err);
      res.status(401).json(q_err);
    }
    if (q_res.length < 1) {
      return res.status(404).json({ message: "User not found" });
    } else if (q_res.length == 1) {
      console.log(JSON.stringify(q_res, null, 2));
      res.status(200).json(q_res);
    }
  });
});

//update profile details of the user
userRoutes.post("/api/post/updateprofile", function(req, res) {
  var id = req.body.id;
  var name = req.body.name.toString() === "undefined" ? "" : req.body.name;
  var lastname =
    req.body.lastname.toString() === "undefined" ? "" : req.body.lastname;
  var email = req.body.email;
  var password = req.body.password;
  var phone = req.body.phone.toString() === "undefined" ? "" : req.body.phone;
  var description =
    req.body.description.toString() === "undefined" ? "" : req.body.description;
  var photo_link = req.body.photo_link;
  var date_of_birth = req.body.date_of_birth;
  if (password == "undefined" || password === "null") {
    var query = (query = `UPDATE user SET name='${name}',lastname='${lastname}',phone='${phone}',
    photo_link='${photo_link}',email='${email}',
    description='${description}',date_of_birth='${date_of_birth}' WHERE id=${id}`);
  } else {
    query = `UPDATE user SET name='${name}',lastname='${lastname}',phone='${phone}',
    photo_link='${photo_link}',email='${email}',
    description='${description}',date_of_birth='${date_of_birth}',password='${password}' WHERE id=${id}`;
  }

  pool.query(query, (q_err, q_res) => {
    if (q_err) {
      console.log(q_err);
      res.status(401).json(q_err);
    } else {
      console.log(JSON.stringify(q_res, null, 2));
      res.status(200).json({ message: "Details modified successfully" });
    }
  });
  // current information and the updated information is send to backend
  // records are updated in database
});

userRoutes.post("/api/get/deleteprofile", function(req, res) {
  //delete profile details of the user
});

userRoutes.post("/api/post/banUser", function(req, res, next) {
  var userId = req.body.params.userId;

  const query =
    "update H7j0c1CcvW.user set is_banned = 1 WHERE id = '" + userId + "'";
  pool.query(query, (q_err, q_res) => {
    if (q_err != null) {
      console.log("error ocurred", q_err);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      res.send({
        code: 200,
        success: "User is blocked"
      });
    }
  });
});

userRoutes.post("/api/post/unbanUser", function(req, res, next) {
  var userId = req.body.params.userId;

  const query =
    "update H7j0c1CcvW.user set is_banned = 0 WHERE id = '" + userId + "'";
  pool.query(query, (q_err, q_res) => {
    if (q_err != null) {
      console.log("error ocurred", q_err);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      res.send({
        code: 200,
        success: "User is blocked"
      });
    }
  });
});

userRoutes.post("/api/post/updateprofilepic", upload.any(), function(req, res) {
  var id = req.body.id;
  var cloudImage = req.files[0].path;
  console.log(id, cloudImage);
  cloud.uploads(cloudImage).then(result => {
    var query =
      "UPDATE `H7j0c1CcvW`.`user` SET photo_link='" +
      result.url +
      "' WHERE id =" +
      id;
    pool.query(query, (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        res.status(401).json(q_err);
      } else {
        console.log(JSON.stringify(q_res, null, 2));
        res.status(200).json({
          message: "Details modified successfully",
          image: result.url
        });
      }
    });
  });
});

userRoutes.post("/api/post/requestSeller", function(req, res, next) {
  var userId = req.body.userId;
  console.log(userId);
  const query =
    "update H7j0c1CcvW.user set is_seller_requested = 1 WHERE id = '" +
    userId +
    "'";
  pool.query(query, (q_err, q_res) => {
    if (q_err != null) {
      console.log("error ocurred", q_err);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      res.send({
        code: 200,
        success: "Seller is requested"
      });
    }
  });
});

userRoutes.get("/api/get/userInfo", function(req, res) {
  var id = req.query.id;
  const query =
    "Select id, email, name, lastname, phone, description, photo_link, CAST(is_banned AS SIGNED INTEGER) as is_banned, " +
    "(select count(*) from `H7j0c1CcvW`.`user_role` where user_id = id and role_id = 3) as isAdmin from `H7j0c1CcvW`.`user` where id = " +
    id;
  pool.query(query, (q_err, q_res) => {
    if (q_err) {
      console.log(q_err);
      res.status(401).json(q_err);
    }
    if (q_res.length < 1) {
      return res.status(404).json({ message: "User not found" });
    } else if (q_res.length == 1) {
      console.log(JSON.stringify(q_res, null, 2));
      res.status(200).json(q_res);
    }
  });
});

module.exports = userRoutes;