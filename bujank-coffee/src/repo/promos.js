const postgresDb = require("../config/postgre");

const getPromo = () => {
    return new Promise((resolve, reject) => {
        const query = "select * from promos";
        postgresDb.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};
const getPromoId = (params) => {
    return new Promise((resolve, reject) => {
        const query = "select * from promos where id = $1";
        postgresDb.query(query, [params.id], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};

const create = (body) => {
    return new Promise((resolve, reject) => {
        const query =
            "insert into promos (code_voucher,label,discount,valid) values (upper($1),upper($2),$3,$4)";
        const { code_voucher, label, discount, valid } = body;
        postgresDb.query(
            query,
            [code_voucher, label, discount, valid],
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

const update = (body, params) => {
    return new Promise((resolve, reject) => {
        let query = "update promos set ";
        const values = [];
        Object.keys(body).forEach((key, index, array) => {
            if (index === array.length - 1) {
                query += `${key} = $${index + 1} where id = $${index + 2}`;
                values.push(body[key], params.id);
                return;
            }
            query += `${key} = $${index + 1},`;
            values.push(body[key].toUpperCase());
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
        const query = "delete from promos where id = $1";
        postgresDb.query(query, [params.id], (err, queryResult) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(queryResult);
        });
    });
};
const promoRepo = {
    getPromo,
    getPromoId,
    create,
    update,
    deleted,
};
module.exports = promoRepo;
