
USE homes_for_heroes;


CREATE TABLE IF NOT EXISTS UserInfo (
    user_id INT PRIMARY KEY,
    gender CHAR(1) NOT NULL,
    email CHAR(255) NOT NULL,
    applicant_phone CHAR(255) NOT NULL,
    applicant_dob DATE ,
    street_name CHAR(255),
    curr_level  CHAR(255),
    city CHAR(255) NOT NULL,
    province CHAR(3) NOT NULL,
    referral CHAR(255),
    demographic CHAR(255),
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES client_users(user_id)
);

CREATE TABLE  IF NOT EXISTS NextKin (
    kin_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    kin_name CHAR(255) NOT NULL,
    relationship CHAR(255),
    kin_phone CHAR(255),
    kin_email CHAR(255),
    kin_address CHAR(255),
	CONSTRAINT FOREIGN KEY (user_id) REFERENCES client_users(user_id)
);

CREATE TABLE IF NOT EXISTS MedicalHistory (
    user_id INT PRIMARY KEY, 
    vision_impairment BOOLEAN,
    incontinent BOOLEAN,
    respiratory_supplies_required BOOLEAN,
    medication_reminder_required BOOLEAN,
    special_dietary_requirements BOOLEAN,
    criminal_history BOOLEAN,
    suicide_attempts_history BOOLEAN,
    financial_problems_history BOOLEAN,
    verbal_abuse_history BOOLEAN,
    alcohol_abuse_history BOOLEAN,
    gambling_abuse_history BOOLEAN,
    aggressive_behaviour_history BOOLEAN,
    receiving_abuse_history BOOLEAN,
    hoarding_behaviour_history BOOLEAN,
    drug_abuse_history BOOLEAN,
    contagious_diseases BOOLEAN,
    hearing_impairment BOOLEAN,
    mental_health_concerns BOOLEAN,
    mental_health_diagnosis BOOLEAN,
    mobility_issues BOOLEAN,
    other_issues BOOLEAN,
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES client_users(user_id)
);
