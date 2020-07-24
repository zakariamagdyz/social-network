const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log(`${err.name} : ${err.message} \n ${err.stack}`);
  console.log("shutting down server");
  process.exit(1);
});

const app = require("./app");

const db =
  process.env.MONGO_URI ||
  `mongodb+srv://zakariaDevConnector:${process.env.DATABASE_PASSWORD}@devconnector-eoyey.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

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
