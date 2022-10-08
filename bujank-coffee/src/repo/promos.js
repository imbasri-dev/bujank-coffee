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

const update = (body, params) => {
    return new Promise((resolve, reject) => {
        let query = "update promos set ";
        const values = [];
        // {author, title, publisher}
        // logika ini dibuat dengan mengasumsikan ada middleware validasi
        // validasi untuk menghilangkan properti object dari body yang tidak diinginkan
        Object.keys(body).forEach((key, index, array) => {
            if (index === array.length - 1) {
                query += `${key} = $${index + 1} where id = $${index + 2}`;
                values.push(body[key], params.id);
                return;
            }
            query += `${key} = $${index + 1},`;
            values.push(body[key]);
        });
        //   res.json({
        //     query,
        //     values,
        //   });
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
const promoRepo = {
    getPromo,
    getPromoId,
    update,
};
module.exports = promoRepo;
