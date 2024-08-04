const express = require("express");
const {
  createNewUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.post("/", createNewUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:userId", getSingleUser);
module.exports = userRouter;
