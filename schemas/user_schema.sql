
USE homes_for_heroes;


CREATE TABLE  IF NOT EXISTS UserInfo (
    user_id INT PRIMARY KEY,
    gender CHAR(1) DEFAULT NULL,
    email CHAR(255) DEFAULT NULL,
    applicant_phone CHAR(255) DEFAULT NULL,
    applicant_dob DATE DEFAULT NULL,
    street_name CHAR(255) DEFAULT NULL,
    curr_level  CHAR(255) DEFAULT NULL,
    city CHAR(255) DEFAULT NULL,
    province CHAR(3) DEFAULT NULL,
    referral CHAR(255) DEFAULT NULL,
    outgoing CHAR(255) DEFAULT NULL,
    income INT DEFAULT NULL,
    demographic CHAR(255) DEFAULT NULL,
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES client_users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS NextKin (
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
