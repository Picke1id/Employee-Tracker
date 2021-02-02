const util = require("util");
const mysql = require("mysql");

// FUNCTION TO CREATE CONNECTION
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "NyNm2020$$",
    database: "employees_db"
});

connection.connect();

// ADDING ABILITY TO RETURN CALLBACK RESPONSES IN A PROMISE
connection.query = util.promisify(connection.query);

module.exports = connection;
