const postgresDb = require("../config/postgre");

const getTransaction = () => {
    return new Promise((resolve, reject) => {
        const query = "select * from transactions";
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
            "insert into transactions (user_id,product_id,quantity,payment_method,order_time,status,tax,shipping_payment,total) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
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

const transactionRepo = { getTransaction, addTransaction, edit, deleted };

module.exports = transactionRepo;
