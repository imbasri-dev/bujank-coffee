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

const getProductId = (params) => {
    return new Promise((resolve, reject) => {
        const query =
            "select title,price,category,size,product_img,description,stock from products where id=$1";
        postgresDb.query(query, [params.id], (err, queryResult) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(queryResult);
        });
    });
};
const productRepo = {
    getProduct,
    getProductId,
};
module.exports = productRepo;
