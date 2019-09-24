// Gives access to file server
const fs = require("fs");
const path = require("path");

function getPathToFile(fileName) {
    const jsonDir = path.resolve(__dirname, "../../json");

    return path.join(jsonDir, fileName)
}

function create_specifications(healthItemJSON) {
    var return_string = "";

    if (healthItemJSON.keto) {
        return_string += "K,";
    }
    if (healthItemJSON.paleo) {
        return_string += "P,";
    }
    if (healthItemJSON.gf) {
        return_string += "GF,"
    }


    return return_string.slice(0, return_string.length - 1)
}

function convert_number_to_month(num) {
    var num = Number(num);
    var months = ["", "January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return months[num]
}

function create_display_date(dateJSON) {
    return convert_number_to_month(dateJSON.month) + ", " + String(dateJSON.day)
}

function create_date_string(dateJSON) {
    return String(dateJSON.month + "-" + dateJSON.day + "-" + dateJSON.year);
}

function create_log_key(date) {
    var days = ["Sun", "Mon", "Tues", "Weds", "Thu", "Fri", "Sat"]

    var date_string = create_date_string({
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
    });
    var DOW = days[date.getDay()]

    return date_string + "-" + DOW
}

function format_to_two_digits(integer){
    var i = integer.toString()
    var iLen = i.length

    var returnString;

    switch(iLen) {
        default:
            returnString = ""
            break
        case 1:
            returnString = "0" + i
            break
        case 2:
            returnString = i
            break
    }

    return returnString
}

function create_date_input_string(dateJSON) {
    return String(dateJSON.year + "-" + dateJSON.month + "-" + dateJSON.day);
}

function create_date_json(dateString) {
    var date = dateString.split("-");

    var newDate = {
        day: date[2],
        month: date[1],
        year: date[0]
    }

    return newDate
}

function get_daily_views(dateObj, logJSON) {
    var today = create_log_key(dateObj);

    if (logJSON[today]) {
        return logJSON[today]
    } else {
        return 0
    }
}

function get_weekly_views(dateObj, logJSON) {
    var weekly_total = 0;

    var day = dateObj.getDay();
    
    // If it's Sunday...
    if (day === 0) {
        // Return the day's total
        weekly_total = get_daily_views(dateObj, logJSON)
    } 
    // If it's not sunday...
    else {
        var i;
        for(i = day; i >= 0; i--) {
            var previous_date_obj = new Date;
            previous_date_obj.setDate((dateObj.getDate() - i));

            var prev_daily = get_daily_views(previous_date_obj, logJSON);

            if (prev_daily) {
                weekly_total += prev_daily;
            }
        }
    }

    return weekly_total
}

function get_total_views(logJSON) {
    var sum = 0;

    for (log in logJSON) {
        sum += logJSON[log];
    }

    return sum;
}

function get_scheduled_updates(callback) {
    read(getPathToFile("scheduled_updates.json"), (updates) => {
        callback(updates);
    })
}

function schedule_update(dateJSON, menuInfoJSON) {
    get_scheduled_updates((updates) => {
        var updates = JSON.parse(updates)

        var date = new Date(Number(dateJSON.year), Number(dateJSON.month), Number(dateJSON.day))
        
        var update = {
            update_on: create_log_key(date),
            menu_date: menuInfoJSON
        }

        updates.update_list.push(update);

        save(getPathToFile("scheduled_updates.json"), JSON.stringify(updates), () => {
        })
    })
}

function get_log_stats(callback) {
    read(getPathToFile("use_logs.json"), (log_data) => {
        var log_stats = {
            daily: -1,
            weekly: -1,
            total: -1,
        }

        try {
            var dailyViews, weeklyViews, totalViews = 0;

            var logs = JSON.parse(log_data);

            var today = new Date();

            dailyViews = get_daily_views(today, logs);
            weeklyViews = get_weekly_views(today, logs)
            totalViews = get_total_views(logs)

            log_stats = {
                daily: dailyViews,
                weekly: weeklyViews,
                total: totalViews,
            }

        } catch (e) {
            console.log(e)
        } finally {
            callback(log_stats)
        }
    })
}

function log_use() {
    // Tracks how many users access the website per day
    var date = new Date();

    var key = create_log_key(date);

    read(getPathToFile("use_logs.json"), (data) => {
        // Gets the logs we already have:
        var logs = JSON.parse(data);

        if (logs[key]) {
            logs[key] = logs[key] + 1;
        } else {
            logs[key] = 1;
        }

        save(getPathToFile("use_logs.json"), JSON.stringify(logs), (err) => {
            if (err) {
                console.log(err)
                throw err;
            }
        })
    })
}

function save(file_location, JSON_string, callback) {
    // Stores the provided JSON data in the specified location.
    // Then, executes the callback.
    var JSON_string = JSON_string;

    if (typeof JSON_string === "object") {
        JSON_string = JSON.stringify(JSON_string)
    }

    fs.writeFile(file_location, JSON_string, (err) => {
        if (err) {
            console.log(err)
            throw err;
        }

        // Sends user to the next appropriate location:
        callback()
    })
}

function read(file_location, callback) {
    // Opens, and reads JSON data from the specified file location
    // Then, executes the callback.
    fs.readFile(file_location, (err, data) => {
        if (err) throw err;

        callback(data);
    })
}

/**
 * Recieves a JSON object representing the week's menu.
 * Stores that object in "/json/menu.json".
 * @param {JSON} menuJSON 
 */
function store_menu(menuJSON) {
    var entrees = JSON.stringify(menuJSON)

    save(getPathToFile("menu.json"), entrees, () => {})
}

/**
 * Recieves a Date object.
 * Stores that object in "/json/date.json"
 * @param {Date} dateObject
 */
function store_date(dateObject){
    save(getPathToFile("date.json"), dateObject, () => {})
}


module.exports = {
    save: save,
    read: read,
    log_use: log_use,
    getPathToFile: getPathToFile,
    create_specifications: create_specifications,
    create_display_date: create_display_date,
    create_date_input_string : create_date_input_string,
    create_date_json: create_date_json,
    schedule_update: schedule_update,
    convert_number_to_month: convert_number_to_month,
    store_menu: store_menu,
    store_date: store_date,
    get_log_stats: get_log_stats,
    format_to_two_digits: format_to_two_digits
}