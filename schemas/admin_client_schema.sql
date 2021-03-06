
USE homes_for_heroes;

SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE IF NOT EXISTS client_users (
    user_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255),
    password VARCHAR(255),
    role_id INT NOT NULL DEFAULT 0,
    chapter_id INT DEFAULT NULL,
    verified BOOLEAN NOT NULL,
    oauth BOOLEAN NOT NULL,
    alert_case_id INT UNIQUE,
    todo JSON NOT NULL DEFAULT (JSON_OBJECT('notes', JSON_ARRAY())),
    PRIMARY KEY (user_id),
    FOREIGN KEY (alert_case_id)
        REFERENCES cases(case_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    FOREIGN KEY (chapter_id)
        REFERENCES chapters(chapter_id)
);

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
        REFERENCES client_users (user_id)
        ON UPDATE CASCADE
);

SET FOREIGN_KEY_CHECKS=1;