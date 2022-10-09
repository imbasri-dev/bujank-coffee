--CREATE DATA TYPE ENUM size
create TYPE "size" AS ENUM ('R','L','XL');
--create table product
CREATE TABLE products(
id serial PRIMARY KEY NOT NULL,
title varchar NOT NULL,
price int NOT NULL,
category varchar(20) NOT NULL,
"size" varchar (10) NOT NULL,
product_img varchar NOT NULL,
description varchar NOT NULL,
stock int NOT NULL,
promos_id int DEFAULT 0,
created_at timestamp DEFAULT now()
);

--insert table product
INSERT INTO products (title,price,category,product_img,description,stock)
VALUES('Veggie tomato mix',34000,'Foods','veggie.jpg','
Veggie potato mix is ​​made from a mixture of 13 kinds of beans such as black beans, kidney beans, garbanzo beans, peas, etc. This soup mix does not add any food flavours, making it ideal for cooking according to your taste.',
35);


-- filter berdasarkan category dan transaksi quantity ,waktu , harga
SELECT products.category  ,transactions.order_time ,transactions.transaction_date ,transactions.status ,transactions.quantity ,price,transactions.shipping_payment,transactions.tax , (transactions.total*0) + (price * transactions.quantity +transactions.shipping_payment + transactions.tax) AS total
FROM products 
FULL JOIN transactions ON products.id = transactions.id
WHERE category= 'Coffee' ORDER BY transactions.order_time ,transactions.quantity ,transactions.total  asc;


SELECT products.*, promos.code_voucher ,promos."label" ,promos.discount ,promos."valid",promos.created_promo 
FROM products 
FULL JOIN promos ON products.id = promos.id
WHERE category= 'Coffee' ORDER BY products.title asc;
