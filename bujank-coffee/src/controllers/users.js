const userRepo = require("../repo/users");

const get = async (req, res) => {
    try {
        const response = await userRepo.getUsers();
        res.status(200).json({
            data: response.rows,
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
            data: response.rows,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};

// create signup new user
const create = async (req, res) => {
    try {
        const response = await userRepo.createUsers(req.body);
        res.status(201).json({
            data: response.command,
            respone: "successfully created account.",
            status: (response.status = 201),
        });
    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.detail,
            status: (err.status = 406),
        });
    }
};

const editProfile = async (req, res) => {
    try {
        const response = await userRepo.editUsers(req.body, req.params);
        res.status(202).json({
            data: response.command,
            msg: (response.text = "data changed successfully"),
            status: (response.status = 202),
        });
    } catch (err) {
        res.status(500).json({
            err: console.log(err),
            msg: "Internal Server Error",
        });
    }
};
const deleted = async (req, res) => {
    try {
        const response = await userRepo.deleted(req.params);
        res.status(202).json({
            data: (response.text = "data delete succesfully"),
            status: (res.status = 202),
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};
const usersController = {
    get,
    getId,
    create,
    editProfile,
    deleted,
};
module.exports = usersController;
