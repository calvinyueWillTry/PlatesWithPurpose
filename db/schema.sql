DROP DATABASE IF EXISTS PlatesWithPurpose_db;
CREATE DATABASE PlatesWithPurpose_db;
USE PlatesWithPurpose_db;

CREATE TABLE restaurants (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    description TEXT(100) NOT NULL,
    price INT,
    time_to_prepare INT NOT NULL,
    cost INT NOT NULL,
),

CREATE TABLE user_type (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    description TEXT(100) NOT NULL,
    receiver BOOLEAN,
),

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FOREIGN KEY (user_type),
    name VARCHAR(40) NOT NULL,
    address TEXT(100) NOT NULL,
    city VARCHAR(40) NOT NULL,
    state VARCHAR(40) NOT NULL,
    zipcode INT NOT NULL,
    phoneNumber INT NOT NULL,
),

CREATE TABLE requests (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FOREIGN KEY (user_type),
    FOREIGN KEY (restaurants),
    delivered BOOLEAN,
    address TEXT(100) NOT NULL,
    city VARCHAR(40) NOT NULL,
    state VARCHAR(40) NOT NULL,
    zipcode INT NOT NULL,

)

