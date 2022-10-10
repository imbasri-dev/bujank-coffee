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
const edit = async (req, res) => {
    try {
        const response = await productRepo.update(req.body, req.params);
        res.status(200).json({
            data: response.command,
            msg: (response.text = "data changed successfully"),
            status: (response.status = 202),
        });
    } catch (err) {
        res.status(500).json({
            debug: console.log(err),
            msg: "Internal server Error",
        });
    }
};

const searchProductPromo = async (req, res) => {
    try {
        const response = await productRepo.searchProductPromo(req.query);
        res.status(200).json({
            data: response.rows,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};
const deleted = async (req, res) => {
    try {
        const response = await productRepo.deleted(req.params);

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
const productSort = async (req, res) => {
    try {
        const response = await productRepo.productSort(req.query);
        res.status(200).json({
            data: response.rows,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};
const productController = {
    get,
    getProductCategory,
    create,
    edit,
    deleted,
    productSort,
    searchProductPromo,
};
module.exports = productController;
