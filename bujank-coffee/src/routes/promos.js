const express = require("express");
const promosRouter = express.Router();
const { get, getId, editPromo } = require("../controllers/promos");

promosRouter.get("/", get);
promosRouter.get("/:id", getId);
promosRouter.patch("/:id", editPromo);
module.exports = promosRouter;
