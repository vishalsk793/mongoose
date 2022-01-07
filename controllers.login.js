var app = require('../../config/server.config');
var User = require('../models/models.users');
var passport = require("passport");
var LocalStrategy = require("passport-local");


app.get("/", function(req, res) {
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res) {
    res.render("secret");
});

app.get("/register", function(req, res) {
    res.render("register");
});

// handeling user sign up
app.post("/register", function(req, res) {
    // console.log(req.body.username);
    // console.log(req.body.password);
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/secret");
        });
    });
});

// Login Form
app.get("/login", function(req, res) {
    res.render("login");
});

// Login Logic
// middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res) {

});

// Logout
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

// check isLoggedIn
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

// app.listen(process.env.PORT, process.env.IP, function() {
//     console.log("app started!!!")
// });