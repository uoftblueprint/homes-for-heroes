CREATE SCHEMA IF NOT EXISTS homes_for_heroes;

USE homes_for_heroes;

DROP TABLE IF EXISTS admin_users;
CREATE TABLE IF NOT EXISTS admin_users (
name VARCHAR(255) NOT NULL UNIQUE,
email VARCHAR(255) NOT NULL UNIQUE,
phone VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
address VARCHAR(255) NOT NULL,
admin_id int NOT NULL AUTO_INCREMENT,
primary key (admin_id)
);

DROP TABLE IF EXISTS client_users;
CREATE TABLE IF NOT EXISTS client_users (
name VARCHAR(255) NOT NULL UNIQUE,
email VARCHAR(255) NOT NULL UNIQUE,
phone VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
user_id int NOT NULL AUTO_INCREMENT,
primary key (user_id)
);

DROP TABLE IF EXISTS cases;
CREATE TABLE IF NOT EXISTS cases (
user_id int NOT NULL ,
admin_id int NOT NULL ,
case_id int NOT NULL AUTO_INCREMENT,
notes TEXT,
last_update DATETIME
);
