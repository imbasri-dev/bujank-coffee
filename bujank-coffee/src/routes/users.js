const express = require("express");
const userRouter = express.Router();

const { get } = require("../controllers/users");

userRouter.get("/", get);

// testing router
// userRouter.get("/", (req, res) => {
//     res.json({
//         msg: "user!",
//     });
// });

module.exports = userRouter;
