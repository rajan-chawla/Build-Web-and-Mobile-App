// Express. js is a Node js web application server framework
// Pool is used to create a database connection

var express = require("express");
var cartRoutes = express.Router();
var pool = require("./db");

cartRoutes.get("/api/get/userCartItems", function (req, res, next) {
    console.log("request parsdfadsfadam is:" + req.query.user_id);
    const user_id = req.query.user_id
    const userCart = "Select product.id,product.name,product.price,product.added_date,product.location,product.picture_link,product.buyer_id,product.sold_date,product.description,product.category_id,product.is_validated,product.seller_id from product JOIN cart_product on product.id=cart_product.product_id JOIN cart on cart.id=cart_product.cart_id where cart.buyer_id ='" + user_id + "'";
    pool.query(userCart, (q_err, q_res) => {
        if (q_err != null) {
            console.log(q_err);
            res.status(401).json(q_err);
        } else {
            res.status(200).json(q_res);
        }
    });
});

cartRoutes.post("/api/post/storeCartInfoFromLocalStorage", function (req, res, next) {
    var user_id = req.body.buyer_id;
    var product_id = req.body.product_id;
    var lastinsert = 0;
    const query5 = "SELECT * FROM cart where buyer_id= '" + user_id + "'";
    pool.query(query5, (q_err, buyer_query_res) => {
        console.log("Buyer IDDDD:", buyer_query_res.length)
        console.log("Length:", buyer_query_res.length)
        if (q_err) {
            res.status(401).json(q_err);
        }

        else if (buyer_query_res.length === 0) {
            const query1 = "INSERT INTO cart (buyer_id) VALUES (" + user_id + ")";
            pool.query(query1, (q_err, q_res) => {
                if (q_err) {
                    res.status(401).json(q_err);
                }
                lastinsert = q_res.insertId;
                const query4 = "INSERT INTO cart_product (product_id, cart_id) VALUES (" + product_id + "," + lastinsert + ")";
                pool.query(query4, (q_err, q_res) => {
                    if (q_err) {
                        res.status(401).json(q_err);
                    }
                    else {
                        res.send({
                            code: 200,
                        });
                    }
                });

            });
        }
        else {

            lastinsert = buyer_query_res[0].id;
            const query4 = "INSERT INTO cart_product (product_id, cart_id) VALUES (" + product_id + "," + lastinsert + ")";
            pool.query(query4, (q_err, q_res) => {
                if (q_err) {
                    console.log(q_err);
                    res.status(401).json(q_err);
                }
                else {
                    res.send({
                        code: 200,
                    });
                }
            });

        }
    });
});

cartRoutes.post("/api/post/addtocart", function (req, res) {
    var buyer_id = req.body.user_id;
    var product_id = req.body.product_id;
    var cart_id;
    //var quantity=req.body.quantity;
    console.log(buyer_id, 'test hre')
    console.log("Debug Cart:", req.body);
    if (buyer_id) {
        const query = "SELECT * FROM product WHERE id = " + product_id + "";
        pool.query(query, (q_err, q_res) => {
            if (q_err) {
                console.log(q_err);
                res.status(401).json(q_err);
            } else if (q_res.length > 1) {
                var sold_date = q_res[0].sold_date;
                if (sold_date)
                    return res.status(404).json({ message: "this item is not exist anymore" });
            }

            const query5 = "SELECT buyer_id FROM cart where buyer_id= '" +
                buyer_id +
                "'";
            pool.query(query5, (q_err, q_res) => {
                console.log("bkdlfkdslfkdskfld", q_res.length)
                if (q_err) {
                    console.log(q_err);
                    res.status(401).json(q_err);
                }
                else if (q_res.length < 1) {

                    const query1 = "INSERT INTO cart (buyer_id) VALUES (" + buyer_id + ")";
                    pool.query(query1, (q_err, q_res) => {
                        if (q_err) {
                            console.log(q_err);
                            res.status(401).json(q_err);
                        }

                        //cart_id=q_res.insertId
                    });
                }
                else {
                    const query2 = "SELECT id FROM cart WHERE buyer_id='" + buyer_id + "'";
                    pool.query(query2, (q_err, q_res) => {
                        if (q_err) {
                            res.status(401).json(q_err);
                        } else {

                            cart_id = q_res[0].id;

                            console.log("INSERTED CARTD ID", cart_id)
                            const query5 = "SELECT * FROM cart_product WHERE product_id = " + product_id + " AND cart_id=" + cart_id + "";
                            pool.query(query5, (q_err, q_res) => {
                                if (q_err) {
                                    console.log(q_err);
                                    res.status(401).json(q_err);
                                } else if (q_res.length > 1) {
                                    return res.status(404).json({ message: "this item is already added in cart" });
                                }
                            });
                            const query4 = "INSERT INTO cart_product (product_id, cart_id) VALUES (" + product_id + "," + cart_id + ")";
                            pool.query(query4, (q_err, q_res) => {
                                if (q_err) {
                                    console.log(q_err);
                                    res.status(401).json(q_err);
                                } else {
                                    console.log(JSON.stringify(q_res, null, 2));
                                    res.send({
                                        code: 200,
                                        success: "product added to cart"
                                    });
                                }
                            });
                        }
                    });
                }

            });
            console.log("BUYER IDIDID______>", buyer_id)

        });

    } else {
        return res.status(404).json({ message: "user does not login" });
    }
});

cartRoutes.get("/api/get/getcartitems", function (req, res) {
    var cart_id = req.query.cart_id;
    const query = "select name, price from product p INNER JOIN cart_product cp ON p.id=cp.product_id where cp.cart_id =" + 2 + "";
    pool.query(query, (q_err, q_res) => {
        if (q_err) {
            console.log(q_err);
            res.status(401).json(q_err);
        } else {
            console.log(JSON.stringify(q_res, null, 2));
            res.status(200).json(q_res);

        }
    });
});

cartRoutes.post("/api/post/deleteitemincart", function (req, res) {
    var cart_id;
    var product_id = req.body.product_id;
    console.log("product_id", product_id);
    var buyer_id = req.body.user_id;
    console.log("UserID", buyer_id)
    const query2 = "SELECT id FROM cart where buyer_id=  " + buyer_id + "";
    pool.query(query2, (q_err, q_res) => {
        if (q_err) {
            console.log(q_err);
            res.status(401).json(q_err);
        }
        cart_id = q_res[0].id;
        if (cart_id) {
            const query = "DELETE FROM cart_product where cart_id = " + cart_id + " AND product_id= " + product_id + "";
            pool.query(query, (q_err, q_res) => {
                console.log("execute")
                if (q_err) {
                    console.log("eeroror")
                    console.log(q_err);
                    res.status(401).json(q_err);
                } else {
                    console.log("success")
                    console.log(JSON.stringify(q_res, null, 2));
                    res.send({
                        code: 200,
                        success: "product deleted from cart"
                    });
                }

            });
        }
        else {
            return res.status(404).json({ message: "user does not login" });
        }

    });
    console.log("cart ID", cart_id)

});

cartRoutes.post("/api/post/checkout", function (req, res) {
    var buyer_id = req.body.id;
    var product_id = req.body.product_id;

    const query = "SELECT * FROM `hsfuldadb`.`product` WHERE id = '" + product_id + "'";
    pool.query(query, (q_err, q_res) => {
        if (q_err) {
            console.log(q_err);
            res.status(401).json(q_err);
        } else if (q_res.length > 1) {
            var sold_date = q_res[0].sold_date;
            if (sold_date)
                return res.status(404).json({ message: "this item is not exist anymore" });
        } else {
            const query1 = "UPDATE product SET " + "buyer_id='" + buyer_id + "'," +
                "sold_date= CURRENT_TIMESTAMP where id= " + product_id + "";
            pool.query(query1, (q_err, q_res) => {
                if (q_err) {
                    console.log(q_err);
                    res.status(401).json(q_err);
                } else {
                    console.log(JSON.stringify(q_res, null, 2));
                    res.send({
                        code: 200,
                        success: "purchase is done"
                    });
                }
            });
        }

    });

});

cartRoutes.post("/api/post/buy_item", function (req, res) {
    var buyer_id = req.body.userID;
    //console.log("Buyer ID:",buyer_id);
    const buyQuery = "SELECT cart.buyer_id,cart_product.product_id,cart_product.cart_id FROM cart join cart_product on cart.id=cart_product.cart_id where cart.buyer_id='" + buyer_id + "'";
    pool.query(buyQuery, (q_err, q_res) => {
        if (q_err != null) {
            console.log(q_err);
            res.status(401).json(q_err);
        } else {

            q_res.forEach(
                (productInCart, index) => {
                    console.log("buyerID", productInCart.buyer_id);
                    const query = "SELECT * FROM `hsfuldadb`.`product` WHERE id = '" + productInCart.product_id + "'";
                    pool.query(query, (q_err, q_res) => {
                        if (q_err) {
                            console.log(q_err);
                            res.status(401).json(q_err);
                        } else if (q_res.length > 1) {
                            var sold_date = q_res[0].sold_date;
                            if (sold_date)
                                return res.status(404).json({ message: "this item is not exist anymore" });
                        } else {
                            const query1 = "UPDATE product SET " +
                                "buyer_id='" +
                                productInCart.buyer_id +
                                "'," +
                                "sold_date= CURRENT_TIMESTAMP where id= " + productInCart.product_id + "";
                            pool.query(query1, (q_err, q_res) => {
                                if (q_err) {
                                    console.log(q_err);
                                    res.status(401).json(q_err);
                                } else {
                                    console.log(JSON.stringify(q_res, null, 2));

                                }
                            });
                        }

                    });
                });

        }
    });
    const query = "DELETE FROM cart where buyer_id = " + buyer_id + "";

    pool.query(query, (q_err, q_res) => {
        console.log("execute")
        if (q_err) {
            console.log("eeroror")
            console.log(q_err);
            res.status(401).json(q_err);
        } else {
            console.log("success")
            console.log(JSON.stringify(q_res, null, 2));
            res.send({
                code: 200,
                success: "purchase is done"
            });
        }
    });
});

// clear cart @BV
cartRoutes.delete('/api/delete/cart', function (req, res) {
    let userId = req.body.userId;
    const q = `SELECT id FROM cart WHERE buyer_id="${userId}"`;
    let cartId;
    pool.query(q, (q_err, q_res) => {
        if (q_err) {
            console.log(q_err);
        } else if (q_res.length >= 0) {
            cartId = q_res[0].id;
            const query = `DELETE FROM cart_product WHERE cart_id="${cartId}"`;
            pool.query(query, (q_err, q_res) => {
                if (q_err) {
                    console.log(q_err);
                    res.status(401).json(q_err);
                } else {
                    res.send({
                        code: 200,
                        success: "Cart cleared successfully!"
                    });
                }
            })
        } else {
            console.log('No user ID found.');
        }
    })
});

// remove item from cart. @BV
cartRoutes.delete('/api/delete/cartItem', function (req, res) {
    console.log('REQUEST BODY IS: ', req.body);
    let userId = req.body.userId;
    let productId = req.body.prodId;

    const q = `SELECT id FROM cart WHERE buyer_id="${userId}"`;
    let cartId;
    pool.query(q, (q_err, q_res) => {
        if (q_err) {
            console.log(q_err);
        } else if (q_res.length >= 0) {
            cartId = q_res[0].id
            const query = `DELETE FROM cart_product WHERE cart_id="${cartId}" AND product_id="${productId}"`;
            pool.query(query, (q_err, q_res) => {
                console.log(q_res)
                if (q_err) {
                    console.log(q_err);
                    res.status(401).json(q_err);
                } else {
                    console.log('Item deleted from cart!');
                    res.send({
                        code: 200,
                        success: "Item deleted from cart successfully!"
                    });
                }
            })
        } else {
            console.log('No user ID found.');
        }
    })
})

cartRoutes.get('/api/get/cartHasItem', function (req, res, next) {
    let buyer_id = req.query.bid;
    let product_id = req.query.pid;

    const query = `SELECT * FROM cart_product INNER JOIN cart ON cart_product.cart_id=cart.id WHERE cart.buyer_id = "${buyer_id}" AND cart_product.product_id= "${product_id}"`;
    pool.query(query, (q_err, q_res) => {
        console.log("test asda", q_res)
        if (q_err) {
            console.log(q_err);
            res.status(401).json(q_err);
        }
        if (q_res.length < 1) {
            res
                .status(204)
                .json({ message: "error retreiving feedback count." })
        } else {
            res.status(200).json(q_res);
        }
    })
})

module.exports = cartRoutes;