INSERT INTO users (username, email, password_hash)
VALUES ('lauren', 'lauren@test.com', 'lauren'),
        ('tres', 'tres@test.com', 'tres'),
        ('hudson', 'hudson@test.com', 'hudson');


INSERT INTO prompts (name, text, language, entities) 
VALUES ('Prompt 1', 'Describe the weather today.', 'english', 'weather'),
  ('Prompt 2', 'Describe your favorite movie', 'english', 'movies'),
  ('Prompt 3', 'Describe your favorite book', 'english', 'books'),
  ('Prompt 4', 'Describe your favorite area', 'english', 'areas'),
  ('Prompt 5', 'Describe your favorite name', 'english', 'names'),
  ('Prompt 6', 'Describe your favorite car', 'english', 'cars'),
  ('Prompt 7', 'Describe your favorite place', 'english', 'place'),
  ('Prompt 8', 'Describe your favorite person', 'english', 'person');


INSERT INTO answers (prompt_id, correct_text) 
VALUES (1, 'It is raining.');
