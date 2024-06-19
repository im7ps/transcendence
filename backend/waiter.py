import os
import time
import psycopg2
from psycopg2 import OperationalError

def wait_for_db():
    """Attempt to connect to the database and retry if it fails."""
    retries = 5
    while retries:
        try:
            conn = psycopg2.connect(
                dbname=os.getenv('DATABASE_NAME', 'transcendence_db'),
                user=os.getenv('DATABASE_USER', 'postgres'),
                password=os.getenv('DATABASE_PASSWORD', 'postgres'),
                host=os.getenv('DATABASE_HOST', 'db'),
                port=os.getenv('DATABASE_PORT', '5432')
            )
            conn.close()
            print("Database is ready!")
            return
        except OperationalError as e:
            retries -= 1
            print(f"Database not ready, waiting... {e}")
            time.sleep(10)

if __name__ == "__main__":
    wait_for_db()