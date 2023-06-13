 INSERT INTO department (name) 
VALUES
  ('Sales'),
  ('Marketing'),
  ('Engineering'),
  ('IT'),
  ('Finance');

INSERT INTO role (title, salary, department_id) 
VALUES
  ('Sales Associate', 50000, 1),
  ('Sales Manager', 80000, 1),
  ('Marketing Specialist', 60000, 2),
  ('Software Engineer', 70000, 3),
  ('Senior Software Engineer', 90000, 3),
  ('Financial Analyst', 65000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, NULL),
  ('Michael', 'Johnson', 3, NULL),
  ('Emily', 'Williams', 4, 1),
  ('David', 'Brown', 5, 2),
  ('Jessica', 'Taylor', 6, 3);

