CREATE DATABASE memodb;

\c memodb

CREATE TABLE guesses (
    guess_id SERIAL PRIMARY KEY,
    user_id CHAR(10) CHECK (char_length(user_id) = 10),
    session_id CHAR(10) CHECK (char_length(session_id) = 10),
    node_id SMALLINT,
    user_input VARCHAR(100),
    node_text VARCHAR(100),
    full_text VARCHAR(100),
    mem_count SMALLINT,
    left_ok BOOLEAN,
    right_ok BOOLEAN,
    guess_time TIMESTAMP DEFAULT NOW()
)


