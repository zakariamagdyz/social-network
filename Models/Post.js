const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  text: { type: String, required: true },
  likes: [{ user: { type: mongoose.Schema.ObjectId, ref: "user" } }],
  comments: [
    {
      user: { type: mongoose.Schema.ObjectId, ref: "user" },
      text: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  date: { type: Date, default: Date.now },
});

postSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name avatar" });

  next();
});

module.exports = mongoose.model("post", postSchema);
