INSERT INTO client_users VALUES 
("Abby C", "abby2@gmail.com", "905456", "password2", TRUE, NULL, 11),
("Sarah F", "sarah@outlook.com", "416123", "password3", TRUE, NULL, 12),
("Alex P", "alexp@outlook.com", "416416", "password4", TRUE, NULL, 13);
INSERT INTO admin_users VALUES 
("Admin A", "admina@hfh.com", "10293", "password", "55 Apple Road", 2);
INSERT INTO cases VALUES
(11, 2, 'This is Case Note 1', now(), 1),
(11, 2, 'This is Case Note 2', now(), 2),
(12, 2, NULL, now(), 3),
(13, 2, NULL, now(), 4);
INSERT INTO UserInfo VALUES 
(11, "F", "abby2@gmail.com", 905456, "1950-01-01", "123 Apple Street", "Level 1", "Vancouver", "BC", NULL),
(12, "F", "sarah@outlook.com", 416123, "1955-01-01", "13 St George Street", "Level 2", "Victoria", "BC", NULL),
(13, "M", "alexp@gmail.com", 416416, "1960-01-01", "336 Spadina Avenue", "Level 1", "Calgary", "AB", NULL);
INSERT INTO NextKin VALUES
(20, 11, "kin_a", NULL, "647123", "123kin@kin.com", "336 Spadina"), 
(30, 12, "kin_b", NULL, "416123", "1kin@kin.com", "30 Tree Street"), 
(40, 13, "kin_c", NULL, "416416", "1levelkin@kin.com", "300 Tree Street");