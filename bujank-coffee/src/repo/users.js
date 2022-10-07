const postgresDb = require("../config/postgre");

const getUsers = () => {
    return new Promise((resolve, reject) => {
        const query = "select user_id,username,email from users";
        postgresDb.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};

const usersRepo = {
    getUsers,
};
module.exports = usersRepo;
