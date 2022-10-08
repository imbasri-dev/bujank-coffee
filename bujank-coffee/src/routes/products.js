const express = require("express");
const productsRouter = express.Router();
const {
    get,
    getProductCategory,
    create,
    deleted,
} = require("../controllers/products");

productsRouter.get("/", get);
productsRouter.get("/:category", getProductCategory);
productsRouter.post("/add", create);
productsRouter.delete("/delete/:id", deleted);

// productsRouter.get("/", (req, res) => {
//     res.json({
//         msg: "product!",
//     });
// });

module.exports = productsRouter;
