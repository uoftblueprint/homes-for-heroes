CREATE SCHEMA IF NOT EXISTS homes_for_heroes;

USE homes_for_heroes;

DROP TABLE IF EXISTS partners;
CREATE TABLE partners (
    partner_id INT NOT NULL AUTO_INCREMENT,
    org_name CHAR(255) NOT NULL UNIQUE,
    city CHAR(255),
    village CHAR(255),
    address CHAR(255),
    phone CHAR(255),
    email CHAR(255),
    PRIMARY KEY (partner_id)
);

DROP TABLE IF EXISTS volunteers;
CREATE TABLE volunteers (
    volunteer_id INT NOT NULL AUTO_INCREMENT,
    name CHAR(255) NOT NULL,
    village CHAR(255),
    date_joined DATE NOT NULL,
    role CHAR(255) NOT NULL,
    phone CHAR(255),
    PRIMARY KEY (volunteer_id)
);

DROP TABLE IF EXISTS supporters;
CREATE TABLE supporters (
    supporter_id INT NOT NULL AUTO_INCREMENT,
    name CHAR(255) NOT NULL,
    date_gifted DATE NOT NULL,
    gift_provided CHAR(255) NOT NULL,
    phone CHAR(255),
    PRIMARY KEY (supporter_id)
);