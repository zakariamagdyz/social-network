const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonWebToken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 55,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    minLength: 5,
    maxLength: 55,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: 8,
    maxLength: 55,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "The two passwords don't match",
    },
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "leader", "user"],
  },
  avatar: String,
  passwordResetToken: String,
  passwordResetExpired: Date,
  passwordChangedAt: Date,
  active: { type: String, default: true },
  createdAt: { type: Date, default: Date.now },
});

// excluded un-active users
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.generateJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
};

userSchema.methods.correctPassword = async function (
  candidatePassword,
  password
) {
  return await bcrypt.compare(candidatePassword, password);
};

userSchema.methods.passwordChangedAfter = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const passTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return jwtTimestamp < passTimestamp;
  }

  return false;
};

userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpired = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("user", userSchema);
