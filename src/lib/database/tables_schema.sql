DROP TABLE IF EXISTS champions;
DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL COLLATE NOCASE,
		UNIQUE (description)
);

CREATE TABLE champions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role_id INTEGER NOT NULL,
		img_path TEXT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
		UNIQUE (name)
);

CREATE VIEW champions_view AS
SELECT champions.*, roles.description AS role
FROM champions
JOIN roles ON champions.role_id = roles.id;

INSERT INTO roles (description) VALUES
('Frontline'), 
('Damage'), 
('Flank'), 
('Support');

INSERT INTO champions (name, role_id, img_path) VALUES
('Fernando', 1, 'images/champions/fernando.jpeg'),
('Barik', 1, 'images/champions/barik.jpeg'),
('Ruckus', 1, 'images/champions/ruckus.jpeg'),
('Makoa', 1, 'images/champions/makoa.jpeg'),
('Inara', 1, 'images/champions/inara.jpeg'),
('Ash', 1, 'images/champions/ash.jpeg'),
('Torvald', 1, 'images/champions/torvald.jpeg'),
('Terminus', 1, 'images/champions/terminus.jpeg'),
('Khan', 1, 'images/champions/khan.jpeg'),
('Atlas', 1, 'images/champions/atlas.jpeg'),
('Yagorath', 1, 'images/champions/yagorath.jpeg'),
('Vora', 1, 'images/champions/vora.jpeg'),
('Rei', 1, 'images/champions/rei.jpeg'),
('MalDamba', 4, 'images/champions/maldamba.jpeg'),
('Pip', 4, 'images/champions/pip.jpeg'),
('Grover', 4, 'images/champions/grover.jpeg'),
('Seris', 4, 'images/champions/seris.jpeg'),
('Ying', 4, 'images/champions/ying.jpeg'),
('Grohk', 4, 'images/champions/grohk.jpeg'),
('Jenos', 4, 'images/champions/jenos.jpeg'),
('Furia', 4, 'images/champions/furia.jpeg'),
('Io', 4, 'images/champions/io.jpeg'),
('Corvus', 4, 'images/champions/corvus.jpeg'),
('Cassie', 2, 'images/champions/cassie.jpeg'),
('Viktor', 2, 'images/champions/viktor.jpeg'),
('Tyra', 2, 'images/champions/tyra.jpeg'),
('Bomb King', 2, 'images/champions/bombking.jpeg'),
('Drogoz', 2, 'images/champions/drogoz.jpeg'),
('Kinessa', 2, 'images/champions/kinessa.jpeg'),
('Strix', 2, 'images/champions/strix.jpeg'),
('Sha Lin', 2, 'images/champions/shalin.jpeg'),
('Lian', 2, 'images/champions/lian.jpeg'),
('Willo', 2, 'images/champions/willo.jpeg'),
('Talus', 2, 'images/champions/talus.jpeg'),
('Moji', 2, 'images/champions/moji.jpeg'),
('Octavia', 2, 'images/champions/octavia.jpeg'),
('Saati', 2, 'images/champions/saati.jpeg'),
('Tiberius', 2, 'images/champions/tiberius.jpeg'),
('Androxus', 3, 'images/champions/androxus.jpeg'),
('Buck', 3, 'images/champions/buck.jpeg'),
('Evie', 3, 'images/champions/evie.jpeg'),
('Maeve', 3, 'images/champions/maeve.jpeg'),
('Lex', 3, 'images/champions/lex.jpeg'),
('Zhin', 3, 'images/champions/zhin.jpeg'),
('Skye', 3, 'images/champions/skye.jpeg'),
('Koga', 3, 'images/champions/koga.jpeg');