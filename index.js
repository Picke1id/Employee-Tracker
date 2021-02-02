const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

// CALL TO DISPLAY LOGO 
displayLogo();

// FUNCTION TO CREATE LOGO
function displayLogo() {
    const logoText = logo({ name: "Employee Tracker"}).render();
    console.log(logoText);
};

// FUNCTION TO CREATE PROMPTS FOR USER
async function showPrompts(){
    const {userChoice} = await inquirer.prompt([
        {
            type: "list",
            name: "userChoice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: 1
                },
                {
                    name: "Add Employee",
                    value: 2
                },
                {
                    name: "Update Employee Role",
                    value: 3
                },
                {
                    name: "View All Roles",
                    value: 4
                },
                {
                    name: "Add Role",
                    value: 5
                },
                {
                    name: "View all Departments",
                    value: 6
                },
                {
                    name: "Add Department",
                    value: 7
                },
                {
                    name: "Quit",
                    value: 8
                }    
            ]
        }
    ])
    switch(userChoice){
        case 1:
            viewEmployees()
            break;
        case 2:
            addEmployee()
            break;
        case 3:
            updateEmployeeRole()
            break;
        case 4:
            viewRoles()
            break;
        case 5:
            addRole()
            break;
        case 6:
            viewDepartments()
            break;
        case 7:
            addDepartment()
            break;
        case 8:
            quit();
            default:
                break;
    }
}

// CALL TO DISPLAY PROMPTS
showPrompts();

// FUNCTIONS FOR VIEWING, ADDING, AND UPDATING EMPLOYEES

async function viewEmployees() {
    
    let employees = await db.findEmployee();
    console.log("\n");
    console.table(employees);
    showPrompts();
}

async function addEmployee() {

    let roles = await db.findRoles();
   
    const roleOptions = roles.map(({id, title}) => ({
        name: title,
        value: id
    }));

    let employee = await inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstname"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastname"
        }
    ]);

    let {roleID} = await inquirer.prompt([
        {
            type: "list",
            message: "Which role would you like to give this employee?",
            name: "roleID",
            choices: roleOptions
        }
    ]);

    employee.role_id = roleID;

    await db.createNewEmployee(employee); 
    console.log("You have successfully added the new employee to the database!");
    showPrompts();
}

async function updateEmployeeRole() {

    let employees = await db.findEmployee();
   
    const employeeOptions = employees.map(({ id, firstname, lastname}) => ({
        name: `${firstname} ${lastname}`,
        value: id
    }));
    
    let {employeeID} = await inquirer.prompt([
            {
                type: "list",
                message: "Which employee would you like to update?",
                name: "employeeID",
                choices: employeeOptions
            }
    ]);
    
    let roles = await db.findRoles();
    
    const roleOptions = roles.map(({id, title}) => ({
        name: title,
        value: id
    }));

    
    let {roleID} = await inquirer.prompt([
        {
            type: "list",
            message: "Which role would you like to give this employee?",
            name: "roleID",
            choices: roleOptions
        }
    ]);

    await db.updateRole(employeeID, roleID);
    console.log("Role has been updated!");
    showPrompts();
}


// FUNCTIONS FOR VIEWING AND ADDING ROLES

async function viewRoles() {

    let roles = await db.findRoles();
    console.log("\n");
    console.table(roles);
    showPrompts();
}

async function addRole() {

    let department = await db.findDepartment();

    const departmentOptions = department.map(({id, name}) => ({
        name: name,
        value: id
    }));

    let role = await inquirer.prompt([
        {
            type: "input",
            message: "What role would you like to add?",
            name: "title"
        },
        {
            type: "input",
            message: "What is the salary of this role?",
            name: "salary"
        },
        {
            type: "list",
            message: "Which department are you adding this role to?",
            name: "department_id",
            choices: departmentOptions
        }
    ]);
    
    await db.createNewRole(role);
    console.log("New role has been successfully added!");
    showPrompts();
}

// FUNCTIONS FOR VIEWING AND ADDING DEPARTMENTS

async function viewDepartments() {

    let departments = await db.findDepartment();
    console.log("\n");
    console.table(departments);
    showPrompts();
}

async function addDepartment() {
    let roles = await db.findRoles();

    const roleOptions = roles.map(({ id, title}) => ({
        name: title,
        value: id
    }));

    let department = await inquirer.prompt([
        {
            type: "input",
            message: "Please enter the department you wish to add.",
            name: "name"
        }
    ]);
    
    await db.createNewDepartment(department);
    console.log("Department has been successfully added!");
    showPrompts();
}

// FUNCTION TO QUIT APPLICATION
function quit() {
    let logoText = logo({ name: "Thank You!"}).render();
    console.log(logoText);
    process.exit();
}