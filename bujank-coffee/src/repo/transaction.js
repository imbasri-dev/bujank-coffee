const postgresDb = require("../config/postgre");

const getTransaction = () => {
    return new Promise((resolve, reject) => {
        const query =
            "SELECT transactions.id,users.email,users.phones , users.address ,order_time,payment_method ,status,transaction_date ,quantity ,products.price,shipping_payment,tax , ((total*0) + (price * quantity +shipping_payment + tax)) AS total FROM transactions FULL JOIN users ON transactions.id = users.id FULL JOIN products ON transactions.id = products.id where transactions.id = users.id ORDER BY transactions.id asc";
        postgresDb.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};
const addTransaction = (body) => {
    return new Promise((resolve, reject) => {
        const query =
            "insert into transactions (user_id,product_id,quantity,payment_method,order_time,status,tax,shipping_payment,total) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)";
        const {
            user_id,
            product_id,
            quantity,
            payment_method,
            order_time,
            status,
            tax,
            shipping_payment,
            total,
        } = body;

        postgresDb.query(
            query,
            [
                user_id,
                product_id,
                quantity,
                payment_method,
                order_time,
                status,
                tax,
                shipping_payment,
                total,
            ],
            (err, queryResult) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(queryResult);
            }
        );
    });
};

const edit = (body, params) => {
    return new Promise((resolve, reject) => {
        let query = "update transactions set ";
        const values = [];
        Object.keys(body).forEach((key, index, array) => {
            if (index === array.length - 1) {
                query += `${key} = $${index + 1} where id = $${index + 2}`;
                values.push(body[key], params.id);
                return;
            }
            query += `${key} = $${index + 1},`;
            values.push(body[key]);
        });
        console.log(values);
        postgresDb
            .query(query, values)
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};

const getCategory = (params) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT transactions.id,users.email,users.phones , users.address ,order_time,payment_method ,promos.code_voucher  ,status,transaction_date ,quantity,products.price,(transactions.quantity * (products.price * promos.discount/100)) AS discount, (products.price * transactions.quantity) AS sub_total ,shipping_payment,tax ,(price * transactions.quantity +tax + shipping_payment - (transactions.quantity * (products.price * promos.discount/100)) ) AS total
FROM transactions
FULL JOIN users ON transactions.id = users.id
FULL JOIN products ON transactions.id = products.id
FULL JOIN promos ON products.id = promos.id
WHERE products.category = $1 AND users.id = transactions.id`;
        postgresDb.query(query, [params.category], (err, queryResult) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(queryResult);
        });
    });
};

const deleted = (params) => {
    return new Promise((resolve, reject) => {
        const query = "delete from transactions where id = $1";
        postgresDb.query(query, [params.id], (err, queryResult) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(queryResult);
        });
    });
};

const transactionRepo = {
    getTransaction,
    addTransaction,
    edit,
    getCategory,
    deleted,
};

module.exports = transactionRepo;
