const inquirer = require("inquirer");
const db = require("./db/dbQueries");
const roleList = [];
const managerList = [];
const employeeList = [];

viewEmployees = () => {
    db.findAllEmployees().then((rows) =>{
        console.table(rows);
    })
    .then( ()=>{
        start();
    });
}
showDepartments = () => {
    db.showDepartments().then((rows) =>{
        console.table(rows);
        rows.forEach(element => {
            roleList.push(element);
        });
    })
    .then( ()=>{
        start();
    });

}
showRole = () =>{
    db.showRole().then((rows) =>{
        console.table(rows);
    })
    .then( ()=>{
        start();
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
getDepartmentList = () =>{
    db.showDepartments().then((rows) =>{
        rows.forEach(element => {
            //console.log(element.name);
            roleList.push(element.name);
        });
    });
}
getManagers = () =>{
    db.getManagers().then((rows) =>{
        rows.forEach(element => {
            let x = (element.first_name + " "+ element.last_name +" "+element.id);
            managerList.push(x);
        });
    });
}
getEmployeesName = () =>{
    db.findAllEmployees().then((rows) =>{
        rows.forEach(element => {
            let x = (element.first_name + " "+ element.last_name +" "+element.id);
            employeeList.push(x);
        });
    })
}
getRoleId = (name) =>{
    db.getRole(name).then((rows) =>{
        console.log(rows.id);
    })
                    
}

const usage = [
    {
        message:"What would you like to do?",
        type: "list",
        choices: ["View all employees","Show Departments","Show Roles","Create a department","Create a role","Create an employee","Update employee's role"],
        name: "activity"
    }
]




//insertRole("Ya boy", 100000, 2);
//addEmployee("Andres", "Hernandez", 2, 7);
//updateRole(2,1);

start = () =>{
    inquirer.
        prompt(usage)
        .then((ans) =>{
            if(ans.activity == "View all employees"){
                viewEmployees();

            }
            else if(ans.activity == "Show Departments"){
                showDepartments();
            }
            else if(ans.activity == "Show Roles"){
                showRole();
            }
            else if(ans.activity == "Create a department"){
                inquirer.prompt(
                    [
                        {
                            message:"What is the name of the department?",
                            type:"input",
                            name:"department"
                        }
                    ]
                )
                .then((ans) =>{
                    insertDepartment(ans.department);
                })
                .then(() =>{
                    start();
                })
            }
            else if(ans.activity == "Create a role"){
                
             
                inquirer.prompt(
                    [
                        {
                            message:"What is the name of the role?",
                            type:"input",
                            name:"role"
                        },
                        {
                            message:"How much does it pay a year?",
                            type:"input",
                            name:"pay"
                        },
                        {
                            message:"To what department do we add this role to?",
                            type:"list",
                            name:"department",
                            choices: roleList
                        }

                    ]
                )
                .then((ans) =>{
                    insertDepartment(ans.department);
                })
                .then(() =>{
                    start();
                })
            }
            else if(ans.activity == "Create an employee"){
                inquirer.prompt(
                    [
                        {
                            message:"What is the first name?",
                            type:"input",
                            name:"first_name"
                        },
                        {
                            message:"What is the last name?",
                            type:"input",
                            name:"pay"
                        },
                        {
                            message:"To what department are we adding the employee?",
                            type:"list",
                            name:"department",
                            choices: roleList
                        },
                        {
                            message:"Who is the employee's manager?",
                            type:"list",
                            name:"manager",
                            choices: managerList
                        }

                    ]
                )
                .then((ans) =>{
                    // let z = db.getRole(ans.department);
                    // console.log(z);
                    let y = ans.manager.split(" ")
                    const managerID = (y[2]);
                    addEmployee(ans.first_name, ans.last_name, 2 , managerID)
                })
                .then(() =>{
                    start();
                })
            }
            else{
                inquirer.prompt(
                    [
                    
                        {
                            message:"What department are we switching the employee to?",
                            type:"list",
                            name:"department",
                            choices: roleList
                        }

                    ]
                )
                .then((ans) =>{
                    insertDepartment(ans.department);
                })
                .then(() =>{
                    start();
                })
            }
        })
        .catch((error) => {
            error ? console.log(error) : console.log("Done")
        });
}
start();
getDepartmentList();
getManagers();
