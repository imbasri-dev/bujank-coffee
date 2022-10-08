const transactionRepo = require("../repo/transaction");

const get = async (req, res) => {
    try {
        const response = await transactionRepo.getTransaction();
        res.status(200).json({
            data: response.rows,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal server Error",
        });
    }
};

const add = async (req, res) => {
    try {
        const response = await transactionRepo.addTransaction(req.body);
        res.status(201).json({
            data: (response.text = "data created succesfully"),
            status: (response.status = 201),
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};

const edit = async (req, res) => {
    try {
        const respone = await transactionRepo.edit(req.body, req.params);
        res.status(200).json({
            data: respone.command,
            msg: (respone.text = "data changed successfully"),
            status: (respone.status = 202),
        });
    } catch (err) {
        res.status(500).json({
            debug: console.log(err),
            msg: "Internal server Error",
        });
    }
};
const deleted = async (req, res) => {
    try {
        const response = await transactionRepo.deleted(req.params);
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
const transactionController = {
    get,
    add,
    edit,
    deleted,
};
module.exports = transactionController;
