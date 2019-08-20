// Pulls in Express:
var express = require('express')

// Defines a local scope of a router for exporting to the main app:
var router = express.Router()

// Pulls in auxillary functions:
var json = require("../../public/js/GetMenus.js")

// Define router behavior:
router.get("/", (req, res, next) => {
    if (req.session.valid === true) {
        json.download_meal_data((meal_data) => {

            var entrees = meal_data.entrees

            res.render("admin", {
                monday_meal: entrees.monday.meal,
                monday_gf: entrees.monday.gf,
                monday_fat: entrees.monday.fats,
                monday_carbs: entrees.monday.carbs,
                monday_protein: entrees.monday.proteins,
                monday_calories: entrees.monday.calories,

                tuesday_meal: entrees.tuesday.meal,
                tuesday_gf: entrees.tuesday.gf,
                tuesday_fat: entrees.tuesday.fats,
                tuesday_carbs: entrees.tuesday.carbs,
                tuesday_protein: entrees.tuesday.proteins,
                tuesday_calories: entrees.tuesday.calories,

                wednesday_meal: entrees.wednesday.meal,
                wednesday_gf: entrees.wednesday.gf,
                wednesday_fat: entrees.wednesday.fats,
                wednesday_carbs: entrees.wednesday.carbs,
                wednesday_protein: entrees.wednesday.proteins,
                wednesday_calories: entrees.wednesday.calories,

                thursday_meal: entrees.thursday.meal,
                thursday_gf: entrees.thursday.gf,
                thursday_fat: entrees.thursday.fats,
                thursday_carbs: entrees.thursday.carbs,
                thursday_protein: entrees.thursday.proteins,
                thursday_calories: entrees.thursday.calories,

                friday_meal: entrees.friday.meal,
                friday_gf: entrees.friday.gf,
                friday_fat: entrees.friday.fats,
                friday_carbs: entrees.friday.carbs,
                friday_protein: entrees.friday.proteins,
                friday_calories: entrees.friday.calories,

                saturday_meal: entrees.saturday.meal,
                saturday_gf: entrees.saturday.gf,
                saturday_fat: entrees.saturday.fats,
                saturday_carbs: entrees.saturday.carbs,
                saturday_protein: entrees.saturday.proteins,
                saturday_calories: entrees.saturday.calories,

                sunday_meal: entrees.sunday.meal,
                sunday_gf: entrees.sunday.gf,
                sunday_fat: entrees.sunday.fats,
                sunday_carbs: entrees.sunday.carbs,
                sunday_protein: entrees.sunday.proteins,
                sunday_calories: entrees.sunday.calories
            })
        });
    } else {
        res.redirect("login")
    }
})

module.exports = router