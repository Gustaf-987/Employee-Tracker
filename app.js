var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "employee_trackerDB",
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    // afterConnection("employee");
    init();
});

function mainPrompt() {


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
                connection.end();
                return;
            default:
                console.log("default");


        }
    })

}

function init() {
    mainPrompt();
}

function views() {
    inquirer.prompt([{
        type: "list",
        name: "views",
        message: "Select which option",
        choices: ["All Employees", "View Departments", "View Roles"]
    }]).then(function(res) {
        switch (res.views) {
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
    console.log("allEmployees");
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);

    })
    console.log("all employee query");
    mainPrompt();
}

function departmentView() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
    })
    mainPrompt();
}

function roleView() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
    })
    mainPrompt();
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

        connection.query(`INSERT INTO department (dept_name) VALUES ("${response.department}");`, function(err, res) {
                if (err) throw err;
                mainPrompt();
            })
            // console.log("response", response)
    })

}

function addRole() {
    inquirer.prompt([{
            type: "input",
            name: "title",
            message: "What Role would you like to add?"
        },
        {
            type: "number",
            name: "salary",
            message: "What is the salary?"
        },
        {
            type: "input",
            name: "department_id",
            message: "What is the dept Id?"
        }

    ]).then(function(response) {
        connection.query(`INSERT INTO role (title, salary, department_id) Values('${response.title}', 
        '${response.salary}', '${response.department_id}');`, function(err, res) {
            if (err) throw err;
            mainPrompt();
        })
    })

}

function addEmployee() {
    inquirer.prompt([{
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the employee's Id?"
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is the employee's manger Id?"
        }
    ]).then(function(response) {
        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) Values('${response.first_name}', '${response.last_name}', '${response.role_id}', '${response.manager_id}');`, function(err, res) {
            if (err) throw err;
            mainPrompt();
        })
    })

}

function updateEmployee() {
    connection.query(`SELECT id, first_name, last_name from employee;`, function(err, results) {
        if (err) throw err;
        let employeeArr = [];

        for (let i = 0; i < results.length; i++) {
            let employee = { name: results[i].first_name + " " + results[i].last_name, value: results[i].id }
            employeeArr.push(employee);

        }
        inquirer.prompt([{
                type: "list",
                name: "employee",
                message: "Please select the employee to update",
                choices: employeeArr
            },
            {
                type: "input",
                name: "role_id",
                message: "Please enter new Id",
            }
        ]).then(answers => {
            console.log(answers)
            connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [answers.role_id, answers.employee], function(err, results) {
                if (err) throw err;
                mainPrompt();
            })
        })


    })
}