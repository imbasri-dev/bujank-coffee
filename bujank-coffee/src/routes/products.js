const express = require("express");
const productsRouter = express.Router();
const {
    get,
    getProductCategory,
    create,
    edit,
    deleted,
    searchProductPromo,
} = require("../controllers/products");

productsRouter.get("/product", get); //get all products
productsRouter.get("/search", searchProductPromo);
productsRouter.get("/:category", getProductCategory);
productsRouter.post("/add", create);
productsRouter.patch("/:id", edit);
productsRouter.delete("/:id", deleted);

// productsRouter.get("/", (req, res) => {
//     res.json({
//         msg: "product!",
//     });
// });

module.exports = productsRouter;
