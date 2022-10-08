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
const promosController = {
    get,
    getId,
    editPromo,
};
module.exports = promosController;
