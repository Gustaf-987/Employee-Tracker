var mysql = require("mysql");
var inquirer = require("inquirer");


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
    afterConnection("employee");
    init();
});

function afterConnection(table) {
    connection.query(`SELECT * FROM ${table}`, function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}

function init() {
    inquirer.prompt([{
        type: "list",
        name: "begin",
        message: "Please select from the options",
        choices: ["View", "Add", "Update", "Exit"],
    }]).then(function(res) {
        switch (res.begin) {
            case "View":
                views();
                break;
            case "Add":
                add();
                break;
            case "Update":
                updateEmployee();
                break;
            case "Exit":
                console.log("Exit");
                break;
            default:
                console.log("default");


        }
    })
}

function views() {
    inquirer.prompt([{
        type: "list",
        name: "views",
        message: "Select which option",
        choices: ["All Employees", "View Departments", "View Roles"]
    }]).then(function(res) {
        switch (res.view) {
            case "All Employees":
                allEmployees();
                break;
            case "View Departments":
                departmentView();
                break;
            case "View Roles":
                roleView();
                break;
            default:
                console.log("Default");
        }
    })
}

function allEmployees() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
    })
}

function departmentView() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
    })
}

function roleView() {
    connection.query("SELECT * FROM roles", function(err, res) {
        if (err) throw err;
        console.table(res);
    })
}

function add() {
    inquirer.prompt([{
        type: "list",
        name: "add",
        message: "Select what you would like to add",
        choices: ["Add Dept", "Add Role", "Add Employee"]
    }]).then(function(res) {
        switch (res.add) {
            case "Add Dept":
                addDepartment()
                break;
            case "Add Role":
                addRole()
                break;
            case "Add Employee":
                addEmployee()
                break;
            default:
                console.log("default");
        }
    })
}

function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What department would you like to add?"
    }]).then(function(response) {
        connection.query(`INSERT INTO department (name) Values('${response.department}');`, function(err, res) {
            if (err) throw err;
        })
    })
}

function addRole() {
    inquirer.prompt([{
        type: "input",
        name: "Role",
        message: "What Role would you like to add?"
    }]).then(function(response) {
        connection.query(`INSERT INTO role (name) Values('${response.role}');`, function(err, res) {
            if (err) throw err;
        })
    })
}

function addEmployee() {
    inquirer.prompt([{
        type: "input",
        name: "employee",
        message: "What employee would you like to add?"
    }]).then(function(response) {
        connection.query(`INSERT INTO employee (name) Values('${response.employee}');`, function(err, res) {
            if (err) throw err;
        })
    })
}