const postgresDb = require("../config/postgre");
// get all user
const getProduct = () => {
    return new Promise((resolve, reject) => {
        const query = "select * from products  order by id asc";
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
            "select * from products where lower(category) = lower($1) order by id asc";
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
            "insert into products (title,price,category,size,product_img,description,stock) values ($1,$2,$3,$4,$5,$6,$7)";
        const {
            title,
            price,
            category,
            size,
            product_img,
            description,
            stock,
        } = body;

        postgresDb.query(
            query,
            [title, price, category, size, product_img, description, stock],
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

const searchProductPromo = (queryParams) => {
    return new Promise((resolve, reject) => {
        const query =
            "select * from products where lower(title) like lower($1) order by id asc ";
        const values = [`%${queryParams.title}%`];
        postgresDb.query(query, values, (err, queryResult) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(queryResult);
        });
    });
};

const update = (body, params) => {
    return new Promise((resolve, reject) => {
        let query = "update products set ";
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
const productSort = (queryParams) => {
    return new Promise((resolve, reject) => {
        let query = "select * from products ";
        if (queryParams.sort == "low") {
            query += "order by price asc ";
        }
        if (queryParams.sort == "high") {
            query += "order by price desc ";
        }
        if (queryParams.sort == "created_asc") {
            query += "order by created_at asc ";
        }
        if (queryParams.sort == "created_desc") {
            query += "order by created_at desc";
        }
        if (queryParams.sort == "favorite") {
            query =
                "select products.* , transactions.quantity from products inner join transactions on products.id = transactions.id  order by transactions.quantity desc";
        }
        postgresDb.query(query, (err, queryResult) => {
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
    searchProductPromo,
    update,
    productSort,
    deleted,
};
module.exports = productRepo;
