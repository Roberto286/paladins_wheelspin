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
('Fernando', 1, '/resources/images/champions/fernando.jpeg'),
('Barik', 1, '/resources/images/champions/barik.jpeg'),
('Ruckus', 1, '/resources/images/champions/ruckus.jpeg'),
('Makoa', 1, '/resources/images/champions/makoa.jpeg'),
('Inara', 1, '/resources/images/champions/inara.jpeg'),
('Ash', 1, '/resources/images/champions/ash.jpeg'),
('Torvald', 1, '/resources/images/champions/torvald.jpeg'),
('Terminus', 1, '/resources/images/champions/terminus.jpeg'),
('Khan', 1, '/resources/images/champions/khan.jpeg'),
('Atlas', 1, '/resources/images/champions/atlas.jpeg'),
('Yagorath', 1, '/resources/images/champions/yagorath.jpeg'),
('Vora', 1, '/resources/images/champions/vora.jpeg'),
('Rei', 1, '/resources/images/champions/rei.jpeg'),
('MalDamba', 4, '/resources/images/champions/maldamba.jpeg'),
('Pip', 4, '/resources/images/champions/pip.jpeg'),
('Grover', 4, '/resources/images/champions/grover.jpeg'),
('Seris', 4, '/resources/images/champions/seris.jpeg'),
('Ying', 4, '/resources/images/champions/ying.jpeg'),
('Grohk', 4, '/resources/images/champions/grohk.jpeg'),
('Jenos', 4, '/resources/images/champions/jenos.jpeg'),
('Furia', 4, '/resources/images/champions/furia.jpeg'),
('Io', 4, '/resources/images/champions/io.jpeg'),
('Corvus', 4, '/resources/images/champions/corvus.jpeg'),
('Cassie', 2, '/resources/images/champions/cassie.jpeg'),
('Viktor', 2, '/resources/images/champions/viktor.jpeg'),
('Tyra', 2, '/resources/images/champions/tyra.jpeg'),
('Bomb King', 2, '/resources/images/champions/bombking.jpeg'),
('Drogoz', 2, '/resources/images/champions/drogoz.jpeg'),
('Kinessa', 2, '/resources/images/champions/kinessa.jpeg'),
('Strix', 2, '/resources/images/champions/strix.jpeg'),
('Sha Lin', 2, '/resources/images/champions/shalin.jpeg'),
('Lian', 2, '/resources/images/champions/lian.jpeg'),
('Willo', 2, '/resources/images/champions/willo.jpeg'),
('Talus', 2, '/resources/images/champions/talus.jpeg'),
('Moji', 2, '/resources/images/champions/moji.jpeg'),
('Octavia', 2, '/resources/images/champions/octavia.jpeg'),
('Saati', 2, '/resources/images/champions/saati.jpeg'),
('Tiberius', 2, '/resources/images/champions/tiberius.jpeg'),
('Androxus', 3, '/resources/images/champions/androxus.jpeg'),
('Buck', 3, '/resources/images/champions/buck.jpeg'),
('Evie', 3, '/resources/images/champions/evie.jpeg'),
('Maeve', 3, '/resources/images/champions/maeve.jpeg'),
('Lex', 3, '/resources/images/champions/lex.jpeg'),
('Zhin', 3, '/resources/images/champions/zhin.jpeg'),
('Skye', 3, '/resources/images/champions/skye.jpeg'),
('Koga', 3, '/resources/images/champions/koga.jpeg');