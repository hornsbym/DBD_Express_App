// Gives access to file server

var fs = require("fs");

function create_checkboxes(allHealthItemsJSON) {
    var healthy = allHealthItemsJSON;

    var check_boxes = {
        healthy_item_one : {
            keto: false,
            paleo: false,
            gf: false
        },
        healthy_item_two: {
            keto: false,
            paleo: false,
            gf: false
        },
        healthy_item_three : {
            keto: false,
            paleo: false,
            gf: false
        },
        healthy_item_four : {
            keto: false,
            paleo: false,
            gf: false
        },
        healthy_item_five : {
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

function create_specifications(healthItemJSON){
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

function create_date_string(dateJSON) {
    return String(dateJSON.year + "-" + dateJSON.month + "-" + dateJSON.day);
}

function log_use(request){
    // Tracks how many users access the website and how they're accessing it
    var origin = request.headers.origin;
    var agent = request.headers["user-agent"];

    read("./json/use_logs.json", (data) => {
        // Gets the logs we already have:
        var logs = JSON.parse(data);


        // Increments the current count:
        logs.use_count = logs.use_count + 1;

        // Pushes the origin and agents onto the lists:

        logs.origins.push(origin);
        logs.agents.push(agent)


        fs.writeFile("./json/use_logs.json", JSON.stringify(logs), (err) => {
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

module.exports = {
    save : save,
    read : read,
    log_use : log_use,
    create_specifications : create_specifications,
    create_checkboxes : create_checkboxes,
    create_date_string : create_date_string,
    convert_number_to_month: convert_number_to_month
}