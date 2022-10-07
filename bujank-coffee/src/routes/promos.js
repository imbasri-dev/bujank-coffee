const express = require("express");
const promosRouter = express.Router();

promosRouter.get("/", (req, res) => {
    res.json({
        msg: "promos",
    });
});
module.exports = promosRouter;
