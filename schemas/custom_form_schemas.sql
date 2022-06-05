
USE homes_for_heroes;


CREATE TABLE  IF NOT EXISTS CustomForm (
    form_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title VARChAR(256) NOT NULL UNIQUE,
    form_body JSON NOT NULL,
    curr_level CHAR(255) NOT NULL,
    is_final BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT FOREIGN KEY (admin_id) REFERENCES client_users(user_id)
);

DROP TABLE IF EXISTS Questionnaire;
CREATE TABLE Questionnaire (
    questionnaire_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    form_id INT NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    form_body JSON NOT NULL,
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES client_users(user_id),
    CONSTRAINT FOREIGN KEY (form_id) REFERENCES CustomForm(form_id),
    UNIQUE (user_id, form_id)
);
