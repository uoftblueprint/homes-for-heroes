
USE homes_for_heroes;

CREATE TABLE  IF NOT EXISTS partners (
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