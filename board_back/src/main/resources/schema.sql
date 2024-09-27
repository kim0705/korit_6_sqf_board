--DROP TABLE IF EXISTS USER;
--DROP TABLE IF EXISTS ROLE;
--DROP TABLE IF EXISTS USER_ROLES;

--CREATE TABLE USER (
--    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--    username VARCHAR(255) UNIQUE NOT NULL,
--    password VARCHAR(255) not null,
--    name VARCHAR(255) not null,
--    email VARCHAR(255) not null,
--    img TEXT not null DEFAULT 'https://firebasestorage.googleapis.com/v0/b/userprofile-8cc14.appspot.com/o/user%2Fdefault.png?alt=media&token=711743e9-c343-4ef0-ab4e-7afcef9f6542'
--);

--CREATE TABLE ROLE (
--    id BIGINT AUTO_INCREMENT PRIMARY KEY,
--    name VARCHAR(255) UNIQUE not null
--);

--INSERT INTO ROLE
--VALUES  (DEFAULT, 'ROLE_USER'),
--        (DEFAULT, 'ROLE_MANAGER'),
--        (DEFAULT, 'ROLE_ADMIN');

--CREATE TABLE USER_ROLES (
--    id BIGINT AUTO_INCREMENT PRIMARY KEY,
--    user_id BIGINT not null,
--    role_id BIGINT not null
--);

--CREATE TABLE OAUTH2_USER (
--    id BIGINT AUTO_INCREMENT PRIMARY KEY,
--    user_id BIGINT not null,
--    oauth2_name VARCHAR(255) UNIQUE not null,
--    provider VARCHAR(255) not null
--);

--DROP TABLE IF EXISTS BOARD;

--CREATE TABLE BOARD (
--    id BIGINT AUTO_INCREMENT PRIMARY KEY,
--    title VARCHAR(255) not null,
--    content longtext not null,
--    user_id BIGINT not null
--);

ALTER TABLE user ADD COLUMN email_valid INT NOT NULL DEFAULT 0;

--CREATE TABLE BOARD_LIKE (
--    id BIGINT AUTO_INCREMENT PRIMARY KEY,
--    board_id BIGINT not null,
--    user_id BIGINT not null
--);

--DROP TABLE IF EXISTS comment;
--CREATE TABLE comment (
--    id BIGINT AUTO_INCREMENT PRIMARY KEY,
--    board_id BIGINT not null,
--    parent_id BIGINT null ,
--    content text not null,
--    writer_id BIGINT not null,
--    create_date datetime not null
--);






