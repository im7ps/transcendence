ALTER USER postgres WITH PASSWORD 'postgres';
SELECT 'CREATE DATABASE transcendence_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'transcendence_db')\gexec
GRANT ALL PRIVILEGES ON DATABASE transcendence_db TO postgres;