const connection = require('./connection');

class Database {

    constructor(connection) {
        this.connection = connection;
    }

    findEmployee() {
        return this.connection.query(
            "SELECT * FROM employee"
        )
    }

    createNewEmployee(employee) {
        return this.connection.query(
            "INSERT INTO employee SET ?", employee
        );
    }

    updateRole(employeeID, roleID) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?", [roleID, employeeID]
        );
    }

    findRoles() {
        return this.connection.query(
            "SELECT * FROM role"
        );
    }

    createNewRole(role) {
        return this.connection.query(
            "INSERT INTO role SET ?", role
        );
    }

    findDepartment() {
        return this.connection.query(
            "SELECT * FROM department"
        );
    }

    createNewDepartment(department) {
        return this.connection.query(
            "INSERT INTO department SET ?", department
        );
    }
}

module.exports = new Database(connection);