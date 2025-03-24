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

INSERT INTO request(`date`, title, tag1, details1, user_id)
VALUES 
  ("2024-03-15", "Improve Mobile Accessibility", "Accessibility", "The current mobile UI is not user-friendly. We need to redesign it.", 1),
  ("2024-03-18", "Add Dark Mode", "UI", "Several users have requested a dark mode option for better readability at night.", 2);

INSERT INTO comment(details, `date`, user_id, request_id)
VALUES 
  ("I completely agree. The mobile experience needs improvement.", NOW(), 2, 1),
  ("Dark mode would be a great addition for sure.", NOW(), 1, 2);
