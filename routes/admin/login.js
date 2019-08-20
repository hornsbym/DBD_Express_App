// Pulls in Express:
var express = require('express')

// Defines a local scope of a router for exporting to the main app:
var router = express.Router()

// Define router behavior:
router.get("/", (req, res, next) => {
    var errorMessage = req.session.loginError;
    req.session.valid = false;

    res.render("login")
})

module.exports = router