// Pulls in Express:
var express = require('express')

// Defines a local scope of a router for exporting to the main app:
var router = express.Router()

// Pulls in auxillary functions:
var helpers = require("../../public/js/HelperFunctions.js")

// Define router behavior:
router.post("/", (req, res, next) => {
    var menu_data = req.body;

    // Parses through the raw form data and creates a hierarchical JSON object representing a menu.
    var menu = {
        "monday":{
            "meal": menu_data.monday_meal,
            "gf": menu_data.monday_gf ? true : false,  // If there's a gluten-free property in the JSON data, save it as true. If not, save it as false.
            "carbs": menu_data.monday_carbs,           // That way, there's always a GF value on record.
            "fats": menu_data.monday_fat,
            "proteins": menu_data.monday_protein,
            "calories": menu_data.monday_calories
        },
        "tuesday":{
            "meal": menu_data.tuesday_meal,
            "gf": menu_data.tuesday_gf ? true : false,
            "carbs": menu_data.tuesday_carbs,
            "fats": menu_data.tuesday_fat,
            "proteins": menu_data.tuesday_protein,
            "calories": menu_data.tuesday_calories
        },
        "wednesday":{
            "meal": menu_data.wednesday_meal,
            "gf": menu_data.wednesday_gf ? true : false,
            "carbs": menu_data.wednesday_carbs,
            "fats": menu_data.wednesday_fat,
            "proteins": menu_data.wednesday_protein,
            "calories": menu_data.wednesday_calories
        },
        "thursday":{
            "meal": menu_data.thursday_meal,
            "gf": menu_data.thursday_gf ? true : false,
            "carbs": menu_data.thursday_carbs,
            "fats": menu_data.thursday_fat,
            "proteins": menu_data.thursday_protein,
            "calories": menu_data.thursday_calories
        },
        "friday":{
            "meal": menu_data.friday_meal,
            "gf": menu_data.friday_gf ? true : false,
            "carbs": menu_data.friday_carbs,
            "fats": menu_data.friday_fat,
            "proteins": menu_data.friday_protein,
            "calories": menu_data.friday_calories
        },
        "saturday":{
            "meal": menu_data.saturday_meal,
            "gf": menu_data.saturday_gf ? true : false,
            "carbs": menu_data.saturday_carbs,
            "fats": menu_data.saturday_fat,
            "proteins": menu_data.saturday_protein,
            "calories": menu_data.saturday_calories
        },
        "sunday":{
            "meal": menu_data.sunday_meal,
            "gf": menu_data.sunday_gf ? true : false,
            "carbs": menu_data.sunday_carbs,
            "fats": menu_data.sunday_fat,
            "proteins": menu_data.sunday_protein,
            "calories": menu_data.sunday_calories
        }
    }

    // Stores the new menu object in a JSON file.
    helpers.store_menu(menu)

    res.redirect("/dashboard");
})

module.exports = router