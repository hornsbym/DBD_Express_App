require('dotenv').config();
var path = require("path");

var helpers = require("./public/js/HelperFunctions.js")
var json = require("./public/js/GetMenus.js");

var express = require("express");
var session = require("express-session");
var app = express();

app.use(session({secret: process.env.COOKIE_KEY}))
app.use(express.json());
app.use(express.urlencoded());

app.set("view engine", "pug")
app.use("/static", express.static(path.join(__dirname, "public")));

var port = process.env.PORT;
var url = process.env.URL;

app.get("/", (req, res) => {
    json.download_meal_data((meal_data) => {

        res.render("index", {
            month: helpers.convert_number_to_month(meal_data.date.month),
            day: meal_data.date.day,

            side1: meal_data.sides.sideOne,
            side2: meal_data.sides.sideTwo,
            side3: meal_data.sides.sideThree,
            monday: meal_data.entrees.monday,
            tuesday: meal_data.entrees.tuesday,
            wednesday: meal_data.entrees.wednesday,
            thursday: meal_data.entrees.thursday,
            friday: meal_data.entrees.friday,
            saturday: meal_data.entrees.saturday,
            sunday: meal_data.entrees.sunday,

            h1_meal: meal_data.health.healthy_item_one.meal,
            h1_specifications: helpers.create_specifications(meal_data.health.healthy_item_one),
            h1_fat: meal_data.health.healthy_item_one.fats,
            h1_carbs: meal_data.health.healthy_item_one.carbs,
            h1_protein: meal_data.health.healthy_item_one.protein,
            h1_calories: meal_data.health.healthy_item_one.calories,

            h2_meal: meal_data.health.healthy_item_two.meal,
            h2_specifications: helpers.create_specifications(meal_data.health.healthy_item_two),
            h2_fat: meal_data.health.healthy_item_two.fats,
            h2_carbs: meal_data.health.healthy_item_two.carbs,
            h2_protein: meal_data.health.healthy_item_two.protein,
            h2_calories: meal_data.health.healthy_item_two.calories,

            h3_meal: meal_data.health.healthy_item_three.meal,
            h3_specifications: helpers.create_specifications(meal_data.health.healthy_item_three),
            h3_fat: meal_data.health.healthy_item_three.fats,
            h3_carbs: meal_data.health.healthy_item_three.carbs,
            h3_protein: meal_data.health.healthy_item_three.protein,
            h3_calories: meal_data.health.healthy_item_three.calories,

            h4_meal: meal_data.health.healthy_item_four.meal,
            h4_specifications: helpers.create_specifications(meal_data.health.healthy_item_four),
            h4_fat: meal_data.health.healthy_item_four.fats,
            h4_carbs: meal_data.health.healthy_item_four.carbs,
            h4_protein: meal_data.health.healthy_item_four.protein,
            h4_calories: meal_data.health.healthy_item_four.calories,

            h5_meal: meal_data.health.healthy_item_five.meal,
            h5_specifications: helpers.create_specifications(meal_data.health.healthy_item_five),
            h5_fat: meal_data.health.healthy_item_five.fats,
            h5_carbs: meal_data.health.healthy_item_five.carbs,
            h5_protein: meal_data.health.healthy_item_five.protein,
            h5_calories: meal_data.health.healthy_item_five.calories
        })
    });
})

// Sends the user to the login page
app.get("/login", (req, res) => {
    req.session.valid = false;

    res.render("login")
})

app.get("/admin", (req, res) => {
    if (req.session.valid === true) {
        json.download_meal_data((meal_data) => {

            var check_boxes = helpers.create_checkboxes(meal_data.health);
            var date_string = helpers.create_date_string(meal_data.date);
    
            res.render("admin", {
                date : date_string,
    
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
        res.redirect("/login")
    }
    
})

// Verifies the user
app.post("/verifyUser", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        req.session.valid = true;
        res.redirect("/admin");
    } else {
        res.redirect("/login");
    }
})

// Saves all changes to the appropriate classes:
app.post("/submitChanges", (req, res) => {
    var rawJSON = req.body;

    var date = {
        date : rawJSON.date
    }

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
        sideOne : rawJSON.sideOne,
        sideTwo : rawJSON.sideTwo,
        sideThree : rawJSON.sideThree
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

app.listen(port, () => {
    console.log("Running app at " + url + port)
});