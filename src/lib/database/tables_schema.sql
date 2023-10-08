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
('Fernando', 1, '/path/to/image/fernando.png'),
('Barik', 1, '/path/to/image/barik.png'),
('Ruckus', 1, '/path/to/image/ruckus.png'),
('Makoa', 1, '/path/to/image/makoa.png'),
('Inara', 1, '/path/to/image/inara.png'),
('Ash', 1, '/path/to/image/ash.png'),
('Torvald', 1, '/path/to/image/torvald.png'),
('Terminus', 1, '/path/to/image/terminus.png'),
('Khan', 1, '/path/to/image/khan.png'),
('Atlas', 1, '/path/to/image/atlas.png'),
('Yagorath', 1, '/path/to/image/yagorath.png'),
('Vora', 1, '/path/to/image/vora.png'),
('Rei', 1, '/path/to/image/rei.png'),
('Mal''Damba', 4, '/path/to/image/maldamba.png'),
('Pip', 4, '/path/to/image/pip.png'),
('Grover', 4, '/path/to/image/grover.png'),
('Seris', 4, '/path/to/image/seris.png'),
('Ying', 4, '/path/to/image/ying.png'),
('Grohk', 4, '/path/to/image/grohk.png'),
('Jenos', 4, '/path/to/image/jenos.png'),
('Damba', 4, '/path/to/image/damba.png'),
('Furia', 4, '/path/to/image/furia.png'),
('Io', 4, '/path/to/image/io.png'),
('Corvus', 4, '/path/to/image/corvus.png'),
('Cassie', 2, '/path/to/image/cassie.png'),
('Viktor', 2, '/path/to/image/viktor.png'),
('Tyra', 2, '/path/to/image/tyra.png'),
('Bomb King', 2, '/path/to/image/bombking.png'),
('Drogoz', 2, '/path/to/image/drogoz.png'),
('Kinessa', 2, '/path/to/image/kinessa.png'),
('Strix', 2, '/path/to/image/strix.png'),
('Sha Lin', 2, '/path/to/image/shalin.png'),
('Lian', 2, '/path/to/image/lian.png'),
('Willo', 2, '/path/to/image/willow.png'),
('Talus', 2, '/path/to/image/talus.png'),
('Moji', 2, '/path/to/image/moji.png'),
('Octavia', 2, '/path/to/image/octavia.png'),
('Saati', 2, '/path/to/image/saati.png'),
('Tiberius', 2, '/path/to/image/tiberius.png'),
('Androxus', 3, '/path/to/image/androxus.png'),
('Buck', 3, '/path/to/image/buck.png'),
('Evie', 3, '/path/to/image/evie.png'),
('Maeve', 3, '/path/to/image/maeve.png'),
('Lex', 3, '/path/to/image/lex.png'),
('Zhin', 3, '/path/to/image/zhin.png'),
('Skye', 3, '/path/to/image/skye.png'),
('Koga', 3, '/path/to/image/koga.png');