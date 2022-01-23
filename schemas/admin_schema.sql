CREATE SCHEMA IF NOT EXISTS homes_for_heroes;

USE homes_for_heroes;

DROP TABLE IF EXISTS AdminInfo;
CREATE TABLE AdminInfo (
    admin_id INT PRIMARY KEY,
    admin_dob DATE ,
    city CHAR(255) NOT NULL,
    province CHAR(255) NOT NULL,
    CONSTRAINT FOREIGN KEY (admin_id) REFERENCES admin_users(admin_id)
);