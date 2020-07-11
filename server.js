const mongoose = require("mongoose");
const dotEnv = require("dotenv");

dotEnv.config();

process.on("uncaughtException", (err) => {
  console.log(`${err.name} : ${err.message} \n ${err.stack}`);
  console.log("shutting down server");
  process.exit(1);
});

const app = require("./app");
const db = process.env.MONGO_URI.replace(
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

const port = process.env.PORT || 5000;

const server = app.listen(port);

process.on("unhandledRejection", (err) => {
  console.log(`${err.name} : ${err.message} /n ${err.stack}`);
  console.log("shutting down server promise");

  server.close(() => process.exit(1));
});
