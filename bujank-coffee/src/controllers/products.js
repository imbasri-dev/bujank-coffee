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
const getId = async (req, res) => {
    try {
        const response = await productRepo.getProductId(req.params);
        res.status(200).json({
            data: response.rows,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};
const productController = {
    get,
    getId,
};
module.exports = productController;
