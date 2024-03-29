DROP DATABASE IF EXISTS employee;
create DATABASE employee;

USE employee;

CREATE TABLE department(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) 
);

CREATE TABLE role(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    
);

CREATE TABLE employee(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY(role_id)
    REFERENCES role(id),
    manager_id INT,
    FOREIGN KEY(manager_id)
    REFERENCES employee(id),
    is_manager BOOLEAN
);

