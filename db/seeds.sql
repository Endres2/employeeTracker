USE employee;
INSERT INTO department (name)
VALUES ("Data Base"),
       ("Software"),
       ("Marketing"),
       ("Sales"),
       ("IT");

INSERT INTO role ( title, salary, department_id)
VALUES ( "Manager", 150000,1),
       ( "Intern", 60000,2),
       ( "Jr",90000,2),
       ( "Senior",140000,2);

       
INSERT INTO employee ( first_name, last_name, role_id, manager_id,is_Manager)
VALUES ("Jhon", "Smith",3,null,false),
       ("Frank","Weaver",2,null,false),
       ("Tracy", "Langston",1,null,true),
       ("Chaya","Lock",3,null,false),
       ("Fred","Ocean",4,null,false),
       ("Jeremy", "Michaels",2,null,false),
       ("Andres","Hernandez",1, null,true);
       
