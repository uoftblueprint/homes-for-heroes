SET FOREIGN_KEY_CHECKS=0;

INSERT INTO `chapters` (`chapter_name`)
VALUES
  ("Initial Chapter");

INSERT INTO `client_users` (`name`,`email`,`role_id`, `chapter_id`, `verified`,`oauth`, `phone`, `password`)
VALUES
  ("Raymond Chen","mesbah@gmail.com",2,1,1,0, "5062322232", "$2b$15$P6WyshJ2ys3xvDL9HqpGduD0w.woRawkNAIIBCNHvdVCF5kLUtk8u");

SET FOREIGN_KEY_CHECKS=1;