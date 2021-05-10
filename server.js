const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
module.exports = app;


// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

app.use(express.static("public"));

// init sqlite db
const dbFile = "tabelog.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);


app.get("/item/:id", (request, response) => {
    const query = "SELECT name,genre,address,closed,rate FROM item where shopID=?";
    db.all(query, request.params.id, (err, rows) => {
        response.render("tabelog.ejs", rows[0]);
    });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});