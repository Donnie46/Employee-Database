const inquirer = require('inquirer');
const mysql = require('mysql2');
const questions = [

    {
        type: 'list',
        message: 'Please choose from the following list of choices:',
        name: 'action',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    },
];

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Emory1105',
        database: 'empTracker_db'
    },
    console.log(`Connected to the classlist_db database.`)
);

function init() {
    inquirer
        .prompt(questions)
        .then(response => {
            switch (response.action) {
                case 'View all department':
                    allDepartments();
                    break
                case 'View all roles':
                    allRoles();
                    break
                case 'View all employees':
                    allEmployees();
                    break
                case 'Add a department':
                    addDepartment();
                    break
                case 'Add a role':
                    addRole();
                    break
                case 'Add an employee':
                    addEmployee();
                    break
                case 'Update an employee role':
                    updateEmployee();
                    break
            }
        })
};

function allDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        init();
    });
};

function allRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        init();
    });
};

function allEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        init();
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Please give the name of the department:'
        }
    ]).then(response => {
        db.query('INSERT INTO department set ?', response, function (err, results) {
            console.log('Department added')
            init();
        })
    })
}

function addRole() {
    db.query('SELECT name as name, id as value from department', function (err, results) {
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Please provide the title of the role:'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Please provide the salary of the role:'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Please provide the department:',
                choices: results,
            },
        ]).then(response => {
            db.query('INSERT INTO role set ?', response, function (err, results) {
                console.log('Role added')
                init();
            })
        })
    })
}

function addEmployee() {
    db.query('SELECT title as name, id as value from role', function (err, roles) {
        db.query('SELECT last_name as name, id as value from employee', function (err, managers) {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Please provide the employees first name:',
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Please provide the employees last name:',
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Please provide the employees role from a list of choices:',
                    choices: roles,
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Please provide the employees' manager from a list of choices:",
                    choices: managers,
                },
            ]).then(response => {
                db.query('INSERT INTO employee set ?', response, function (err, results) {
                    console.log('Employee added')
                    init();
                })
            })
        })
    })
}


init()