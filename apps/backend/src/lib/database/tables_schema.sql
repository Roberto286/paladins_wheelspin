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
('Androxus', 3, 'images/champions/androxus.jpeg'),
('Ash', 1, 'images/champions/ash.jpeg'),
('Atlas', 1, 'images/champions/atlas.jpeg'),
('Azaan', 1, 'images/champions/azaan.jpeg'),
('Barik', 1, 'images/champions/barik.jpeg'),
('Betty la Bomba', 2, 'images/champions/bettylabomba.jpeg'),
('Bomb King', 2, 'images/champions/bombking.jpeg'),
('Buck', 3, 'images/champions/buck.jpeg'),
('Caspian', 3, 'images/champions/caspian.jpeg'),
('Cassie', 2, 'images/champions/cassie.jpeg'),
('Corvus', 4, 'images/champions/corvus.jpeg'),
('Dredge', 2, 'images/champions/dredge.jpeg'),
('Drogoz', 2, 'images/champions/drogoz.jpeg'),
('Evie', 3, 'images/champions/evie.jpeg'),
('Fernando', 1, 'images/champions/fernando.jpeg'),
('Furia', 4, 'images/champions/furia.jpeg'),
('Grohk', 4, 'images/champions/grohk.jpeg'),
('Grover', 4, 'images/champions/grover.jpeg'),
('Imani', 2, 'images/champions/imani.jpeg'),
('Inara', 1, 'images/champions/inara.jpeg'),
('Io', 4, 'images/champions/io.jpeg'),
('Jenos', 4, 'images/champions/jenos.jpeg'),
('Kasumi', 3, 'images/champions/kasumi.jpeg'),
('Khan', 1, 'images/champions/khan.jpeg'),
('Kinessa', 2, 'images/champions/kinessa.jpeg'),
('Koga', 3, 'images/champions/koga.jpeg'),
('Lex', 3, 'images/champions/lex.jpeg'),
('Lian', 2, 'images/champions/lian.jpeg'),
('Lilith', 4, 'images/champions/lilith.jpeg'),
('Maeve', 3, 'images/champions/maeve.jpeg'),
('Makoa', 1, 'images/champions/makoa.jpeg'),
('MalDamba', 4, 'images/champions/maldamba.jpeg'),
('Moji', 3, 'images/champions/moji.jpeg'),
('Nyx', 1, 'images/champions/nyx.jpeg'),
('Octavia', 2, 'images/champions/octavia.jpeg'),
('Omen', 2, 'images/champions/omen.jpeg'),
('Pip', 4, 'images/champions/pip.jpeg'),
('Raum', 1, 'images/champions/raum.jpeg'),
('Rei', 4, 'images/champions/rei.jpeg'),
('Ruckus', 1, 'images/champions/ruckus.jpeg'),
('Saati', 2, 'images/champions/saati.jpeg'),
('Seris', 4, 'images/champions/seris.jpeg'),
('Sha Lin', 2, 'images/champions/shalin.jpeg'),
('Skye', 3, 'images/champions/skye.jpeg'),
('Strix', 2, 'images/champions/strix.jpeg'),
('Talus', 3, 'images/champions/talus.jpeg'),
('Terminus', 1, 'images/champions/terminus.jpeg'),
('Tiberius', 2, 'images/champions/tiberius.jpeg'),
('Torvald', 1, 'images/champions/torvald.jpeg'),
('Tyra', 2, 'images/champions/tyra.jpeg'),
('Vatu', 3, 'images/champions/vatu.jpeg'),
('Vii', 3, 'images/champions/vii.jpeg'),
('Viktor', 2, 'images/champions/viktor.jpeg'),
('Vivian', 2, 'images/champions/vivian.jpeg'),
('Vora', 3, 'images/champions/vora.jpeg'),
('Willo', 2, 'images/champions/willo.jpeg'),
('Yagorath', 1, 'images/champions/yagorath.jpeg'),
('Ying', 4, 'images/champions/ying.jpeg'),
('Zhin', 3, 'images/champions/zhin.jpeg');
