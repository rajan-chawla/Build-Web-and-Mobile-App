var express = require("express");
var router = express.Router();
var pool = require("./db");

router.post("/api/post/login", function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var query = "SELECT * FROM `BwmaDb`.`user` WHERE email = '" + email + "'";
    pool.query(query, function (q_err, q_res) {
        if (q_err != null) {
            console.log("error ocurred", q_err);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            console.log(JSON.stringify(q_res, null, 2));
            if (q_res.length > 0) {
                console.log("Password - ", q_res[0].password, password);
                if (q_res[0].password == password) {
                    res.send({
                        "code": 200,
                        "success": "login sucessfull"
                    })
                }
                else {
                    res.send({
                        "code": 204,
                        "success": "Email and password does not match"
                    })
                }
            } else {
                res.send({
                    "code": 204,
                    "success": "Email does not exist"
                });
            }
        }
    });
});

router.post("/api/post/signup", function (req, res) {
    var firstname = req.body.name;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    var dob = req.body.date_of_birth;
    var phone = req.body.phone;
    var query = "SELECT email FROM `BwmaDb`.`user` WHERE email = '" + email + "'";
    pool.query(query, function (q_err, q_res) {
        if (q_err != null) {
            console.log("error ocurred", q_err);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            if (q_res.length > 0) {
                console.log("email - ", q_res[0].email, req.body.email);
                res.send({
                    "code": 204,
                    "success": "Account exist with this Email. Please login."
                });
            } else {
                const query2 = "INSERT INTO `BwmaDb`.`user` (name, lastname, email,password, date_of_birth, phone) VALUES ('"
                    + firstname + "', '" + lastname + "', '" + email + "', '" + password + "', '" + dob + "' , '" + phone + "')";
                pool.query(query2, (q_err, q_res) => {
                    if (q_err != null) {
                        console.log("error ocurred", q_err);
                        res.send({
                            "code": 400,
                            "failed": "error ocurred in creating user"
                        })
                    } else {
                        res.send({
                            "code": 200,
                            "success": "User signup sucessfull"
                        })
                    }
                });
            }
        }

    });

});

module.exports = router;