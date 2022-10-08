const productRepo = require("../repo/products");

const get = async (req, res) => {
    try {
        const response = await productRepo.getProduct();
        res.status(200).json({
            data: response.rows,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal server Error",
        });
    }
};
const getProductCategory = async (req, res) => {
    try {
        const response = await productRepo.getCategory(req.params);
        res.status(200).json({
            data: response.rows,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};

const create = async (req, res) => {
    try {
        const response = await productRepo.addProduct(req.body);
        res.status(201).json({
            // debug: console.log(response),
            data: response.command,
            msg: (response.text = "Create data successful"),
            status: (response.status = 201),
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal server Error",
        });
    }
};

const deleted = async (req, res) => {
    try {
        const response = await productRepo.deleted(req.params);

        return res.status(200).json({
            data: response.command,
            msg: (response.text = "Delete successful"),
        });
    } catch (err) {
        return res.status(500).json({
            msg: "Internal Server Error",
            status: (err.status = 500),
        });
    }
};
const productController = {
    get,
    getProductCategory,
    create,
    deleted,
};
module.exports = productController;
