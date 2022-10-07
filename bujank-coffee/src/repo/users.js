const postgresDb = require("../config/postgre");

const getUsers = () => {
    return new Promise((resolve, reject) => {
        const query = "select * from users";
        postgresDb.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};

// search sesuai user id ke berapa
const getUsersId = (params) => {
    return new Promise((resolve, reject) => {
        const query = "select * from users where id =$1";
        postgresDb.query(query, [params.id], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};

const createUsers = (body) => {
    return new Promise((resolve, reject) => {
        const query =
            "insert into users (email,password,phones) values ($1,$2,$3) ";
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

const usersRepo = {
    getUsers,
    getUsersId,
    createUsers,
};
module.exports = usersRepo;
