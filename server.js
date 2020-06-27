const mongoose = require("mongoose");
const dotEnv = require("dotenv");

dotEnv.config();

process.on("uncaughtException", (err) => {
  console.log(`${err.name} : ${err.message}`);
  console.log("shutting down server");
  process.exit(1);
});

const app = require("./app");
const db = process.env.DATABASE_STRING.replace(
  "<password>",
  process.env.DATABASE_Password
);

mongoose
  .connect(db, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to DB"));

const server = app.listen(process.env.NODE_PORT);

process.on("unhandledRejection", (err) => {
  console.log(`${err.name} : ${err.message}`);
  console.log("shutting down server promise");

  server.close(() => process.exit(1));
});
