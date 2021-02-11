DROP DATABASE IF EXISTS employee_trackerDB;    

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
    primary key (id),
    id INTEGER(30) auto_increment,
    dept_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    primary key (id),
    id INTEGER(30) auto_increment,
    title VARCHAR(30),
    salary DECIMAL(6),
    department_id INT
    -- INDEX dept_index (department_id), 
    -- CONSTRAINT  fk_department foreign key (department_id) REFERENCES deptartment(id)
    -- ON DELETE CASCADE 


);

CREATE TABLE employee (
    primary key (id),
    id INTEGER(30) auto_increment,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT default NULL
    -- CONSTRAINT fk_manager FOREIGN KEY (manager_id)
    -- REFERENCES employee (id) ON DELETE SET NULL ,
    -- CONSTRAINT fk_role FOREIGN KEY (role_id) 
    -- REFERENCES role(id) ON DELETE CASCADE
);

-- INSERT INTO department (dept_name)
-- VALUES ("sales");
-- INSERT INTO role (title, salary, department_id) 
-- VALUES ("rep", 100, 1);
-- INSERT INTO employee (first_name, last_name, role_id, manager_id) 
-- VALUES ("Joe", "test", 1, 1);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
