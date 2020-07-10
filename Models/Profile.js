const mongoose = require("mongoose");
const validator = require("validator");

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "user" },
    company: { type: String, maxLength: 55 },
    location: { type: String, maxLength: 55 },
    website: {
      type: String,
      maxLength: 55,
      validate: [validator.isURL, "Please provide a valid url"],
    },
    status: { type: String, maxLength: 55 },
    skills: {
      type: [String],
      validate: {
        validator: function (val) {
          console.log(val.length);
          return val.length > 0;
        },
        message: "Please provide your skills",
      },
    },
    bio: String,
    gitHubUserName: String,
    experience: [
      {
        title: { type: String, required: true },
        location: { type: String, required: true },
        company: { type: String, required: true },
        from: { type: Date, required: true },
        to: Date,
        current: Boolean,
        description: String,
      },
    ],
    education: [
      {
        school: { type: String, required: true },
        degree: { type: String, required: true },
        fieldOfStudy: { type: String, required: true },
        from: { type: Date, required: true },
        to: Date,
        current: { type: Boolean, default: false },
        description: String,
      },
    ],
    social: {
      youtube: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"],
      },
      facebook: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"],
      },
      linkedin: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"],
      },
      twitter: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"],
      },
      instagram: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"],
      },
    },
    date: { type: Date, default: Date.now },
  },
  { minimize: false }
);

profileSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name avatar" });
  next();
});

module.exports = mongoose.model("profile", profileSchema);
