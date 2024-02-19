const mysql = require("mysql2");

connection = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "classicmodels",
    password: "classicmodels",
    database: "classicmodels"
})

module.exports = connection;