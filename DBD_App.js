// Pulls in environmental variables:
require('dotenv').config();

// Allows for more accurate path manipulation:
var path = require("path");

// Imports Express, the backbone of the app:
var express = require("express");

// Imports middleware for easy session authentication:
var session = require("express-session");

// Creates the app itself:
var app = express();

// Applies session middleware:
app.use(session({ secret: process.env.COOKIE_KEY }))

// Tells the app how to decode certain communication protocols:
app.use(express.json());
app.use(express.urlencoded());

// Sets the view engine for admin functions:
app.set("view engine", "pug")

// Allows the app access to the build folder, where the compiled
// React files will be waiting to be served:
app.use('/', express.static(path.join(__dirname, "public")))
app.use('/', express.static(path.join(__dirname, "build")))

// Convenience variable definition:
var port = process.env.PORT;
var url = process.env.URL;

// Pulls in routers:
app.get("/", (req, res) => {
    res.render("index")
})

var getMenuRouter = require("./routes/website/getMenu")
var getDateRouter = require("./routes/website/getDate")
var loginRouter = require("./routes/admin/login")
var dashboardRouter = require("./routes/admin/dashboard")
var adminRouter = require("./routes/admin/admin")
// var scheduleUpdateRouter = require("./routes/admin/scheduleUpdate")
var verifyUserRouter = require("./routes/admin/verifyUser")
var submitChangesRouter = require("./routes/admin/submitChanges")


// Applies routers to the App.
//// These routes are used for the public portion of the website:
app.use("/", getMenuRouter)
app.use("/", getDateRouter)

//// The routes below need to be properly implemented:
//
app.use("/admin", adminRouter)
app.use("/dashboard", dashboardRouter)
// app.use("/scheduleUpdate", scheduleUpdateRouter)
app.use("/login", loginRouter)
app.use("/verifyUser", verifyUserRouter)
app.use("/submitChanges", submitChangesRouter)
//
////

// Spin up the app and start listening:
app.listen(port, () => {
    console.log("Running app at " + url + ":" + port)
});