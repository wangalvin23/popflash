CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    username VARCHAR(256) NOT NULL UNIQUE,
    password VARCHAR(512)
);

CREATE TABLE IF NOT EXISTS flashes (
    id VARCHAR(64) PRIMARY KEY,
    userid VARCHAR(64) NOT NULL,
    flash VARCHAR(1024) NOT NULL,
    created_at BIGINT NOT NULL
);

INSERT INTO users (id, username, password)
VALUES ('a08a1885-2ad5-4b83-b801-a0be040de905', 'alvin0', 'admin1');