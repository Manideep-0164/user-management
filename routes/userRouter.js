const express = require("express");
const userRouter = express.Router();

const {
  validateReqBody,
  validateId,
} = require("../middlewares/validator.middleware");

const {
  addUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/user.controller");

userRouter.post("/users", validateReqBody, addUser);

userRouter.get("/users", getAllUsers);

userRouter.get("/users/:id", validateId, getUser);

userRouter.delete("/users/:id", validateId, deleteUser);

userRouter.patch("/users/:id", validateId, updateUser);

module.exports = { userRouter };
