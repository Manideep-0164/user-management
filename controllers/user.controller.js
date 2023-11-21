const { UserModel } = require("../models/user.model");
const { handleError } = require("../helpers/errorHandler");

const addUser = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;

    const isUserExists = await UserModel.findOne({ email: email });
    if (isUserExists) {
      return res
        .status(409)
        .json({ message: "User with email, already exists." });
    }

    const user = UserModel({ name, email, phoneNumber });
    await user.save();

    res.status(201).json({ message: "User added", user: user });
  } catch (error) {
    handleError(error, "Error adding user:");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    if (allUsers.length === 0) {
      return res.status(404).json({ message: "Users not found." });
    }
    res.status(200).json(allUsers);
  } catch (error) {
    handleError(error, "Error getting all users:");
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "No user found." });
    }

    res.status(200).json({ user });
  } catch (error) {
    handleError(error, "Error fetching user:");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "No user found." });
    }

    res.status(200).json({ message: "User deleted", user: deletedUser });
  } catch (error) {
    handleError(error, "Error deleting user:");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber } = req.body;

    const valuesToUpdate = {};

    if (!name && !email && !phoneNumber) {
      return res.status(400).json({
        message:
          "Please provide one of these fields name/email/phoneNumber to update",
      });
    }

    if (name) valuesToUpdate.name = name;
    if (phoneNumber) valuesToUpdate.phoneNumber = phoneNumber;
    if (email) {
      if (await UserModel.findOne({ email })) {
        return res
          .status(409)
          .json({ message: "User with provided email, already exists" });
      }
      valuesToUpdate.email = email;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, valuesToUpdate);

    if (!updatedUser) {
      return res.status(404).json({ message: "No user found." });
    }

    res.status(200).json({ message: "User updated" });
  } catch (error) {
    handleError(error, "Error updating user:");
  }
};

module.exports = { addUser, getAllUsers, getUser, deleteUser, updateUser };
