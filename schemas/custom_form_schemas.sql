
USE homes_for_heroes;

CREATE TABLE IF NOT EXISTS CustomForm (
    form_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title VARChAR(256) NOT NULL,
    form_body JSON NOT NULL,
    curr_level CHAR(255) NOT NULL,
    is_final BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT FOREIGN KEY (admin_id) REFERENCES admin_users(user_id)
);

CREATE TABLE IF NOT EXISTS  Questionnaire (
    questionnaire_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    form_id INT NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    response_body JSON NOT NULL,
    is_submitted BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES client_users(user_id)
);
