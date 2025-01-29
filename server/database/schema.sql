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
    theme VARCHAR(50) NOT NULL,
    details TEXT NOT NULL,
    user_id INT NOT NULL DEFAULT 1,
    CONSTRAINT fk_request_user
        FOREIGN KEY (user_id)
        REFERENCES `user`(id)
        ON DELETE CASCADE
        
);

CREATE TABLE comment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    details TEXT NOT NULL,
    `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    request_id INT NOT NULL,
    CONSTRAINT fk_comment_user
        FOREIGN KEY (user_id)
        REFERENCES `user`(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_comment_request
        FOREIGN KEY (request_id)
        REFERENCES request(id)
        ON DELETE CASCADE
);

insert into `role`(rolename)
values 
  ("admin"),
  ("visiteur");

insert into user(firstname, lastname,birthday, email, hashed_password, role_id)
values
  ("Toto", "Tutu", "1994-02-05" , "toto.tutu@mail.com", "123456", 1),
  ("Tata", "Titi", "2000.01.02","tata.titi@mail.com", "78910", 2);

insert into request(`date`,title, theme, details, user_id)
values 
  ("1994.12.24","titre1", "theme1", "bcp de details1", 1),
  ("1994.11.24","titre2", "theme2", "bcp de details2", 2);

insert into comment(details, `date`, user_id, request_id)
values 
  ("jesuispasdaccord", "1994.11.25", 1, 1),
  ("jesuisdaccord", "1994.11.26", 2, 2);