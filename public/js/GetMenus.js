const helpers = require("./HelperFunctions.js")


function download_meal_data(callback) {
    var menu_data = {
        entrees : {},
        sides : []
    }

    helpers.read(helpers.getPathToFile("menu.json"), (entrees) => {
        menu_data.entrees = JSON.parse(entrees);

        helpers.read(helpers.getPathToFile("sides.json"), (sides_data) => {
            menu_data.sides = JSON.parse(sides_data);

            callback(menu_data)
        })
    })
}

module.exports = {
    download_meal_data: download_meal_data
}