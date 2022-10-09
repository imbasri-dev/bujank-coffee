-- create table users
create table users(
id serial primary key not null,
email varchar unique not null,
"password" varchar(50) not null,
phones varchar (20) not null,
displayName varchar null,
firstName varchar  null,
lastName varchar  null,
dateBirth date NULL DEFAULT '1990-01-01',
gender varchar (6) null,
address varchar null,
user_img varchar null default'img_profile.jpg',
created_at date default current_timestamp,
last_login date default current_timestamp
);

-- gender male | female
--create type gender as enum ('Male','Female');

select id ,displayName,email from users;

-- insert to table users 


INSERT INTO users (id,email,"password",phones)
values(26,'bujank@gmail.com','bujank','+6285464545');