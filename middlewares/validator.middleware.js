const { ObjectId } = require("mongoose").Types;

const validateReqBody = (req, res, next) => {
  try {
    const { name, email, phoneNumber } = req.body;

    if (!name || !email || !phoneNumber) {
      return res
        .status(400)
        .json({ message: "Please provide the requierd fields" });
    }
    next();
  } catch (error) {
    console.log("Error validating userInfo:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong, Please try again later" });
  }
};

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  next();
};

module.exports = { validateReqBody, validateId };
