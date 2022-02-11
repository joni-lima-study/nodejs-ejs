const mysql = require('mysql');
var db = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "user",
    database: "supermercados",
});

module.exports = db;