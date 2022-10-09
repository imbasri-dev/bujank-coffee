const promosRepo = require("../repo/promos");

const get = async (req, res) => {
    try {
        const response = await promosRepo.getPromo();
        res.status(200).json({
            data: response.rows,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal server Error",
        });
    }
};
const getId = async (req, res) => {
    try {
        const response = await promosRepo.getPromoId(req.params);
        res.status(200).json({
            data: response.rows,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal server Error",
        });
    }
};

const addPromo = async (req, res) => {
    try {
        const response = await promosRepo.create(req.body);
        res.status(201).json({
            data: response.command,
            msg: (response.text = "Create data successful"),
            status: (response.status = 201),
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};

const editPromo = async (req, res) => {
    try {
        const respone = await promosRepo.update(req.body, req.params);
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

const searchPromo = async (req, res) => {
    try {
        const response = await promosRepo.search(req.query);
        res.status(200).json({
            data: response.rows,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};
const deleted = async (req, res) => {
    try {
        const response = await promosRepo.deleted(req.params);

        return res.status(200).json({
            data: response.command,
            msg: (response.text = "Delete successful"),
            status: (response.status = 202),
        });
    } catch (err) {
        return res.status(500).json({
            msg: "Internal Server Error",
            status: (err.status = 500),
        });
    }
};

const promosController = {
    get,
    getId,
    addPromo,
    editPromo,
    searchPromo,
    deleted,
};
module.exports = promosController;
