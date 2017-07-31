CREATE DATABASE memodb;

\c memodb

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    user_id CHAR(10),
    session_id CHAR(10),
    event_type VARCHAR(30),
    time TIMESTAMP DEFAULT NOW(),
    data JSONB
)