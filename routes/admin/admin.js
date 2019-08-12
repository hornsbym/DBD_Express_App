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
    if (req.session.valid === true) {
        json.download_meal_data((meal_data) => {

            var check_boxes = helpers.create_checkboxes(meal_data.health);
            var date_input_string = helpers.create_date_input_string(meal_data.date);

            res.render("admin", {
                date: date_input_string,

                sideOne: meal_data.sides.sideOne,
                sideTwo: meal_data.sides.sideTwo,
                sideThree: meal_data.sides.sideThree,

                monday: meal_data.entrees.monday,
                tuesday: meal_data.entrees.tuesday,
                wednesday: meal_data.entrees.wednesday,
                thursday: meal_data.entrees.thursday,
                friday: meal_data.entrees.friday,
                saturday: meal_data.entrees.saturday,
                sunday: meal_data.entrees.sunday,

                h1_meal: meal_data.health.healthy_item_one.meal,
                h1_keto: check_boxes.healthy_item_one.keto,
                h1_paleo: check_boxes.healthy_item_one.paleo,
                h1_gf: check_boxes.healthy_item_one.gf,
                h1_fat: meal_data.health.healthy_item_one.fats,
                h1_carbs: meal_data.health.healthy_item_one.carbs,
                h1_protein: meal_data.health.healthy_item_one.protein,
                h1_calories: meal_data.health.healthy_item_one.calories,

                h2_meal: meal_data.health.healthy_item_two.meal,
                h2_keto: check_boxes.healthy_item_two.keto,
                h2_paleo: check_boxes.healthy_item_two.paleo,
                h2_gf: check_boxes.healthy_item_two.gf,
                h2_fat: meal_data.health.healthy_item_two.fats,
                h2_carbs: meal_data.health.healthy_item_two.carbs,
                h2_protein: meal_data.health.healthy_item_two.protein,
                h2_calories: meal_data.health.healthy_item_two.calories,

                h3_meal: meal_data.health.healthy_item_three.meal,
                h3_keto: check_boxes.healthy_item_three.keto,
                h3_paleo: check_boxes.healthy_item_three.paleo,
                h3_gf: check_boxes.healthy_item_three.gf,
                h3_fat: meal_data.health.healthy_item_three.fats,
                h3_carbs: meal_data.health.healthy_item_three.carbs,
                h3_protein: meal_data.health.healthy_item_three.protein,
                h3_calories: meal_data.health.healthy_item_three.calories,

                h4_meal: meal_data.health.healthy_item_four.meal,
                h4_keto: check_boxes.healthy_item_four.keto,
                h4_paleo: check_boxes.healthy_item_four.paleo,
                h4_gf: check_boxes.healthy_item_four.gf,
                h4_fat: meal_data.health.healthy_item_four.fats,
                h4_carbs: meal_data.health.healthy_item_four.carbs,
                h4_protein: meal_data.health.healthy_item_four.protein,
                h4_calories: meal_data.health.healthy_item_four.calories,

                h5_meal: meal_data.health.healthy_item_five.meal,
                h5_keto: check_boxes.healthy_item_five.keto,
                h5_paleo: check_boxes.healthy_item_five.paleo,
                h5_gf: check_boxes.healthy_item_five.gf,
                h5_fat: meal_data.health.healthy_item_five.fats,
                h5_carbs: meal_data.health.healthy_item_five.carbs,
                h5_protein: meal_data.health.healthy_item_five.protein,
                h5_calories: meal_data.health.healthy_item_five.calories
            })
        });
    } else {
        res.redirect("login")
    }
})

module.exports = router