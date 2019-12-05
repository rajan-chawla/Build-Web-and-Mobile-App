var express = require("express");
var cartRoutes = express.Router();
var pool = require("./db");

cartRoutes.post("/api/post/addtocart", function(req, res){
 //Check if the user is loggedin or not
         //- Logged in : 
              //Check if the items exist in cart or not
                //If there is no item (count is 0)
                    //Check if previous feedback is filled or not
                     //If filled
                         //Add items to cart and send 200 to front end
                         //else 
                         //Send a response code 400 to frontend that feedback is not filled for the previous product.
                // Send response stating that at maximum 1 item can be ordered at 1 time.
 //- Not logged in: Tell frontend to redirect it to signup/login component with 302 response code
});


cartRoutes.get("/api/get/getcartitems", function(req, res){
    // The request will contain user id from frontend.
    // Based on the user id make an SQL query to get all cart items specific to that user.
    // Returns the items as json response to frontend.
});

cartRoutes.post("/api/post/checkout", function(req, res){


});

module.exports = cartRoutes;