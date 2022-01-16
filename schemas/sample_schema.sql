INSERT INTO client_users VALUES 
("Abby C", "abby2@gmail.com", "905456", "password2", 1, 11), 
("Sarah F", "sarah@outlook.com", "416123", "password3", 2, 12), 
("Alex P", "alexp@outlook.com", "416416", "password4", 3, 13);
INSERT INTO admin_users VALUES 
("Admin A", "admina@hfh.com", "10293", "password", "55 Apple Road", 2);
INSERT INTO cases VALUES
(11, 2, NULL, now(), 1),
(12, 2, NULL, now(), 2),
(13, 2, NULL, now(), 3);
INSERT INTO UserInfo VALUES 
(11, "F", "abby2@gmail.com", 905456, now(), "123 Apple Street", "Level 1", "Vancouver", "BC", NULL), 
(12, "F", "sarah@outlook.com", 416123, now(), "13 St George Street", "Level 2", "Victoria", "BC", NULL), 
(13, "M", "alexp@gmail.com", 416416, now(), "336 Spadina Avenue", "Level 1", "Calgary", "AB", NULL);
INSERT INTO NextKinInfo VALUES 
(20, 11, "kin_a", NULL, "647123", "123kin@kin.com", "336 Spadina"), 
(30, 12, "kin_b", NULL, "416123", "1kin@kin.com", "30 Tree Street"), 
(40, 13, "kin_c", NULL, "416416", "1levelkin@kin.com", "300 Tree Street");