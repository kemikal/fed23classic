var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connection = require("./lib/conn.js");
const cors = require("cors")

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get("/categories", (req, res) => {

    connection.connect((err) => {
        if (err) console.log("err", err);

        let query = "SELECT * FROM productlines"

        connection.query(query, (err, data) => {
            if (err) console.log("err", err);

            console.log("Data", data);
            res.json(data);
        })
    })
})

app.get("/products", (req, res) => {

    connection.connect((err) => {
        if (err) console.log("err", err);

        let query = "SELECT * FROM products"

        connection.query(query, (err, data) => {
            if (err) console.log("err", err);

            console.log("Data", data);
            res.json(data);
        })
    })
})

app.get("/products/:kat", (req, res) => {

    console.log("kat", req.params.kat);

    connection.connect((err) => {
        if (err) console.log("err", err);

        let query = "SELECT * FROM products WHERE productLine = ?"; // + req.params.kat;
        let values = [req.params.kat];

        connection.query(query, values, (err, data) => {
            if (err) console.log("err", err);

            console.log("Data", data);
            res.json(data);
        })
    })
})

module.exports = app;
