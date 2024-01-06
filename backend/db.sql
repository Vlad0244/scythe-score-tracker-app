DROP VIEW IF EXISTS game_info_view;
DROP TABLE IF EXISTS player_score;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS player;
DROP TABLE IF EXISTS session_list;
DROP TABLE IF EXISTS gm;
DROP TYPE IF EXISTS faction_type;
DROP TYPE IF EXISTS mat_type;
DROP TABLE IF EXISTS my_table;


CREATE TYPE faction_type AS ENUM(
    'POLANIA',
    'SAXONY',
    'CRIMEA',
    'NORDIC',
    'RUSVIET',
    'ALBION',
    'TOGAWA',
    'VESNA',
    'FENRIS'
);

CREATE TYPE mat_type AS ENUM(
    'INDUSTRIAL',
    'ENGINEERING',
    'PATRIOTIC',
    'MECHANICAL',
    'AGRICULTURAL',
    'MILITANT',
    'INNOVATIVE'
);

CREATE TABLE gm(
    gm_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(20),
    password VARCHAR(30)
);

CREATE TABLE session_list(
    session_list_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(20),
    gm_id INT,

    CONSTRAINT fk_gm_id
        FOREIGN KEY (gm_id)
            REFERENCES gm(gm_id)
            ON DELETE CASCADE
);

CREATE TABLE game(
    game_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    session_list_id INT,
    airships BOOLEAN,
    tesla BOOLEAN,
    fenris_or_vesna BOOLEAN,
    modular_board BOOLEAN,

    CONSTRAINT fk_session_list_id
        FOREIGN KEY (session_list_id)
            REFERENCES session_list(session_list_id)
            ON DELETE CASCADE
);

CREATE TABLE player(
    player_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    session_list_id INT,
    name VARCHAR(20),

    CONSTRAINT fk_game_list_id
       FOREIGN KEY (session_list_id)
           REFERENCES session_list(session_list_id)
           ON DELETE CASCADE
);

CREATE TABLE player_score(
    player_id INT,
    game_id INT,
    faction faction_type,
    mat mat_type,
    popularity_bracket INT CHECK (popularity_bracket >= 0 AND popularity_bracket <= 2),
    currency INT CHECK (currency >= 0),
    star_count INT CHECK (star_count >= 0 AND star_count <= 6),
    land_count INT CHECK (land_count >= 0),
    total_resources_count INT CHECK (total_resources_count >= 0),
    bonus_points INT CHECK (bonus_points >= 0 AND bonus_points <= 9),

    CONSTRAINT fk_player_id
        FOREIGN KEY (player_id)
            REFERENCES player(player_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_game_id
        FOREIGN KEY (game_id)
            REFERENCES game(game_id)
            ON DELETE CASCADE
);

CREATE VIEW game_info_view AS
SELECT
    p.player_id,
    p.name,
    g.session_list_id,
    g.game_id,
    g.airships,
    g.tesla,
    g.fenris_or_vesna,
    g.modular_board,
    ps.faction,
    ps.mat,
    ps.popularity_bracket,
    ps.currency,
    ps.star_count,
    ps.land_count,
    ps.total_resources_count,
    ps.bonus_points

FROM
    player_score ps
        INNER JOIN game g ON
        g.game_id = ps.game_id
        INNER JOIN player p ON
        ps.player_id = p.player_id;

INSERT INTO gm (name, password)
VALUES
    ('vlad', 'password'),
    ('test', 'password');

INSERT INTO session_list (name, gm_id)
VALUES
    ('Miltonium', 1),
    ('test', 2);

INSERT INTO game (session_list_id, airships, tesla, fenris_or_vesna, modular_board)
VALUES
    (1, false, false, false, false),
    (1, false, false, false, false),
    (1, false, false, false, false),
    (1, false, false, false, true),
    (1, false, false, false, true),
    (1, false, false, false, true),
    (1, false, false, false, true),
    (1, false, false, false, true),
    (1, false, false, false, true),
    (1, false, false, false, true),
    (2, true, true, true, true),
    (2, true, true, true, true),
    (2, true, true, true, true),
    (2, true, true, true, true),
    (2, true, true, true, true),
    (2, true, true, true, true);

INSERT INTO player (session_list_id, name)
VALUES
    (1, 'Alice'),
    (1, 'Bob'),
    (1, 'Charlie'),
    (1, 'David'),
    (1, 'Eva'),
    (1, 'Frank'),
    (1, 'Grace'),
    (1, 'Hank'),
    (1, 'Ivy'),
    (2, 'Frank'),
    (2, 'Grace'),
    (2, 'Hank'),
    (2, 'Ivy'),
    (1, 'Jack');

INSERT INTO player_score (player_id, game_id, faction, mat, popularity_bracket, currency, star_count, land_count, total_resources_count, bonus_points)
VALUES
    (1, 1, 'POLANIA', 'INDUSTRIAL', 0, 10, 3, 2, 15, 5),
    (2, 1, 'SAXONY', 'ENGINEERING', 1, 8, 2, 3, 12, 3),
    (3, 1, 'CRIMEA', 'PATRIOTIC', 2, 12, 4, 4, 18, 7),
    (4, 1, 'NORDIC', 'MECHANICAL', 0, 15, 5, 5, 20, 9);

INSERT INTO player_score (player_id, game_id, faction, mat, popularity_bracket, currency, star_count, land_count, total_resources_count, bonus_points)
VALUES
    (5, 2, 'RUSVIET', 'AGRICULTURAL', 1, 11, 4, 3, 17, 6),
    (6, 2, 'ALBION', 'MILITANT', 2, 9, 3, 2, 14, 4),
    (7, 2, 'TOGAWA', 'INNOVATIVE', 0, 14, 5, 4, 19, 8),
    (3, 2, 'CRIMEA', 'PATRIOTIC', 2, 12, 4, 4, 18, 7);

INSERT INTO player_score (player_id, game_id, faction, mat, popularity_bracket, currency, star_count, land_count, total_resources_count, bonus_points)
VALUES
    (5, 3, 'RUSVIET', 'AGRICULTURAL', 1, 11, 4, 3, 17, 6),
    (6, 3, 'ALBION', 'MILITANT', 2, 9, 3, 2, 14, 4),
    (7, 3, 'TOGAWA', 'INNOVATIVE', 0, 14, 5, 4, 19, 8),
    (3, 3, 'CRIMEA', 'PATRIOTIC', 2, 12, 4, 4, 18, 7);

INSERT INTO player_score (player_id, game_id, faction, mat, popularity_bracket, currency, star_count, land_count, total_resources_count, bonus_points)
VALUES
    (5, 4, 'RUSVIET', 'AGRICULTURAL', 1, 11, 4, 3, 17, 6),
    (6, 4, 'ALBION', 'MILITANT', 2, 9, 3, 2, 14, 4),
    (7, 4, 'TOGAWA', 'INNOVATIVE', 0, 14, 5, 4, 19, 8),
    (3, 4, 'CRIMEA', 'PATRIOTIC', 2, 12, 4, 4, 18, 7);

INSERT INTO player_score (player_id, game_id, faction, mat, popularity_bracket, currency, star_count, land_count, total_resources_count, bonus_points)
VALUES
    (5, 5, 'RUSVIET', 'AGRICULTURAL', 1, 11, 4, 3, 17, 6),
    (6, 5, 'ALBION', 'MILITANT', 2, 9, 3, 2, 14, 4),
    (7, 5, 'TOGAWA', 'INNOVATIVE', 0, 14, 5, 4, 19, 8),
    (3, 5, 'CRIMEA', 'PATRIOTIC', 2, 12, 4, 4, 18, 7);

INSERT INTO player_score (player_id, game_id, faction, mat, popularity_bracket, currency, star_count, land_count, total_resources_count, bonus_points)
VALUES
    (5, 6, 'RUSVIET', 'AGRICULTURAL', 1, 11, 4, 3, 17, 6),
    (6, 6, 'ALBION', 'MILITANT', 2, 9, 3, 2, 14, 4),
    (7, 6, 'TOGAWA', 'INNOVATIVE', 0, 14, 5, 4, 19, 8),
    (3, 6, 'CRIMEA', 'PATRIOTIC', 2, 12, 4, 4, 18, 7);

INSERT INTO player_score (player_id, game_id, faction, mat, popularity_bracket, currency, star_count, land_count, total_resources_count, bonus_points)
VALUES
    (5, 7, 'RUSVIET', 'AGRICULTURAL', 1, 11, 4, 3, 17, 6),
    (6, 7, 'ALBION', 'MILITANT', 2, 9, 3, 2, 14, 4),
    (7, 7, 'TOGAWA', 'INNOVATIVE', 0, 14, 5, 4, 19, 8),
    (3, 7, 'CRIMEA', 'PATRIOTIC', 2, 12, 4, 4, 18, 7);

INSERT INTO player_score (player_id, game_id, faction, mat, popularity_bracket, currency, star_count, land_count, total_resources_count, bonus_points)
VALUES
    (5, 8, 'RUSVIET', 'AGRICULTURAL', 1, 11, 4, 3, 17, 6),
    (6, 8, 'ALBION', 'MILITANT', 2, 9, 3, 2, 14, 4),
    (7, 8, 'TOGAWA', 'INNOVATIVE', 0, 14, 5, 4, 19, 8),
    (3, 8, 'CRIMEA', 'PATRIOTIC', 2, 12, 4, 4, 18, 7);

INSERT INTO player_score (player_id, game_id, faction, mat, popularity_bracket, currency, star_count, land_count, total_resources_count, bonus_points)
VALUES
    (5, 9, 'RUSVIET', 'AGRICULTURAL', 1, 11, 4, 3, 17, 6),
    (6, 9, 'ALBION', 'MILITANT', 2, 9, 3, 2, 14, 4),
    (7, 9, 'TOGAWA', 'INNOVATIVE', 0, 14, 5, 4, 19, 8),
    (3, 9, 'CRIMEA', 'PATRIOTIC', 2, 12, 4, 4, 18, 7);

INSERT INTO player_score (player_id, game_id, faction, mat, popularity_bracket, currency, star_count, land_count, total_resources_count, bonus_points)
VALUES
    (5, 10, 'RUSVIET', 'AGRICULTURAL', 1, 11, 4, 3, 17, 6),
    (6, 10, 'ALBION', 'MILITANT', 2, 9, 3, 2, 14, 4),
    (7, 10, 'TOGAWA', 'INNOVATIVE', 0, 14, 5, 4, 19, 8),
    (3, 10, 'CRIMEA', 'PATRIOTIC', 2, 12, 4, 4, 18, 7);




