const fs = require('fs');
const path = require('path');
const helpers = require("./HelperFunctions.js")


function getPathToFile(fileName) {
    const jsonDir = path.resolve(__dirname, "../../json");

    return path.join(jsonDir, fileName)
}


function download_meal_data(callback) {
    var meal_data = {
        date: {},
        sides: {},
        health: {},
        entrees: {}
    }

    helpers.read(getPathToFile("date.json"), (date_data) => {
        meal_data.date = JSON.parse(date_data);

        helpers.read(getPathToFile("sides.json"), (sides_data) => {
            meal_data.sides = JSON.parse(sides_data);

            helpers.read(getPathToFile('entrees.json'), (entree_data) => {
                meal_data.entrees = JSON.parse(entree_data);

                helpers.read(getPathToFile('health.json'), (health_data) => {
                    meal_data.health = JSON.parse(health_data);

                    callback(meal_data)
                })
            })
        })
    })
}

module.exports = {
    download_meal_data: download_meal_data,
    getPathToFile : getPathToFile
}