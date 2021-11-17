CREATE SCHEMA IF NOT EXISTS homes_for_heroes;

USE homes_for_heroes;

DROP TABLE IF EXISTS admin_users;
CREATE TABLE IF NOT EXISTS admin_users (
    name VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    admin_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (admin_id)
);

DROP TABLE IF EXISTS client_users;
CREATE TABLE IF NOT EXISTS client_users (
    name VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS cases;
CREATE TABLE IF NOT EXISTS cases (
    user_id INT NOT NULL,
    admin_id INT NOT NULL,
    notes TEXT,
    last_update DATETIME NOT NULL DEFAULT NOW(),
    case_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (case_id)
);
