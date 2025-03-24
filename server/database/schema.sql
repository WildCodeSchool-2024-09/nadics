CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    rolename VARCHAR(50) NOT NULL
);

CREATE TABLE `user` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    birthday DATE NOT NULL,
    avatar VARCHAR(255),
    email VARCHAR(50) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    role_id INT DEFAULT 2,
    CONSTRAINT fk_user_role
	      FOREIGN KEY (role_id) 
        REFERENCES role(id)
        ON DELETE SET NULL
);

CREATE TABLE request (
    id INT PRIMARY KEY AUTO_INCREMENT,
   `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(50) NOT NULL,
    tag1 VARCHAR(50) NOT NULL,
    tag2 VARCHAR(50),
    details1 TEXT NOT NULL,
    details2 TEXT,
    details3 TEXT,
    user_id INT NOT NUll,
    CONSTRAINT fk_request_user
        FOREIGN KEY (user_id)
        REFERENCES `user`(id)
        ON DELETE CASCADE
        
);

CREATE TABLE comment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    details TEXT NOT NULL,
    `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL DEFAULT 1,
    request_id INT NOT NULL DEFAULT 1,
    CONSTRAINT fk_comment_user
        FOREIGN KEY (user_id)
        REFERENCES `user`(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_comment_request
        FOREIGN KEY (request_id)
        REFERENCES request(id)
        ON DELETE CASCADE
);

INSERT INTO `role`(rolename)
VALUES 
  ("admin"),
  ("visitor");

INSERT INTO user(firstname, lastname, birthday, email, hashed_password, role_id)
VALUES
  ("Alice", "Ramez", "1990-06-15", "alice.ramez@example.com", "hashed_pwd_1", 1),
  ("Sami", "Toumi", "1985-09-22", "sami.toumi@example.com", "hashed_pwd_2", 2);

INSERT INTO request(`date`, title, tag1, tag2, details1, details2, details3, user_id)
VALUES 
  ("2024-03-15", "Install Solar Panels", "Environment", "Projects", 
   "We should install solar panels on the main building roof to reduce our carbon footprint.", 
   "A preliminary study indicates we could save approximately 30% on our electricity bills.",
   "The return on investment is estimated at 5-7 years depending on local weather conditions.", 1),
   
  ("2024-03-16", "Parking Issue", "Transportation", "Issues", 
   "The parking lot is often full during peak hours, forcing some employees to park on the street.", 
   "This creates safety concerns and parking tickets for some employees.",
   "We could consider implementing a carpooling system or negotiate additional spaces with the neighboring building.", 2),
   
  ("2024-03-18", "Security System Improvement", "Security", "Improvements", 
   "Our current entry system is outdated and has potential security vulnerabilities.", 
   "Several minor incidents have been reported over the last three months.",
   "An upgrade to a biometric or smart card system would be recommended.", 1),
   
  ("2024-03-20", "Community Garden Creation", "Environment", "Projects", 
   "The unused space behind the building could be transformed into a community garden.", 
   "This would improve employee wellbeing and our ecological image.",
   "Several employees have already volunteered to participate in maintenance.", 2);

INSERT INTO comment(details, `date`, user_id, request_id)
VALUES 
  ("I fully support this initiative. I've seen similar results at my previous workplace.", NOW(), 2, 1),
  ("We should also add electric vehicle charging stations while we're at it.", NOW(), 1, 1),
  ("Carpooling seems to be the quickest solution to implement. I would be willing to coordinate a pilot program.", NOW(), 1, 2),
  ("Perhaps we could also encourage the use of public transportation with a transit allowance?", NOW(), 2, 2),
  ("Security should be our top priority. I vote for the biometric system.", NOW(), 2, 3),
  ("We should also strengthen our password policy while we're at it.", NOW(), 1, 3),
  ("I love this idea! I would be thrilled to participate in this garden project.", NOW(), 1, 4),
  ("We could even consider growing vegetables for the cafeteria.", NOW(), 2, 4);