// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var resv = require("./Data/reserveData");
var waitList = require("./Data/waitListData");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    // res.send("Welcome to the Table Reservation Home Page!")
    res.sendFile(path.join(__dirname, "Public/home.html"));
});

// Basic route that sends the user first to the AJAX Page
app.get("/make-reservation", function (req, res) {
    // res.send("Welcome to the Table Reservation Home Page!")
    res.sendFile(path.join(__dirname, "Public/make.html"));
});

// Basic route that sends the user first to the AJAX Page
app.get("/tables", function (req, res) {
    // res.send("Welcome to the Table Reservation Home Page!")
    res.sendFile(path.join(__dirname, "Public/table.html"));
});

// Basic route that sends the user first to the AJAX Page
app.get("/api/reservations", function (req, res) {
    // res.send("Welcome to the Table Reservation Home Page!")
    return res.json(resv);

});

// Basic route that sends the user first to the AJAX Page
app.get("/api/waitlist", function (req, res) {
    // res.send("Welcome to the Table Reservation Home Page!")
    return res.json(waitList);
});

app.post("/make-reservation", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newResv = req.body; 
    if(resv.length < 5) {
        resv.push(newResv); 
    } else {
        waitList.push(newResv); 
    }
    res.json(newResv);
}); 

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
