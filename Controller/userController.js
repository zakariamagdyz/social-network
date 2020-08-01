const User = require("../Models/User");
const HttpError = require("../Utils/HttpError");
const catchAsync = require("../Utils/catchAsync");
const selectFields = require("../Utils/selectFields");
const Factory = require("./FactoryController");
const Profile = require("../Models/Profile");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const app = require("../app");

let dest = "uploads/images";

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, dest);
//   },

//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });
const multerStorage = multer.memoryStorage();

exports.resizePhoto = catchAsync(async (req, res, next) => {
  // store file in memory is more efficient than store in disk and read it again by sharp
  console.log(req.file);
  req.file.path = `${dest}/user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`${req.file.path}`);

  next();
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new HttpError("Not an image, Please upload only image", 400), false);
  }
};

const updataAvatar = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.updataUserAvatar = updataAvatar.single("avatar");

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new HttpError(
        "This route is not for update password, Please use /update-my-password",
        400
      )
    );
  }

  const selected = selectFields(req.body, "name", "email");
  if (req.file) {
    selected.avatar = req.file.path;
    fs.unlink(req.user.avatar, (err) => console.log(err));
  }

  const user = await User.findByIdAndUpdate(req.user._id, selected, {
    new: true,
    runValidators: true,
  });

  // const data=new FormData();

  res.status(200).json({ status: "success", data: user });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { active: false },
    {
      new: true,
      runValidators: true,
    }
  );

  await Profile.findOneAndDelete({ user: req.user._id });
  res.status(204).json({ status: "success" });
});

exports.getAllUsers = Factory.getAll(User);

exports.getAUser = Factory.getOne(User);
exports.updateUser = Factory.updataOne(User);
exports.deleteUser = Factory.deleteOne(User);

exports.createAUser = (req, res, next) => {
  return next(
    new HttpError("please use sign-up route to create a new user", 400)
  );
};

exports.addMeToParams = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
