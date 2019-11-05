INSERT INTO users (username, email, password_hash)
VALUES ('lauren', 'lauren@test.com', 'lauren'),
        ('tres', 'tres@test.com', 'tres'),
        ('hudson', 'hudson@test.com', 'hudson');


INSERT INTO prompts (name, text, language) 
VALUES ('Prompt 1', 'Describe the weather today.', 'english'),
  ('Prompt 2', 'I am prompt 2.', 'french'),
  ('Prompt 3', 'I am prompt 3.', 'spanish'),
  ('Prompt 4', 'I am prompt 4.', 'japanese'),
  ('Prompt 5', 'I am prompt 5.', 'french'),
  ('Prompt 6', 'I am prompt 6.', 'russian'),
  ('Prompt 7', 'I am prompt 7.', 'japanese'),
  ('Prompt 8', 'I am prompt 8.', 'french');


INSERT INTO answers (prompt_id, correct_text) 
VALUES (1, 'It is raining.');