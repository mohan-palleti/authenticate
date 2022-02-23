const express = require("express");
const app = express();
app.use(express.json());
const connect = require("./configs/db");

const { register, login } = require("./controllers/auth.controllers");

app.post("/register", register);
app.post("/login", login);
const PORT = process.env.PORT || 1212;
app.listen(PORT, async () => {
  try {
    await connect();
    console.log("Server is running on 1212");
  } catch (err) {
    console.log(err);
  }
});
