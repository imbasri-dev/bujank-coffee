const postgresDb = require("../config/postgre");
// get all user

const getProduct = () => {
    return new Promise((resolve, reject) => {
        const query = "select * from products";
        postgresDb.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};

const getCategory = (params) => {
    return new Promise((resolve, reject) => {
        const query =
            "select * from products where lower(category) = lower($1)";
        postgresDb.query(query, [params.category], (err, queryResult) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(queryResult);
        });
    });
};

const addProduct = (body) => {
    return new Promise((resolve, reject) => {
        const query =
            "insert into products (title,price,category,size,product_img,description,stock,promos_id) values ($1,$2,$3,$4,$5,$6,$7,$8)";
        const {
            title,
            price,
            category,
            size,
            product_img,
            description,
            stock,
            promos_id,
        } = body;

        postgresDb.query(
            query,
            [
                title,
                price,
                category,
                size,
                product_img,
                description,
                stock,
                promos_id,
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

const deleted = (params) => {
    return new Promise((resolve, reject) => {
        const query = "delete from products where id = $1";
        postgresDb.query(query, [params.id], (err, queryResult) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(queryResult);
        });
    });
};
const productRepo = {
    getProduct,
    getCategory,
    addProduct,
    deleted,
};
module.exports = productRepo;
