USE employees_db;

INSERT INTO department(name)
VALUES
	('Accounting'),
	('Engineering'),
    ('Human Resources'),
    ('Sales');
    
INSERT INTO role(title, salary, department_id)
VALUES
	('Accounting Manager', 130000, 1),
    ('Accounting Officer', 80000, 1),
    ('Lead Engineer', 110000, 2),
    ('Software Engineer', 70000, 2),
    ('Human Resource Manager', 90000, 3),
    ('Human Resource Generalist', 50000, 3),
    ('Sales Manager', 100000, 4),
    ('Sales Consultant', 60000, 4);
    
INSERT INTO employee(firstname, lastname, role_id, manager_id)
VALUES
    ('Julie', 'Barnette', 1, NULL),
    ('Samantha', 'Lipscomb', 2, 1),
    ('George', 'Williams', 3, NULL),
    ('Yousef', 'Jackson', 4, 3),
    ('Rena', 'Radcliff', 5, NULL),
    ('Jalen', 'Jarrett', 6, 5),
    ('Morgan', 'Daniels', 7, NULL),
    ('Michael', 'Donovan', 8, 7);