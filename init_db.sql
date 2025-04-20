CREATE TABLE exos (
    id INTEGER PRIMARY KEY,
    thematique TEXT CHECK (thematique IN ('Boucles', 'Listes', 'Conditions')),
    numero INTEGER CHECK (numero IN (1, 2, 3)),
    langage TEXT CHECK (LOWER(langage) IN ('python', 'c')),
    resultat TEXT
);

CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   email TEXT,
   password TEXT
);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    exo_id INTEGER REFERENCES exos(id),
    note INTEGER
);


INSERT INTO exos (id, thematique, numero, langage, resultat) VALUES
(1, 'Boucles', 1, 'Python', '10'),
(2, 'Boucles', 1, 'C', '10'),
(3, 'Boucles', 2, 'Python', '2'),
(4, 'Boucles', 2, 'C', '2'),
(5, 'Boucles', 3, 'Python', '876543210'),
(6, 'Boucles', 3, 'C', '876543210'),

(7, 'Listes', 1, 'Python', '523'),
(8, 'Listes', 1, 'C', '523'),
(9, 'Listes', 2, 'Python', '10'),
(10, 'Listes', 2, 'C', '10'),
(11, 'Listes', 3, 'Python', '2'),
(12, 'Listes', 3, 'C', '2'),

(13, 'Conditions', 1, 'Python', 'négatif'),
(14, 'Conditions', 1, 'C', 'négatif'),
(15, 'Conditions', 2, 'Python', 'impair'),
(16, 'Conditions', 2, 'C', 'impair'),
(17, 'Conditions', 3, 'Python', 'non premier'),
(18, 'Conditions', 3, 'C', 'non premier');

