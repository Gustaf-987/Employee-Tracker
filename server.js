var mysql = require("mysql");
var inquirer = require("inquirer");
var console = require("console.table");
const { table } = require("console");


var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",
    database: "employee_trackerDB",
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query(`"SELECT * FROM '${table}'"`, function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}