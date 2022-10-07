const express = require("express");
const productsRouter = express.Router();
const { get, getId } = require("../controllers/products");

productsRouter.get("/", get);
productsRouter.get("/:id", getId);

// productsRouter.get("/", (req, res) => {
//     res.json({
//         msg: "product!",
//     });
// });

module.exports = productsRouter;
