SET FOREIGN_KEY_CHECKS=0;


INSERT INTO `chapters` (`chapter_name`)
VALUES
  ("Norman Wells"),
  ("Fogo"),
  ("Langenburg"),
  ("Pointe-aux-Trembles"),
  ("Champlain"),
  ("Chetwynd"),
  ("Pangnirtung"),
  ("Quinte West"),
  ("Rouyn-Noranda"),
  ("Ucluelet"),
  ("Wolfville");


INSERT INTO cases VALUES
(1, 2,'Alert Case Note 1', 0, 'This is Case Note 1', now(), 1),
(2, 2, 'Alert Case Note 2', 0, 'This is Case Note 2', now(), 2),
(3, 2, 'Alert Case Note 3', 0, NULL, now(), 3);

INSERT INTO `client_users` (`name`,`email`,`role_id`,`chapter_id`,`verified`,`oauth`)
VALUES
  ("Philip Waters","erat.nonummy@icloud.org",1,1,0,1),
  ("Briar Wilkins","ante.dictum.cursus@hotmail.ca",1,8,0,0),
  ("Garth Vance","lorem.vehicula@aol.com",1,2,1,1),
  ("Basil Farmer","nec.tempus@google.org",0,9,1,1),
  ("Calista Singleton","enim.gravida.sit@google.couk",0,2,1,0),
  ("Ivor Osborn","massa.rutrum@protonmail.org",0,4,1,0),
  ("Abigail Lawrence","facilisis.magna@hotmail.edu",2,5,1,0),
  ("Skyler Salazar","est.nunc@outlook.couk",1,9,1,1),
  ("Sophia Dyer","ipsum.dolor.sit@icloud.ca",1,3,1,1),
  ("Bianca Alexander","diam.duis.mi@protonmail.couk",2,10,1,0),
  ("Harrison Ellison","lectus.ante@yahoo.ca",2,9,0,1),
  ("Marcia Eaton","lobortis@protonmail.ca",0,6,1,1),
  ("Reagan Mayer","imperdiet.non.vestibulum@hotmail.net",2,1,0,1),
  ("Genevieve Keith","non@icloud.ca",2,4,1,0),
  ("Megan Ferrell","nulla.integer@aol.com",0,4,1,0),
  ("Cynthia Estrada","sem@google.couk",0,2,1,1),
  ("India Duffy","nullam@outlook.com",2,3,0,1),
  ("Aiko Kerr","condimentum@outlook.net",1,4,1,0),
  ("Shafira Kinney","lobortis.ultrices@protonmail.couk",1,7,1,0),
  ("Amir Moon","curae@google.edu",1,8,1,1),
  ("James Powers","montes.nascetur@protonmail.com",1,4,1,0),
  ("Chadwick Cabrera","dictum.augue@protonmail.com",1,5,0,0),
  ("Wyatt Stevens","vel.est.tempor@yahoo.net",1,1,0,1),
  ("Jonah Foreman","erat.volutpat@icloud.edu",1,7,0,1),
  ("Lee Emerson","ornare.libero@outlook.edu",0,6,0,0),
  ("Cadman Bentley","at.pretium.aliquet@icloud.net",1,5,1,1),
  ("Joseph Lancaster","proin.non@hotmail.net",1,1,1,0),
  ("Ahmed Rollins","phasellus.ornare.fusce@outlook.org",1,4,1,0),
  ("Farrah Frost","nisi.magna.sed@outlook.ca",1,5,0,0),
  ("Lester Calderon","mollis.phasellus.libero@google.org",1,9,0,1);

INSERT INTO `client_users` (`name`,`email`,`role_id`, `chapter_id`, `verified`,`oauth`, `phone`, `password`)
VALUES
  ("Mesbah Rafin","mesbah@gmail.com",1,1,1,0, "5062329415", "$2b$15$P6WyshJ2ys3xvDL9HqpGduD0w.woRawkNAIIBCNHvdVCF5kLUtk8u"),
  ("Raymond Chen","mesbah@gmail.com",2,1,1,0, "5062322232", "$2b$15$P6WyshJ2ys3xvDL9HqpGduD0w.woRawkNAIIBCNHvdVCF5kLUtk8u");

INSERT INTO `UserInfo` (`user_id`,`gender`,`email`,`applicant_phone`,`applicant_dob`,`street_name`,`curr_level`,`city`,`province`,`referral`,`outgoing`,`income`,`demographic`)
VALUES
  (1,"M","urna.justo.faucibus@icloud.com","8533464756","1997-06-28","6233 Mollis. Road",2,"Saint-Quentin","AB","Hines Creek","Bo",295955,"Malawi"),
  (2,"M","luctus.lobortis.class@aol.org","4477749668","2017-07-04","P.O. Box 293, 8443 Sapien. Street",3,"Valledupar","NB","Edmundston","Mariupol",923378,"Malaysia"),
  (3,"F","erat.in@google.net","8438996566","2004-02-25","P.O. Box 419, 8152 Eget Road",1,"Motueka","SK","Assiniboia","Saravena",150072,"Zimbabwe"),
  (4,"F","non.quam@outlook.edu","8274625272","2013-02-07","P.O. Box 443, 3203 Odio. Ave",4,"Hindeloopen","SK","Maple Creek","Sichuan",834573,"Israel"),
  (5,"M","tempus.mauris.erat@outlook.org","2545457164","1998-08-15","107-3395 Hendrerit Av.",2,"Banff","NU","Arviat","Scanzano Jonico",404908,"Brazil"),
  (6,"M","mollis@icloud.couk","5729484468","2018-07-29","5593 Posuere Av.",2,"Kuruman","ON","Aurora","Limoges",238122,"San Marino"),
  (7,"F","aliquet@hotmail.org","9251529445","1993-10-25","365-9571 Sapien. Rd.",1,"San Rafael","NL","Carbonear","Cork",606037,"Saint Vincent and The Grenadines"),
  (8,"F","nunc@icloud.net","1695421182","1993-02-25","P.O. Box 473, 6708 Parturient Ave",2,"Chapecó","SK","Milestone","Tehuacán",640966,"San Marino"),
  (9,"M","vitae.mauris@aol.org","6447624774","2013-03-23","P.O. Box 168, 118 Dolor. Street",3,"Gingoog","NT","Coleville Lake","La Paz",674965,"Bahamas"),
  (10,"M","sem.pellentesque@aol.net","8222455866","2017-12-08","128-1056 Mollis. St.",3,"Whangarei","SK","Assiniboia","Zierikzee",692260,"Liechtenstein"),
  (11,"F","nonummy.ipsum@icloud.com","4875754813","2009-03-23","P.O. Box 897, 4480 At St.",2,"Buôn Ma Thuột","NL","Fogo","Rosciano",390818,"Tajikistan"),
  (12,"F","vulputate@yahoo.com","6278432478","2017-12-06","Ap #944-4431 Malesuada Ave",1,"Port Lincoln","NL","Rigolet","Cali",831864,"Honduras"),
  (13,"M","tortor.dictum.eu@yahoo.org","2571627779","2021-10-20","P.O. Box 801, 4990 Ac St.",4,"Farrukhabad-cum-Fatehgarh","NL","Rigolet","Sauda",216736,"Nepal"),
  (14,"M","nec.malesuada@icloud.net","1817587487","1998-05-04","889-7282 Vehicula St.",1,"Warren","NL","St. John's","Patos",744519,"Madagascar"),
  (15,"F","dui.augue@yahoo.edu","4455253137","2012-03-11","996-6711 Velit Avenue",1,"Malang","YT","Whitehorse","Kendal",647840,"Guyana"),
  (16,"F","rutrum.eu@aol.com","9368481496","1993-11-25","103-3177 Feugiat St.",3,"Tejar","NU","Iqaluit","Şanlıurfa",935664,"Ghana"),
  (17,"M","dictum.augue@yahoo.org","4273434676","1996-09-15","Ap #449-4291 Neque. Ave",3,"Mukachevo","NU","Gjoa Haven","Alix",763694,"Myanmar"),
  (18,"M","quisque.tincidunt.pede@outlook.edu","3723451236","2006-12-19","8600 At, Avenue",4,"Camaragibe","NT","Fort Providence","Okigwe",449912,"Sint Maarten"),
  (19,"F","lectus.a@hotmail.ca","2692421415","1992-05-21","750-1244 Amet Rd.",3,"Leerbeek","SK","Assiniboia","Vị Thanh",369328,"Netherlands"),
  (20,"F","fusce.aliquet@protonmail.ca","6733828763","2009-12-09","712-2204 Nec, Street",2,"Siquirres","ON","Midlands","Polokwane",124550,"Latvia"),
  (21,"M","mauris@google.com","7793384756","2020-09-21","667-6643 Id, Road",2,"Nova Kakhovka","AB","Crowsnest Pass","Chapecó",584750,"Azerbaijan"),
  (22,"M","non.massa@icloud.ca","8648269959","2007-11-18","P.O. Box 909, 479 Ullamcorper. Avenue",1,"Lincoln","NU","Iqaluit","L'Hospitalet de Llobregat",337064,"Bangladesh"),
  (23,"F","sed.sem@google.net","5861195527","2002-01-10","Ap #443-9886 Sociis Street",3,"Castanhal","NL","St. John's","Tillicoultry",210888,"French Polynesia"),
  (24,"F","lobortis.augue.scelerisque@icloud.net","6873457574","2014-07-02","Ap #128-4270 Lacus. St.",3,"Sokoto","BC","Belcarra","Pacoa",116556,"Sierra Leone"),
  (25,"M","vulputate.lacus@hotmail.couk","4927493624","2008-06-29","537-7214 Tellus. Rd.",1,"Lambayeque","NT","Wekweti","Rocky Mountain House",661357,"Martinique"),
  (26,"M","purus@yahoo.com","8354675852","2007-02-26","Ap #931-5862 Vel Ave",4,"Bollnäs","AB","Wood Buffalo","Lahore",965466,"Cayman Islands"),
  (27,"F","ac.tellus.suspendisse@yahoo.org","5546595318","2014-11-03","Ap #107-182 Eget Rd.",2,"Poitiers","PE","Charlottetown","El Salvador",296024,"Puerto Rico"),
  (28,"F","consequat.nec@google.edu","6763792764","1996-06-23","491-9487 Nisi. Rd.",3,"Colchester","YT","Watson Lake","Mirpur",331746,"Nicaragua"),
  (29,"M","erat@hotmail.edu","3248895389","2001-09-16","280-6462 Vulputate Avenue",2,"Geylang","ON","Windsor","Quesada",975999,"Zimbabwe"),
  (30,"M","donec.felis@outlook.edu","2543289442","2013-05-24","Ap #384-7849 In St.",1,"Eschwege","ON","Greater Sudbury","Santander",981696,"French Polynesia");

SET FOREIGN_KEY_CHECKS=1;