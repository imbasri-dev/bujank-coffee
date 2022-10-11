const postgresDb = require("../config/postgre");

const getTransaction = () => {
    return new Promise((resolve, reject) => {
        const query =
            "SELECT transactions.id,users.displayname ,promos.code_voucher ,users.address,users.phones promos,products.title AS name_product,products.price ,quantity,subtotal,status,tax,shipping_payment , (subtotal+tax+shipping_payment)AS total ,payment_method ,transaction_date FROM transactions  FULL JOIN users ON transactions.user_id  = users.id FULL JOIN products ON transactions.product_id  = products.id FULL JOIN promos ON transactions.promo_id  = promos.id WHERE transactions.user_id  = users.id order by transactions asc";
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
            "insert into transactions (user_id,product_id,promo_id,quantity,payment_method,order_time,status,subtotal,tax,shipping_payment,total) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";
        const {
            user_id,
            product_id,
            promo_id,
            quantity,
            payment_method,
            order_time,
            status,
            subtotal,
            tax,
            shipping_payment,
            total,
        } = body;

        postgresDb.query(
            query,
            [
                user_id,
                product_id,
                promo_id,
                quantity,
                payment_method,
                order_time,
                status,
                subtotal,
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

const transactionId = (params) => {
    return new Promise((resolve, reject) => {
        const query =
            "SELECT transactions.id,users.displayName,users.address,users.phones ,products.title AS name_product,products.price ,quantity,subtotal,status,tax,shipping_payment , (subtotal+tax+shipping_payment) AS total ,payment_method,promos.code_voucher ,transaction_date FROM transactions inner JOIN users ON transactions.user_id  = users.id INNER JOIN products ON transactions.product_id  = products.id FULL JOIN promos ON transactions.promo_id  = promos.id WHERE transactions.id  = $1";
        postgresDb.query(query, [params.id], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
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
    transactionId,
    edit,
    deleted,
};

module.exports = transactionRepo;
