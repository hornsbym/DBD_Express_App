// Pulls in Express:
var express = require('express')

// Defines a local scope of a router for exporting to the main app:
var router = express.Router()

// Pulls in auxillary functions:
var helpers = require("../../public/js/HelperFunctions.js")

///// THIS ROUTE DOES NOT CURRENTLY WORK /////
// Define router behavior:
router.get("/", (req, res, next) => {
    helpers.get_log_stats((log_data) => {
        if (req.session.valid) {
            res.render("dashboard", {
                daily_uses: log_data.daily,
                weekly_uses: log_data.weekly,
                total_uses: log_data.total
            })
        } else {
            res.redirect("login")
        }
    });
})

module.exports = router