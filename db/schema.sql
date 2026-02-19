DROP TABLE IF EXISTS employees;

CREATE TABLE employees(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(40) UNIQUE NOT NULL,
    birthday DATE,
    salary INT NOT NULL
)
