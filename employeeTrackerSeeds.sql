CREATE DATABASE employe_trackerDB;

USE employe_trackerDB;

CREATE TABLE department (
    primary key (id),
    id INTEGER(30),
    name VARCHAR(30)
);

CREATE TABLE role (
    primary key (id),
    id INTEGER(30),
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);

CREATE TABLE employee (
    primary key (id),
    id INTEGER(30),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL
)