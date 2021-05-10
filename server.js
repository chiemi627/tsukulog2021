const express = require("express");
const bodyParser = require("body-parser");
const basicAuth = require('./basicAuth');
const app = express();
app.set("view engine", "ejs");
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(basicAuth);
module.exports = app;


// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// init sqlite db
const dbFile = "tsukutter.db";
//const dbFile = "https://cdn.glitch.com/9f780427-2d67-43db-8909-7b1264c5c820%2Ftsukutter.db?v=1618911440340";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

app.get("/", (request, response) => {
    const query = "SELECT display_name,content from tweet";
    db.all(query, (err, rows) => {
        response.render("index.ejs", { results: rows });
    });
});


app.get("/query", (request, response) => {
    const query = "SELECT display_name,content from tweet where display_name = ?";
    db.all(query, request.query.display_name, (err, rows) => {
        response.render("index.ejs", { results: rows });
    });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});