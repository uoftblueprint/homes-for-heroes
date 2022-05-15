USE homes_for_heroes;

CREATE TABLE IF NOT EXISTS chapters (
    name VARCHAR(255) NOT NULL,
    chapter_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(chapter_id)
);