const express = require("express");
const morgan = require("morgan");
const HttpError = require("./Utils/HttpError");
const errorControlelr = require("./Controller/errorController");
const userRouter = require("./Routes/userRoutes");
const profileRouter = require("./Routes/profileRoutes");
const postRouter = require("./Routes/postRoutes");
const path = require("path");
const compression = require("compression");
const fs = require("fs");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(compression());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/profiles", profileRouter);
app.use("/api/v1/posts", postRouter);

//when request match this route it will serve file came after images
app.use("/uploads/images/", express.static("uploads/images"));

// app.all("*", function (req, res, next) {
//   return next(new HttpError("This route is not valid!", 404));
// });

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(errorControlelr);

module.exports = app;

// fs.unlink(
//   "client\\public\\images\\user-5f163ccdd832b93a8c5fe8df-1595338584067.jpeg",
//   (err) => {
//     console.log(err);
//   }
// );
