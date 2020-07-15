const User = require("../Models/User");
const HttpError = require("../Utils/HttpError");
const catchAsync = require("../Utils/catchAsync");
const selectFields = require("../Utils/selectFields");
const Factory = require("./FactoryController");
const Profile = require("../Models/Profile");

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
  const user = await User.findByIdAndUpdate(req.user._id, selected, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ status: "success", user });
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
