const inquirer = require("inquirer");
const db = require("./db/dbQueries");


viewEmployees = () => {
    db.findAllEmployees().then((rows) =>{
        console.table(rows);
    });
}
showDepartments = () => {
    db.showDepartments().then((rows) =>{
        console.table(rows);
    });

}
showRole = () =>{
    db.showRole().then((rows) =>{
        console.table(rows);
    });
}
insertDepartment = (name) =>{
    db.insertDepartment(name).then((rows)=>{
        console.log("Added "+name+" to departments!")
    });
}
insertRole = (title,salary,dep_id) =>{
    db.insertRole(title,salary,dep_id).then((rows)=>{
        console.log("Added "+title+" as a new role with $"+salary+"/y and department #"+ dep_id+"!")
    });
}
addEmployee = (first,last,role,manager)=>{
    db.addEmployee(first,last,role,manager).then((rows)=>{
        console.log("Added employee: "+first+" "+last+" with the role of "+ role+" under the manager "+manager);
    });
}
updateRole = (id,role)=>{
    db.updateRole(id,role).then((rows) =>{
        console.log("Employee #"+id+" was updated to role "+ role);
        console.table(rows);
    });
}
//viewEmployees();
//showDepartments();
//showRole();
//insertDepartment("TEST");
//insertRole("Ya boy", 100000, 2);
//addEmployee("Andres", "Hernandez", 2, 7);
updateRole(2,1);