CREATE SCHEMA IF NOT EXISTS homes_for_heroes;

USE homes_for_heroes;

DROP TABLE IF EXISTS Questionnaires;
CREATE TABLE Questionnaires (
    questionnaire_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    form_id INT NOT NULL,
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    form_body JSON NOT NULL,
    is_complete BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT FOREIGN KEY (admin_id) REFERENCES admin_users(admin_id)
);