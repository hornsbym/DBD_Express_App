// Gives access to file server
const fs = require("fs");
const path = require("path");

function getPathToFile(fileName) {
    const jsonDir = path.resolve(__dirname, "../../json");

    return path.join(jsonDir, fileName)
}

function create_checkboxes(allHealthItemsJSON) {
    var healthy = allHealthItemsJSON;

    var check_boxes = {
        healthy_item_one: {
            keto: false,
            paleo: false,
            gf: false
        },
        healthy_item_two: {
            keto: false,
            paleo: false,
            gf: false
        },
        healthy_item_three: {
            keto: false,
            paleo: false,
            gf: false
        },
        healthy_item_four: {
            keto: false,
            paleo: false,
            gf: false
        },
        healthy_item_five: {
            keto: false,
            paleo: false,
            gf: false
        },
    };

    for (var item in healthy) {
        if (healthy.hasOwnProperty(item)) {
            var item_object = healthy[item];

            if (item_object.keto) {
                check_boxes[item].keto = true
            }
            if (item_object.paleo) {
                check_boxes[item].paleo = true
            }
            if (item_object.gf) {
                check_boxes[item].gf = true
            }
        }
    }

    return check_boxes;
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

function create_date_input_string(dateJSON) {
    return String(dateJSON.year + "-" + dateJSON.month + "-" + dateJSON.day);
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

function store_date(dateJSON) {
    var date = dateJSON.date.split("-");

    var newDate = {
        day: date[2],
        month: date[1],
        year: date[0]
    }

    save(getPathToFile("date.json"), JSON.stringify(newDate), () => {
    })
}

function store_entrees(entreesJSON) {
    var entrees = JSON.stringify(entreesJSON)

    save(getPathToFile("entrees.json"), entrees, () => {
    })
}

function store_sides(sidesJSON) {
    // Determines what gets stored in the JSON file:
    var sides = JSON.stringify(sidesJSON);

    // Writes to the appropriate JSON file:
    save(getPathToFile("sides.json"), sides, () => {
    })
}

function store_healthy(healthyJSON) {
    var healthy = JSON.stringify(healthyJSON);

    save(getPathToFile("health.json"), healthy, () => {
    })
}

module.exports = {
    save: save,
    read: read,
    log_use: log_use,
    getPathToFile: getPathToFile,
    create_specifications: create_specifications,
    create_checkboxes: create_checkboxes,
    create_display_date: create_display_date,
    create_date_input_string : create_date_input_string,
    convert_number_to_month: convert_number_to_month,
    store_date: store_date,
    store_entrees: store_entrees,
    store_sides: store_sides,
    store_healthy: store_healthy,
    get_log_stats: get_log_stats
}