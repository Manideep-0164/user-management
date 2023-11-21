const express = require("express");
const app = express();
const { connectToMongoDB } = require("./configs/db");
const { userRouter } = require("./routes/userRouter");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to User Management app." });
});

app.use("", userRouter);

connectToMongoDB
  .then(() => {
    console.log("Connected to DB");
    app.listen(1010, () => {
      console.log("Server is running on port: 1010");
    });
  })
  .catch((error) => {
    console.log("Error connecting DB/Server", error);
  });
