import psycopg2
from dotenv import dotenv_values

config = dotenv_values(".flaskenv")

conn = psycopg2.connect(
    dbname=config['DB'],
    user=config['DB_NAME'],
    password=config['DB_PASSWORD']
)
cur = conn.cursor()

with open("db.sql", "r") as script_file:
    sql_script = script_file.read()

cur.execute(sql_script)
conn.commit()

cur.close()
conn.close()
