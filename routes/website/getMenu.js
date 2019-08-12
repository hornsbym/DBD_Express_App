// Pulls in Express:
var express = require('express')

// Defines a local scope of a router for exporting to the main app:
var router = express.Router()

// Pull in helper functions for working with JSON file data:
var jsonHelpers = require("../../public/js/GetMenus")

// Define route behavior:
router.get("/", (req, res, next) => {
    jsonHelpers.download_meal_data((menu_data) => {

        res.send(menu_data)
    });
})

module.exports = router