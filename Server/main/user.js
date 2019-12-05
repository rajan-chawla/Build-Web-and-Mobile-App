var express = require("express");
var userRoutes = express.Router();
var pool = require("./db");

userRoutes.get("/api/get/profile", function(req, res){
// send profile details of the user
});

userRoutes.post("/api/get/updateprofile", function(req, res){
//update profile details of the user
});

userRoutes.post("/api/get/deleteprofile", function(req, res){
    //delete profile details of the user
});

module.exports = userRoutes;