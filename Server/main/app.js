var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// // This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// // This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
// app.use((req, res, next) => {
//     if (req.cookies.user_sid && !req.session.user) {
//         res.clearCookie('user_sid');        
//     }
//     next();
// });

// // middleware function to check for logged-in users
// var sessionChecker = (req, res, next) => {
//     if (req.session.user && req.cookies.user_sid) {
//         res.redirect('/');
//     } else {
//         next();
//     }    
// };

// // route for Home-Page
// app.get('/', sessionChecker, (req, res) => {
//     res.redirect('/login');
// });

// // route for user signup
// app.route('/signup')
//     .get(sessionChecker, (req, res) => {
//         res.redirect('/signup');
//     })
//     .post((req, res) => {
//         User.create({
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password
//         })
//         .then(user => {
//             req.session.user = user.dataValues;
//             res.redirect('/');
//         })
//         .catch(error => {
//             res.redirect('/signup');
//         });
//     });

//     // route for user Login
// app.route('/login')
// .get(sessionChecker, (req, res) => {
//     res.redirect('/login');
// })
// .post((req, res) => {
//     var username = req.body.username,
//         password = req.body.password;

//     User.findOne({ where: { username: username } }).then(function (user) {
//         if (!user) {
//             res.redirect('/login');
//         } else if (!user.validPassword(password)) {
//             res.redirect('/login');
//         } else {
//             req.session.user = user.dataValues;
//             res.redirect('/');
//         }
//     });
// });

// // route for user's dashboard
// app.get('/', (req, res) => {
//     if (req.session.user && req.cookies.user_sid) {
//         res.redirect('/');
//     } else {
//         res.redirect('/login');
//     }
// });


// // route for user logout
// app.get('/logout', (req, res) => {
//     if (req.session.user && req.cookies.user_sid) {
//         res.clearCookie('user_sid');
//         res.redirect('/');
//     } else {
//         res.redirect('/login');
//     }
// });


// // route for handling 404 requests(unavailable routes)
// app.use(function (req, res, next) {
//   res.status(404).send("Sorry can't find that!")
// });


app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

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