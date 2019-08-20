// Pulls in Express:
var express = require('express')

// Defines a local scope of a router for exporting to the main app:
var router = express.Router()

// Pulls in auxillary functions:
var helpers = require("../../public/js/HelperFunctions.js")

// Define router behavior:
router.get("/", (req, res, next) => {
    /**
     * TO-DO:
     * ---| Log usages, and display them here
     */
    if (req.session.valid) {
        res.render("dashboard")
    } else {
        res.redirect("login")
    }
})

module.exports = router