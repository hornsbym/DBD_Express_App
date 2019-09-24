const helpers = require("./HelperFunctions.js")


function download_meal_data(callback) {
    var menu_data = {
        date : null, 
        entrees : {}
    }

    helpers.read(helpers.getPathToFile("menu.json"), (entrees) => {
        menu_data.entrees = JSON.parse(entrees);

        helpers.read(helpers.getPathToFile("date.json"), (date) => {
            menu_data.date = JSON.parse(date)

            callback(menu_data)
        })
    })
}

module.exports = {
    download_meal_data: download_meal_data
}