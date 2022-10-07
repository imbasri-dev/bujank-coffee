const express = require("express");
const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
    res.json({
        msg: "product!",
    });
});
module.exports = productsRouter;
