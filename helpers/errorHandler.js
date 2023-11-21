const handleError = (error, message) => {
  console.log(message, error);
  res
    .status(500)
    .json({ message: "Something went wrong, please try again later" });
};

module.exports = { handleError };
