const express = require("express");
const transactionsRouter = express.Router();

transactionsRouter.get("/", (req, res) => {
    res.json({
        msg: "transaction!",
    });
});
module.exports = transactionsRouter;
