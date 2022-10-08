const express = require("express");

// import router
const usersRouter = require("./users");
const productsRouter = require("./products");
const promosRouter = require("./promos");
const transactionRouter = require("./transactions.js");

// main router
const mainRouter = express.Router();

const prefix = "/api";

// hubungkan subrouter
mainRouter.use(`${prefix}/user`, usersRouter);
mainRouter.use(`${prefix}/product`, productsRouter);
mainRouter.use(`${prefix}/promo`, promosRouter);
mainRouter.use(`${prefix}/transaction`, transactionRouter);
mainRouter.get("/", (req, res) => {
    res.json({
        msg: "Welcome! Bujank Coffee",
    });
});

module.exports = mainRouter;
