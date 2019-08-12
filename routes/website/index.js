// Pulls in Express:
var express = require('express')

// Defines a local scope of a router for exporting to the main app:
var router = express.Router()

// Pulls in auxillary functions:
var helpers = require("../../public/js/HelperFunctions.js")

// Define the route GET behavior:
router.get("/", (req, res, next) => {
    try {
        helpers.log_use()
    } catch (e) {
        console.log("*** Error logging use ***")
        console.log(e)
    }

    res.render("index")
})

// Exposes this router for app to use:
module.exports = router