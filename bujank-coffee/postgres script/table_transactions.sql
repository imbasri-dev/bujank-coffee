-- create table transactions
create table transactions(
 id serial primary key not null,
 user_id int NOT NULL,
 product_id int NOT NULL,
 quantity int NOT NULL,
 payment_method varchar(50) NOT NULL,
 order_time time DEFAULT current_timestamp,
 status varchar (10) NOT NULL DEFAULT 'Process',
 transaction_date timestamp with time ZONE DEFAULT now(),
 tax int NOT NULL,
 shipping_payment int NOT NULL, 
 total int not null
);


SELECT products.title , product_id,status ,quantity  ,transaction_date ,total FROM transactions LEFT JOIN products 
ON transactions.product_id  = products.id;


--filter berdasarkan table sesuai id dan dmana ketika id yang dicari
SELECT transactions.id,users.email,products.title,quantity,status ,transaction_date ,total
FROM transactions 
FULL JOIN users ON transactions.id = users.id
FULL JOIN products ON transactions.id = products.id
WHERE transactions.id = 1;


--get all products berdasarkan hasil dari transactions harga * quantity + tax + shipping_payment 
SELECT transactions.id,users.email,users.phones , users.address ,order_time,payment_method   ,status,transaction_date ,quantity ,products.price,shipping_payment,tax , ((total*0) + (price * quantity +shipping_payment + tax)) AS total
FROM transactions 
FULL JOIN users ON transactions.id = users.id
FULL JOIN products ON transactions.id = products.id
ORDER BY transactions.id asc;