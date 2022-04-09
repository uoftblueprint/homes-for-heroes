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

INSERT INTO `admin_users` (`name`,`email`,`phone`,`password`,`address`,`admin_id`,`role_id`,`chapter_id`)
VALUES
  ("Bryar Hood","non.cursus@yahoo.ca","(811) 972-4581","JPH64HIQ5KU","915-536 Diam. St.",1,0,25),
  ("Dexter Sears","quis.diam@google.com","(798) 941-1976","CHJ82SQX3GX","P.O. Box 636, 5558 Eu Rd.",2,1,11),
  ("Roth Berg","in.consectetuer@yahoo.org","1-340-846-8514","SLY70YRE5KK","Ap #283-442 Et Rd.",3,1,40),
  ("Kim Montoya","amet.risus@hotmail.edu","(606) 354-2224","GVI72ZJS5BG","1126 Ridiculus Ave",454,1,45),
  ("Byron Hood","hymenaeos@aol.com","1-739-269-5183","TFY98DFG2JG","433-9739 Iaculis, Av.",455,1,47),
  ("Fay Cabrera","dictum.eu@aol.net","1-661-592-8842","GLD34LNN7MD","705 In St.",456,0,14),
  ("Sawyer Weeks","sed@outlook.net","(682) 643-6112","KKU15PXD7QS","9269 Donec Rd.",457,1,13),
  ("Farrah Elliott","in.condimentum@protonmail.ca","(786) 274-6623","DDT88AJT7KD","P.O. Box 992, 2948 Lacus. St.",458,1,46),
  ("Abel Branch","hymenaeos.mauris@icloud.com","(936) 966-8001","RYF61ULE6MW","Ap #813-2293 Odio St.",459,1,17),
  ("Mariam Roberts","dui.suspendisse@google.ca","(435) 834-4156","MTX17ZKY4BY","Ap #827-7973 Molestie Road",460,2,26),
  ("Sopoline Shepherd","faucibus.orci@google.couk","(781) 749-2722","LBX66GSK2LN","Ap #903-3155 Amet, Avenue",461,0,32),
  ("Erich Dunn","pellentesque.habitant@outlook.edu","(642) 785-5224","PFC14CJZ1VY","Ap #780-6386 Magnis Av.",462,2,22),
  ("Montana Crane","phasellus.libero@hotmail.ca","(374) 733-0521","KGB07JCT4OK","455-2089 Neque Road",463,1,17),
  ("Joseph Estes","tincidunt.orci.quis@aol.net","1-586-817-2247","IKA74RBA7GU","Ap #770-3077 Libero Av.",464,1,22),
  ("Gillian Graves","neque.vitae.semper@icloud.couk","1-603-983-0185","JXI61MLT4CF","963-462 Ac St.",465,1,20),
  ("Quinlan Curry","vehicula@google.com","(306) 986-6523","MVU68SPL1GG","9884 Luctus, Road",466,2,25),
  ("Alfonso Weaver","aliquam.enim@aol.ca","(714) 978-6514","PRF27VUU9TG","379-9785 Donec Rd.",467,1,2),
  ("Bell Tran","sit.amet@outlook.ca","(105) 269-0556","PBS01XNU5UR","455-4237 Libero Rd.",468,2,30),
  ("Victoria Downs","purus@yahoo.edu","1-871-651-6246","GOD21PFE4FL","Ap #904-879 Sociis Rd.",469,1,50),
  ("Mona Stout","duis@protonmail.com","(221) 824-8662","PWU33GHQ3PO","178-1640 Sed Ave",470,1,40),
  ("Gavin Warner","at.sem.molestie@aol.couk","1-558-590-5773","XKY16HQA0OL","P.O. Box 861, 1348 Duis St.",471,0,13),
  ("Quinn Edwards","amet.orci.ut@icloud.ca","(566) 655-5462","CHV25YNJ1UM","P.O. Box 791, 9196 In Av.",472,2,43),
  ("Kevin Houston","ultrices@icloud.couk","1-535-624-8560","LET95XTL4LK","P.O. Box 105, 871 Lobortis Avenue",473,1,23),
  ("Megan Hurst","nullam.scelerisque@icloud.edu","(514) 674-7703","TDM76KVN2OF","180-6333 Nunc Street",474,0,23),
  ("Nissim Gilliam","vel.vulputate.eu@yahoo.edu","(747) 126-4014","DDJ12POC5WJ","848-2940 Risus Avenue",475,0,42),
  ("Rama Clemons","molestie.in.tempus@icloud.couk","(781) 433-3974","JZC64VSN8WI","454-5049 Tristique Rd.",476,1,44),
  ("Zahir Berry","duis.sit.amet@outlook.net","1-293-679-7850","VSV86OIX8SQ","Ap #964-4623 Rutrum St.",477,1,10),
  ("Simon Bush","sit@protonmail.ca","(160) 717-1728","BCM72AUJ6GJ","7679 Nisi Rd.",478,2,39),
  ("Alden Skinner","nisi.mauris.nulla@google.com","(267) 213-1700","MPE37YJJ4MY","5429 Lectus. Road",479,1,22),
  ("Eric Woodard","penatibus.et@protonmail.net","(975) 878-5358","DCD42FOC8GN","Ap #393-1096 Diam. Ave",480,0,43),
  ("Colton Vincent","vitae.dolor@hotmail.net","(232) 668-4883","TWX84LFV4GH","791-2065 Imperdiet Street",481,2,41),
  ("Zachery Macdonald","nec.urna@outlook.org","1-379-117-8476","GCI35GYR6FC","Ap #381-1926 Augue Ave",482,0,27),
  ("Karly Mcmillan","non.sollicitudin@yahoo.couk","1-423-923-2975","LWF67JTK8TQ","Ap #313-7911 Sodales Avenue",483,2,10),
  ("Alvin Mccarthy","non.nisi@outlook.ca","(382) 328-6731","XGN28EXG6VR","Ap #311-6515 Aliquam Road",484,1,49),
  ("Leah Leonard","cras@google.com","(648) 836-5111","EJG74MBT7IF","665-1472 Quisque Ave",485,0,4),
  ("Camille Levine","dis.parturient@icloud.com","1-556-631-6675","AOU33ADN7BW","213-6730 Vitae Av.",486,1,21),
  ("Priscilla Wolfe","nunc.id@icloud.ca","(788) 881-1397","INX00IQP5UQ","Ap #504-503 Eu Ave",487,2,1),
  ("Quin Moody","ipsum.porta.elit@hotmail.org","(252) 610-1826","KMO08SYS1NG","616-6586 Natoque St.",488,1,41),
  ("Anne Wong","vivamus.non@outlook.edu","1-655-998-6063","POC70WYE1MQ","P.O. Box 501, 5254 Sed, Av.",489,1,25),
  ("Lilah Nash","donec.est@protonmail.ca","(920) 499-1469","EMA74LHV6HR","Ap #351-7476 Vitae, Rd.",490,0,39),
  ("Octavius Levy","ante.blandit@icloud.net","(419) 687-8786","KJX63VAC2XH","P.O. Box 157, 7596 Lorem Rd.",491,1,22),
  ("Tamara Ryan","dolor.nonummy@protonmail.ca","(656) 407-6470","RZG80LWM8QM","3386 Vel, Rd.",492,2,15),
  ("Alec Vega","est.arcu@protonmail.ca","(875) 482-5558","SRG09BUI5XV","Ap #957-7666 Fusce Ave",493,1,44),
  ("Zorita Perez","posuere.cubilia@yahoo.org","(476) 409-7921","HQB21SXE5TB","P.O. Box 649, 2819 Morbi St.",494,2,10),
  ("Gabriel Fitzgerald","hymenaeos@hotmail.edu","(681) 434-7294","WXB88TQU4DL","Ap #162-1438 Tellus, Ave",495,1,49),
  ("Darrel Hickman","vel@google.net","1-488-666-5044","VRB49EEX0UG","P.O. Box 978, 7865 Ac Ave",496,1,5),
  ("Gregory Rodriguez","vehicula.et.rutrum@aol.com","(381) 905-4617","ZZK93EOL1TB","495-7518 Neque Rd.",497,1,37),
  ("Chase Patton","lobortis@outlook.ca","(653) 252-5367","QJP94YQY5GC","141-6906 Ullamcorper Ave",498,0,23),
  ("Risa Garrett","nascetur.ridiculus.mus@google.com","(713) 271-5541","GYM60XMY5XQ","378-4670 Amet Rd.",499,1,10),
  ("Tanisha Cervantes","velit.in@google.org","1-427-750-8225","TDF87BUB2UN","495-9203 Lobortis St.",500,0,13);



INSERT INTO cases VALUES
(1, 2,'Alert Case Note 1', 0, 'This is Case Note 1', now(), 1),
(2, 2, 'Alert Case Note 2', 0, 'This is Case Note 2', now(), 2),
(3, 2, 'Alert Case Note 3', 0, NULL, now(), 3);

INSERT INTO client_users VALUES 
(1, "Abby C", "abby2@gmail.com", "905456", "password2", 'Toronto', 'Montreal', TRUE, FALSE, 1, '{"notes": []}'), 
(2, "Sarah F", "sarah@outlook.com", "416123", "password3", 'Montreal', 'New York', TRUE, FALSE, 2, '{"notes": []}'), 
(3, "Alex P", "alexp@outlook.com", "416416", "password4", 'Toronto', 'Moncton', TRUE, FALSE, 3, '{"notes": []}');


INSERT INTO UserInfo VALUES 
(1, "F", "abby2@gmail.com", 905456, "1950-01-01", "123 Apple Street", "Level 1", "Vancouver", "BC", NULL),
(2, "F", "sarah@outlook.com", 416123, "1955-01-01", "13 St George Street", "Level 2", "Victoria", "BC", NULL),
(3, "M", "alexp@gmail.com", 416416, "1960-01-01", "336 Spadina Avenue", "Level 1", "Calgary", "AB", NULL);

INSERT INTO NextKin VALUES 
(20, 1, "kin_a", NULL, "647123", "123kin@kin.com", "336 Spadina"), 
(30, 2, "kin_b", NULL, "416123", "1kin@kin.com", "30 Tree Street"), 
(40, 3, "kin_c", NULL, "416416", "1levelkin@kin.com", "300 Tree Street");


SET FOREIGN_KEY_CHECKS=1;