--create table promo
CREATE TABLE promos (
id serial PRIMARY KEY NOT NULL,
code_voucher varchar (15) NOT NULL,
label varchar (100) NOT NULL,
discount int NOT NULL,
valid date NOT NULL DEFAULT current_timestamp,
created_promo date DEFAULT current_timestamp
);


