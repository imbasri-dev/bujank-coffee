const userRepo = require("../repo/users");

const get = async (req, res) => {
    try {
        const response = await userRepo.getUsers();
        res.status(200).json({
            result: response.rows,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};

const usersController = {
    get,
};
module.exports = usersController;
