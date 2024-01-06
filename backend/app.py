from pprint import pprint

from flask import Flask, jsonify
import psycopg2
from dotenv import dotenv_values
from flask_cors import CORS

config = dotenv_values(".flaskenv")
app = Flask(__name__)
CORS(app)

connection_params = {
    'dbname': config['DB'],
    'user': config['DB_NAME'],
    'password': config['DB_PASSWORD']
}


@app.route('/gm/<int:gm_id>')
def get_gm(gm_id):
    with psycopg2.connect(**connection_params) as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT * FROM gm WHERE gm_id = %s;
                """,
                        (gm_id,)
                        )
            test = cur.fetchall()
    gms = gm_table_data(test)
    print("my log:", gms)
    return jsonify(gms)


@app.route('/gmSessions/<int:gm_id>')
def get_sessions_list(gm_id):
    with psycopg2.connect(**connection_params) as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT * FROM session_list WHERE gm_id = %s;
            """,
                        (gm_id,)

                        )
            sessions_list = cur.fetchall()
    sessions_list = session_table_data(sessions_list)
    return jsonify(sessions_list)


@app.route('/sessionsList/<int:session_id>')
def get_game_ids(session_id):
    """
    queries the db to get the games based on given session id.
    ought to query a view that tells the general rules, (airships, tesla, etc.)
    placements, factions/mats, total points of the game.
    then when clicking on an individual game, it gets the full in-depth info of that game
    and everyone's individual points accrued from what sources.
    """
    with psycopg2.connect(**connection_params) as conn:
        with conn.cursor() as cur:
            cur.execute("""
            
                SELECT * FROM game WHERE session_list_id = %s;
            """,
                        (session_id,)
                        )
            games_list = cur.fetchall()
    games_list_data = game_table_data(games_list)
    return jsonify(games_list_data)


@app.route('/game/<int:game_id>')
def get_all_game_info(game_id):
    """
    queries the db to get the games based on given session id.
    ought to query a view that tells the general rules, (airships, tesla, etc.)
    placements, factions/mats, total points of the game.
    then when clicking on an individual game, it gets the full in-depth info of that game
    and everyone's individual points accrued from what sources.
    """
    with psycopg2.connect(**connection_params) as conn:
        with conn.cursor() as cur:
            cur.execute("""
            
                SELECT * FROM game_info_view WHERE game_id = %s;
            """,
                        (game_id,)
                        )
            game_info_list = cur.fetchall()
    games_info_data = game_info_view_data(game_info_list)
    return jsonify(games_info_data)


@app.route('/playerList/<int:game_id>')
def get_players_in_game_info(game_id):
    """
    queries the db to get the games based on given session id.
    ought to query a view that tells the general rules, (airships, tesla, etc.)
    placements, factions/mats, total points of the game.
    then when clicking on an individual game, it gets the full in-depth info of that game
    and everyone's individual points accrued from what sources.
    """
    with psycopg2.connect(**connection_params) as conn:
        with conn.cursor() as cur:
            cur.execute("""
            
                SELECT * FROM game_info_view WHERE game_id = %s;
            """,
                        (game_id,)
                        )
            games_list = cur.fetchall()
    game_data = game_info_view_data(games_list)
    print('printing game data')
    pprint(game_data)
    return jsonify(game_data)


@app.route('/player/<int:game_id>/<int:player_id>')
def get_all_player_info(game_id, player_id):
    """
    queries the db to get the player info in a given game game_id
    """
    with psycopg2.connect(**connection_params) as conn:
        with conn.cursor() as cur:
            cur.execute("""
            
                SELECT * FROM game_info_view WHERE game_id = %s AND player_id = %s;
            """,
                        (game_id, player_id,)
                        )
            games_list = cur.fetchall()
    game_data = game_info_view_data(games_list)
    print('printing player data')
    pprint(game_data)
    return jsonify(game_data)


"""
All get____data methods are used for turning query results into required format of
a list[] of hashmaps{}
[{'gm_id': 1, 'name': bob, 'password': '123'}, {'gm_id': 1, 'name': sam, 'password': '123'}]
"""


def game_table_data(rows: list) -> list:
    ids = []
    for row in rows:
        ids.append({
            'game_id': row[0],
            'session_list_id': row[1],
            'airships': row[2],
            'tesla': row[3],
            'fenris_or_vesna': row[4],
            'modular_board': row[5]
        })
    return ids


def gm_table_data(rows: list) -> list:
    gms = []
    for row in rows:
        gms.append({
            'gm_id': row[0],
            'name': row[1],
            'password': row[2]
        })
    return gms


def session_table_data(rows: list) -> list:
    sessions_list = []
    for row in rows:
        sessions_list.append(
            {
                'session_list_id': row[0],
                'name': row[1],
                'gm_id': row[2]
            })
    return sessions_list


def game_info_view_data(rows: list) -> list:
    games_list_data = []
    for row in rows:
        games_list_data.append(
            {
                'player_id': row[0],
                'name': row[1],
                'session_list_id': row[2],
                'game_id': row[3],
                'airships': row[4],
                'tesla': row[5],
                'fenris_or_vesna': row[6],
                'modular_board': row[7],
                'faction': row[8],
                'mat': row[9],
                'popularity_bracket': row[10],
                'currency': row[11],
                'star_count': row[12],
                'land_count': row[13],
                'total_resources_count': row[14],
                'bonus_points': row[15]
            }
        )

    return games_list_data


if __name__ == '__main__':
    app.run()
