const express = require("express");
const productsRouter = express.Router();
const {
    get,
    getProductCategory,
    create,
    edit,
    deleted,
    searchProductPromo,
    productSort,
} = require("../controllers/products");

productsRouter.get("/all", get); //get all productsn
productsRouter.get("/search", searchProductPromo);
productsRouter.get("/sort", productSort);
productsRouter.get("/:category", getProductCategory);
productsRouter.post("/add", create);
productsRouter.patch("/:id", edit);
productsRouter.delete("/:id", deleted);

module.exports = productsRouter;
