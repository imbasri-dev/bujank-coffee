const postgresDb = require("../config/postgre");

// get all user
const getUsers = () => {
    return new Promise((resolve, reject) => {
        const query = "select * from users order by id asc";
        postgresDb.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};

// getUserId search sesuai user id ke berapa dengan params endpoint
const getUsersId = (params) => {
    return new Promise((resolve, reject) => {
        const query = "select * from users where id = $1";
        postgresDb.query(query, [params.id], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};

// create signup new user
const createUsers = (body) => {
    return new Promise((resolve, reject) => {
        const query =
            "insert into users (email,password,phones) values ($1,$2,$3)";
        const { email, password, phones } = body;
        postgresDb.query(
            query,
            [email, password, phones],
            (err, queryResult) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(queryResult);
            }
        );
    });
};

const editUsers = (body, params) => {
    return new Promise((resolve, reject) => {
        let query = "update users set ";
        const values = [];
        // {author, title, publisher}
        // logika ini dibuat dengan mengasumsikan ada middleware validasi
        // validasi untuk menghilangkan properti object dari body yang tidak diinginkan
        Object.keys(body).forEach((key, idx, array) => {
            if (idx === array.length - 1) {
                query += `${key} = $${idx + 1} where id = $${idx + 2}`;
                values.push(body[key], params.id);
                return;
            }
            query += `${key} = $${idx + 1},`;
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
const deleted = (params) => {
    return new Promise((resolve, reject) => {
        const query = "delete from users where id = $1";
        postgresDb.query(query, [params.id], (err, queryResult) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(queryResult);
        });
    });
};
const usersRepo = {
    getUsers,
    getUsersId,
    createUsers,
    editUsers,
    deleted,
};
module.exports = usersRepo;
