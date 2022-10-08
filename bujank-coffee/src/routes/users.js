const express = require("express");
const userRouter = express.Router();

const {
    get,
    getId,
    create,
    editProfile,
    deleted,
} = require("../controllers/users");

userRouter.get("/", get);
userRouter.get("/:id", getId);
userRouter.post("/signup", create);
userRouter.patch("/:id", editProfile);
userRouter.delete("/:id", deleted);

// testing router
// userRouter.get("/", (req, res) => {
//     res.json({
//         msg: "user!",
//     });
// });

module.exports = userRouter;
