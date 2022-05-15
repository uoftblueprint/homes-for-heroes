CREATE DATABASE IF NOT EXISTS homes_for_heroes;
USE homes_for_heroes;
ALTER USER root@localhost IDENTIFIED WITH caching_sha2_password BY 'hello';
CREATE USER IF NOT EXISTS 'hfh'@'%' IDENTIFIED WITH caching_sha2_password BY 'hello';
GRANT ALL PRIVILEGES ON homes_for_heroes.* to  'hfh'@'%' ;
USE homes_for_heroes;
FLUSH PRIVILEGES;
USE homes_for_heroes;

USE homes_for_heroes;

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS admin_users;
CREATE TABLE IF NOT EXISTS admin_users (
    user_id INT NOT NULL,
    chapter_id INT DEFAULT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id)
        REFERENCES client_users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (chapter_id)
        REFERENCES chapters(chapter_id)
);

DROP TABLE IF EXISTS client_users;
CREATE TABLE IF NOT EXISTS client_users (
    user_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255),
    password VARCHAR(255),
    role_id INT NOT NULL DEFAULT 0,
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
        REFERENCES admin_users (user_id)
        ON UPDATE CASCADE
);

SET FOREIGN_KEY_CHECKS=1;
USE homes_for_heroes;


CREATE TABLE UserInfo (
    user_id INT PRIMARY KEY,
    gender CHAR(1) NOT NULL,
    email CHAR(255) NOT NULL,
    applicant_phone CHAR(255) NOT NULL,
    applicant_dob DATE ,
    street_name CHAR(255),
    curr_level  CHAR(255),
    city CHAR(255) NOT NULL,
    province CHAR(3) NOT NULL,
    referral CHAR(255),
    demographic CHAR(255),
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES client_users(user_id)
);

CREATE TABLE NextKin (
    kin_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    kin_name CHAR(255) NOT NULL,
    relationship CHAR(255),
    kin_phone CHAR(255),
    kin_email CHAR(255),
    kin_address CHAR(255),
	CONSTRAINT FOREIGN KEY (user_id) REFERENCES client_users(user_id)
);

CREATE TABLE MedicalHistory (
    user_id INT PRIMARY KEY, 
    vision_impairment BOOLEAN,
    incontinent BOOLEAN,
    respiratory_supplies_required BOOLEAN,
    medication_reminder_required BOOLEAN,
    special_dietary_requirements BOOLEAN,
    criminal_history BOOLEAN,
    suicide_attempts_history BOOLEAN,
    financial_problems_history BOOLEAN,
    verbal_abuse_history BOOLEAN,
    alcohol_abuse_history BOOLEAN,
    gambling_abuse_history BOOLEAN,
    aggressive_behaviour_history BOOLEAN,
    receiving_abuse_history BOOLEAN,
    hoarding_behaviour_history BOOLEAN,
    drug_abuse_history BOOLEAN,
    contagious_diseases BOOLEAN,
    hearing_impairment BOOLEAN,
    mental_health_concerns BOOLEAN,
    mental_health_diagnosis BOOLEAN,
    mobility_issues BOOLEAN,
    other_issues BOOLEAN,
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES client_users(user_id)
);
USE homes_for_heroes;

CREATE TABLE IF NOT EXISTS chapters (
    name VARCHAR(255) NOT NULL,
    chapter_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(chapter_id)
);CREATE SCHEMA IF NOT EXISTS homes_for_heroes;

USE homes_for_heroes;

DROP TABLE IF EXISTS CustomForm;
CREATE TABLE CustomForm (
    form_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title VARChAR(256) NOT NULL,
    form_body JSON NOT NULL,
    curr_level CHAR(255) NOT NULL,
    is_final BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT FOREIGN KEY (admin_id) REFERENCES admin_users(user_id)
);

DROP TABLE IF EXISTS Questionnaire;
CREATE TABLE Questionnaire (
    questionnaire_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    form_id INT NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    response_body JSON NOT NULL,
    is_submitted BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES client_users(user_id)
);
CREATE SCHEMA IF NOT EXISTS homes_for_heroes;

USE homes_for_heroes;

CREATE TABLE IF NOT EXISTS partners (
    partner_id INT NOT NULL AUTO_INCREMENT,
    org_name CHAR(255) NOT NULL UNIQUE,
    city CHAR(255),
    village CHAR(255),
    address CHAR(255),
    phone CHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (partner_id)
);

CREATE TABLE IF NOT EXISTS volunteers (
    volunteer_id INT NOT NULL AUTO_INCREMENT,
    name CHAR(255) NOT NULL,
    village CHAR(255),
    date_joined DATE NOT NULL,
    role CHAR(255) NOT NULL,
    phone CHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (volunteer_id)
);

CREATE TABLE IF NOT EXISTS supporters (
    supporter_id INT NOT NULL AUTO_INCREMENT,
    name CHAR(255) NOT NULL,
    date_gifted DATE NOT NULL,
    gift_provided CHAR(255) NOT NULL,
    phone CHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (supporter_id)
);