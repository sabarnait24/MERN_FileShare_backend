const mongoose = require("mongoose");
const validator = require("validator");
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB_CON)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });