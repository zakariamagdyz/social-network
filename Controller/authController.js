const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../Models/User");
const HttpError = require("../Utils/HttpError");
const catchAsync = require("../utils/catchAsync");
const selectFields = require("../utils/selectFields");
const sendEmail = require("../Utils/email");

exports.signUp = catchAsync(async (req, res, next) => {
  const bodyData = selectFields(
    req.body,
    "name",
    "email",
    "password",
    "passwordConfirm"
  );

  const avatar = gravatar.url(bodyData.email, { s: "200", r: "pg", d: "mm" });
  const data = { avatar, ...bodyData };

  const newUser = await User.create(data);
  newUser.password = undefined;

  const token = newUser.generateJwtToken();
  res.status(200).json({ status: "success", data: { data: newUser }, token });
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new HttpError("Please provide your email & password!", 400));

  const currentUser = await User.findOne({ email }).select("+password");
  if (
    !currentUser ||
    !(await currentUser.correctPassword(password, currentUser.password))
  )
    return next(new HttpError("Invalid email or password", 401));

  const token = currentUser.generateJwtToken();
  this.password = undefined;
  res.status(200).json({ status: "success", token, data: currentUser });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new HttpError("You are not logged in, Please login to get access", 401)
    );
  }
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decode.id);
  if (!freshUser)
    return next(
      new HttpError("The user belonging to this token is no longer exists", 401)
    );

  if (freshUser.passwordChangedAfter(decode.iat))
    return next(
      new HttpError("User recently changed password! Please log in again", 401)
    );

  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role))
    return next(
      new HttpError("You dont have permission to perform this action", 403)
    );

  next();
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const currentUser = await User.findOne({ email: req.body.email });
  if (!currentUser)
    return next(new HttpError("There is no user for that email!", 400));
  const resetToken = currentUser.createResetToken();
  currentUser.save({ validateBeforeSave: false });

  const link = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/reset-password/${resetToken}`;
  const message = `Did you forget Your password, Please visit this link to reset your password ${link}`;

  try {
    sendEmail({
      email: currentUser.email,
      subject: "reset password valid for 10 min",
      message,
    });

    res
      .status(200)
      .send({ status: "success", message: "Email was sent successfully" });
  } catch (error) {
    return next(
      new HttpError(
        "there is an error while sending email, Please try again later"
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;

  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpired: { $gt: Date.now() },
  });

  if (!user) return next(new HttpError("token is invalid or has expired", 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetExpired = undefined;
  user.passwordResetToken = undefined;
  await user.save();

  const authToken = user.generateJwtToken();
  res.status(200).json({ status: "success", data: user, authToken });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  if (!(await bcrypt.compare(req.body.currentPassword, user.password))) {
    return next(new HttpError("your current password is incorrect", 400));
  }
  user.password = req.body.passwordNew;
  user.passwordConfirm = req.body.passwordConfirm;
  user.save();
  const token = user.generateJwtToken();
  res.status(200).json({ status: "success", data: user, token });
});
