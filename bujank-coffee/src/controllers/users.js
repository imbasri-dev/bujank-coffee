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
const getId = async (req, res) => {
    try {
        const response = await userRepo.getUsersId(req.params);
        res.status(200).json({
            result: response.rows,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};

const create = async (req, res) => {
    try {
        const response = await userRepo.createUsers(req.body);
        console.log(response);
        res.status(201).json({
            result: response,
        });
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
const usersController = {
    get,
    getId,
    create,
};
module.exports = usersController;
