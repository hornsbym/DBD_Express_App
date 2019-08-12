// Pulls in Express:
var express = require('express')

// Defines a local scope of a router for exporting to the main app:
var router = express.Router()

// Pulls in auxillary functions:
var helpers = require("../../public/js/HelperFunctions.js")
var json = require("../../public/js/GetMenus.js")

///// THIS ROUTE DOES NOT CURRENTLY WORK /////
// Define router behavior:
router.get("/", (req, res, next) => {
    var rawJSON = req.body;

    var date = rawJSON.date;

    var entrees = {
        monday: rawJSON.monday,
        tuesday: rawJSON.tuesday,
        wednesday: rawJSON.wednesday,
        thursday: rawJSON.thursday,
        friday: rawJSON.friday,
        saturday: rawJSON.saturday,
        sunday: rawJSON.sunday
    }

    var sides = {
        sideOne: rawJSON.sideOne,
        sideTwo: rawJSON.sideTwo,
        sideThree: rawJSON.sideThree
    }

    var healthy = {
        "healthy_item_one": {
            "meal": rawJSON.healthy_item_one_meal,
            "keto": rawJSON.healthy_item_one_keto,
            "paleo": rawJSON.healthy_item_one_paleo,
            "gf": rawJSON.healthy_item_one_gf,
            "fats": rawJSON.healthy_item_one_fat,
            "protein": rawJSON.healthy_item_one_protein,
            "carbs": rawJSON.healthy_item_one_carbs,
            "calories": rawJSON.healthy_item_one_calories
        },
        "healthy_item_two": {
            "meal": rawJSON.healthy_item_two_meal,
            "keto": rawJSON.healthy_item_two_keto,
            "paleo": rawJSON.healthy_item_two_paleo,
            "gf": rawJSON.healthy_item_two_gf,
            "fats": rawJSON.healthy_item_two_fat,
            "protein": rawJSON.healthy_item_two_protein,
            "carbs": rawJSON.healthy_item_two_carbs,
            "calories": rawJSON.healthy_item_two_calories
        },
        "healthy_item_three": {
            "meal": rawJSON.healthy_item_three_meal,
            "keto": rawJSON.healthy_item_three_keto,
            "paleo": rawJSON.healthy_item_three_paleo,
            "gf": rawJSON.healthy_item_three_gf,
            "fats": rawJSON.healthy_item_three_fat,
            "protein": rawJSON.healthy_item_three_protein,
            "carbs": rawJSON.healthy_item_three_carbs,
            "calories": rawJSON.healthy_item_three_calories
        },
        "healthy_item_four": {
            "meal": rawJSON.healthy_item_four_meal,
            "keto": rawJSON.healthy_item_four_keto,
            "paleo": rawJSON.healthy_item_four_paleo,
            "gf": rawJSON.healthy_item_four_gf,
            "fats": rawJSON.healthy_item_four_fat,
            "protein": rawJSON.healthy_item_four_protein,
            "carbs": rawJSON.healthy_item_four_carbs,
            "calories": rawJSON.healthy_item_four_calories
        },
        "healthy_item_five": {
            "meal": rawJSON.healthy_item_five_meal,
            "keto": rawJSON.healthy_item_five_keto,
            "paleo": rawJSON.healthy_item_five_paleo,
            "gf": rawJSON.healthy_item_five_gf,
            "fats": rawJSON.healthy_item_five_fat,
            "protein": rawJSON.healthy_item_five_protein,
            "carbs": rawJSON.healthy_item_five_carbs,
            "calories": rawJSON.healthy_item_five_calories
        }
    }

    helpers.store_date(date);
    helpers.store_entrees(entrees);
    helpers.store_sides(sides);
    helpers.store_healthy(healthy);

    res.redirect("/admin");
})

module.exports = router