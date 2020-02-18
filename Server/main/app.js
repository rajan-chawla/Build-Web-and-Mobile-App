// Express. js is a Node js web application server framework
// Path module is used to handle and transform files paths
// IndexRouter defines all the routes in the website

var express = require("express");
var path = require("path");
var indexRouter = require("./routes");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static('uploads'));
app.use(express.static("build"));
app.use("/", indexRouter);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build/index.html"));
});


module.exports = app;

/**
 * Module dependencies.
 */
var http = require("http");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "5010");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}