const express = require("express");
const transactionsRouter = express.Router();

const { get, add, edit, deleted } = require("../controllers/transaction");

transactionsRouter.get("/", get);
transactionsRouter.post("/add", add);
transactionsRouter.patch("/:id", edit);
transactionsRouter.delete("/:id", deleted);
// transactionsRouter.get("/", (req, res) => {
//     res.json({
//         msg: "transaction!",
//     });
// });
module.exports = transactionsRouter;
