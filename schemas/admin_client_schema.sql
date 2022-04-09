CREATE SCHEMA IF NOT EXISTS homes_for_heroes;

USE homes_for_heroes;

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS admin_users;
CREATE TABLE IF NOT EXISTS admin_users (
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    admin_id INT NOT NULL AUTO_INCREMENT,
    role_id INT NOT NULL DEFAULT 0,
    chapter_id INT DEFAULT NULL,
    PRIMARY KEY (admin_id)
);

DROP TABLE IF EXISTS client_users;
CREATE TABLE IF NOT EXISTS client_users (
    user_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255),
    password VARCHAR(255),
    incoming_referral VARCHAR(255),
    outgoing_referral VARCHAR(255),
    verified BOOLEAN NOT NULL,
    oauth BOOLEAN NOT NULL,
    alert_case_id INT UNIQUE,
    todo JSON NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (alert_case_id)
    REFERENCES cases(case_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

DROP TABLE IF EXISTS federated_credentials;
CREATE TABLE IF NOT EXISTS federated_credentials (
    user_id INT NOT NULL UNIQUE,
    provider VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (subject),
    FOREIGN KEY (user_id)
    REFERENCES client_users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

DROP TABLE IF EXISTS cases;
CREATE TABLE IF NOT EXISTS cases (
    user_id INT NOT NULL,
    admin_id INT NOT NULL,
    title TEXT,
    category INT NOT NULL,
    notes TEXT,
    last_update DATETIME NOT NULL DEFAULT NOW(),
    case_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (case_id),
    FOREIGN KEY (user_id)
	REFERENCES client_users (user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (admin_id)
	REFERENCES admin_users (admin_id)
        ON UPDATE CASCADE
);

SET FOREIGN_KEY_CHECKS=1;
