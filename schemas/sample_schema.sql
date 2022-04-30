SET FOREIGN_KEY_CHECKS=0;


INSERT INTO `chapters` (`name`,`chapter_id`)
VALUES
  ("Central Kalimantan",1),
  ("Trà Vinh",2),
  ("Kostroma Oblast",3),
  ("Drenthe",4),
  ("Ceará",5),
  ("Nova Scotia",6),
  ("Lower Austria",7),
  ("Tuyên Quang",8),
  ("Podkarpackie",9),
  ("Karnataka",10),
  ("Lorraine",11),
  ("Utrecht",12),
  ("Oost-Vlaanderen",13),
  ("Boyacá",14),
  ("Prince Edward Island",15),
  ("Catalunya",16),
  ("Western Australia",17),
  ("Rivers",18),
  ("Pays de la Loire",19),
  ("Paraná",20),
  ("Osun",21),
  ("Västra Götalands län",22),
  ("Sardegna",23),
  ("Luik",24),
  ("Bremen",25),
  ("Zhōngnán",26),
  ("Maryland",27),
  ("Henegouwen",28),
  ("North Island",29),
  ("Dalarnas län",30),
  ("Comunitat Valenciana",31),
  ("Dolnośląskie",32),
  ("Östergötlands län",33),
  ("Zuid Holland",34),
  ("Comunitat Valenciana",35),
  ("Toscana",36),
  ("Tasmania",37),
  ("Punjab",38),
  ("Pays de la Loire",39),
  ("British Columbia",40),
  ("Lancashire",41),
  ("Berlin",42),
  ("Oslo",43),
  ("Illes Balears",44),
  ("FATA",45),
  ("Saskatchewan",46),
  ("Jönköpings län",47),
  ("Omsk Oblast",48),
  ("Munster",49),
  ("Ulster",50);

INSERT INTO admin_users VALUES
  (3, 1)

INSERT INTO cases VALUES
(1, 2,'Alert Case Note 1', 0, 'This is Case Note 1', now(), 1),
(2, 2, 'Alert Case Note 2', 0, 'This is Case Note 2', now(), 2),
(3, 2, 'Alert Case Note 3', 0, NULL, now(), 3);

INSERT INTO client_users VALUES 
(1, "Abby C", "abby2@gmail.com", "905456", "password2", 0, TRUE, FALSE, 1, '{"notes": []}'), 
(2, "Sarah F", "sarah@outlook.com", "416123", "password3", 1, TRUE, FALSE, 2, '{"notes": []}'), 
(3, "Alex P", "alexp@outlook.com", "416416", "password4", 2, TRUE, FALSE, 3, '{"notes": []}');

INSERT INTO UserInfo VALUES 
(1, "F", "abby2@gmail.com", 905456, "1950-01-01", "123 Apple Street", "Level 1", "Vancouver", "BC", NULL),
(2, "F", "sarah@outlook.com", 416123, "1955-01-01", "13 St George Street", "Level 2", "Victoria", "BC", NULL),
(3, "M", "alexp@gmail.com", 416416, "1960-01-01", "336 Spadina Avenue", "Level 1", "Calgary", "AB", NULL);

INSERT INTO NextKin VALUES 
(20, 1, "kin_a", NULL, "647123", "123kin@kin.com", "336 Spadina"), 
(30, 2, "kin_b", NULL, "416123", "1kin@kin.com", "30 Tree Street"), 
(40, 3, "kin_c", NULL, "416416", "1levelkin@kin.com", "300 Tree Street");


SET FOREIGN_KEY_CHECKS=1;