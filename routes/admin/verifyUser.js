// Pulls in Express:
var express = require('express')

// Defines a local scope of a router for exporting to the main app:
var router = express.Router()

// Define router behavior:
router.post("/", (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        req.session.valid = true;
        res.redirect(process.env.URL + ":" + process.env.PORT + "/dashboard");
    } else {
        req.session.loginError = "Check credentials and try again."
        res.render("login");
    }
})

module.exports = router