const connection = require("./connection");

class DB{
    constructor(connection){
        this.connection = connection;
    }
    findAllEmployees(){
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;");
    }
    showDepartments(){
        return this.connection.query("SELECT * FROM department;");
    }
    showRole(){
        return this.connection.query("SELECT * FROM role;");
    }
    // getRole(name){
    //     return this.connection.query("SELECT role.id FROM role where role.title = "+name);
    // }
    insertDepartment(name){
        return this.connection.query("INSERT INTO department (name) VALUES ('"+name+"')");
        
    }
    insertRole(title,salary,dep_id){
        return this.connection.query("INSERT INTO role (title,salary,department_id) VALUES ('"+title+"','"+salary+"','"+dep_id+"')");
        
    }
    addEmployee(first,last,role,manager){
        return this.connection.query("INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('"+first+"','"+last+"','"+role+"','"+manager+"')");
    }
    updateRole(id,role){
        this.connection.query("UPDATE employee SET role_id ="+role+" WHERE id = "+id);
        return this.connection.query("SELECT first_name FROM employee WHERE id="+id);
    }
    getManagers(){
        return this.connection.query("SELECT employee.first_name, employee.last_name, employee.id FROM employee WHERE is_manager = 1");
    }
}

module.exports = new DB(connection);
