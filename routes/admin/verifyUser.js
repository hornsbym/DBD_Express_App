// Pulls in Express:
var express = require('express')

// Defines a local scope of a router for exporting to the main app:
var router = express.Router()

///// THIS ROUTE DOES NOT CURRENTLY WORK /////
// Define router behavior:
router.get("/", (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        req.session.valid = true;
        res.redirect("/dashboard");
    } else {
        req.session.loginError = "Check credentials and try again."
        res.redirect("/login");
    }
})

module.exports = router