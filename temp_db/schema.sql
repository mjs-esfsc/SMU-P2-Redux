DROP DATABASE IF EXISTS bookshare_db;
CREATE DATABASE bookshare_db;

USE bookshare_db;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(30) NOT NULL,
  email VARCHAR(30) NOT NULL

);

CREATE TABLE book (
  id INT NOT NULL,
  title VARCHAR(30) NOT NULL,
  book_description TEXT,
  genre TEXT,
  author TEXT,
  user_id INT,
  FOREIGN KEY (user_id)
  REFERENCES User(id)
  ON DELETE SET NULL
);


INSERT INTO user (id, full_name, email)
VALUES (001, "Mark", "test1@email.com"),
       (002, "Miranda", "test2@email.com"),
       (003, "Zach",  "test3@email.com");

INSERT INTO book (id, title, book_description, genre, author, user_id)
VALUES (001, "War and Peace", "long", "classic fiction", "Melville", 001),
       (002, "Whiteout", "fun", "history", "Cockburn", 001),
       (003, "Helter Skelter", "easy", "true crime", "Bugliosi", 003),
       (004, "The Grapes of Wrath", "sad", "classic fiction", "Steinbeck", 002),
       (005, "Tinker Tailor Soldier Spy", "easy", "thriller", "LeCarre", 002),
       (006, "Dignity", "photo essay", "politics", "Arnade", 002),
       (007, "Dune", "cool", "fiction", "Herbert", 003);