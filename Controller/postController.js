const HttpError = require("../Utils/HttpError");
const catchAsync = require("../Utils/catchAsync");
const selectFields = require("../Utils/selectFields");
const Post = require("../Models/Post");
const Factory = require("./FactoryController");

exports.getAllPosts = Factory.getAll(Post);
exports.getAPost = Factory.getOne(
  Post,

  { path: "comments", populate: { path: "user", select: "name avatar" } }
);

exports.createAPost = catchAsync(async (req, res, next) => {
  const postOptions = {
    text: req.body.text,
    user: req.user._id,
  };

  const newPost = await Post.create(postOptions);
  const query = await Post.findById(newPost._id).populate({
    path: "user",
    select: "name avatar",
  });

  console.log(query);
  res.status(201).json({ status: "success", data: query });
});

// exports.updateAPost = catchAsync(async (req, res, next) => {
//   const postOptions = {
//     text: req.body.text,
//   };

//   const updatedPost = await Post.findByIdAndUpdate(req.params.id, postOptions, {
//     new: true,
//     runValidators: true,
//   });

//   if (!updatedPost)
//     return next(new HttpError("There is no post with that ID", 404));

//   res.status(200).json({ status: "success", data: { data: updatedPost } });
// });

exports.deleteAPost = catchAsync(async (req, res, next) => {
  const deletedPost = await Post.findByIdAndRemove(req.params.id);

  if (!deletedPost)
    return next(new HttpError("There is no post with that ID", 404));

  res.status(204).json({ status: "success" });
});

////////////////////////////////////

//update user's post
exports.updateUserPost = catchAsync(async (req, res, next) => {
  const postOptions = {
    text: req.body.text,
  };

  const post = await Post.findById(req.params.id);

  if (!post) return next(new HttpError("There is no post with that ID", 404));

  if (req.user.role !== "admin" && post.user.toString() !== req.user.id)
    return next(
      new HttpError("You dont have permission to perform this action", 403)
    );

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, postOptions, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ status: "success", data: { data: updatedPost } });
});

// deleted user's poset

exports.deleteUserpost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) return next(new HttpError("There is no post with that ID", 404));

  if (req.user.role !== "admin" && post.user.id !== req.user.id)
    return next(
      new HttpError("You dont have permission to perform this action", 403)
    );

  const deletedPost = await Post.findByIdAndRemove(req.params.id);

  res.status(204).json({ status: "success" });
});

exports.addLike = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new HttpError("There is no post with that ID", 404));

  const isExist = post.likes.find(
    (like) => like.user.toString() === req.user.id
  );
  if (isExist) {
    post.likes = post.likes.filter(
      (like) => like.user.toString() !== req.user.id
    );

    await post.save();
    return res.status(200).json({ status: "success", data: post.likes });
  }
  post.likes.push({ user: req.user.id });
  await post.save();

  res.status(200).json({ status: "success", data: post.likes });
});

exports.removeLike = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new HttpError("There is no post with that ID", 404));

  const isExist = post.likes.find(
    (like) => like.user.toString() === req.user.id
  );
  if (!isExist) {
    return next(new HttpError("This post is already unliked", 400));
  }
  post.likes.pull(isExist.id);
  await post.save();

  res.status(200).json({ status: "success" });
});

//add comments

exports.addComment = catchAsync(async (req, res, next) => {
  const commentOptions = {
    text: req.body.text,
    name: req.user.name,
    avatar: req.user.avatar,
    user: req.user.id,
  };
  const post = await Post.findById(req.params.id);
  if (!post) return next(new HttpError("There is no post with that ID", 404));

  post.comments.push(commentOptions);

  await post.save();
  const newpost = await Post.findById(req.params.id).populate({
    path: "comments.user",
    select: "name avatar",
  });

  res.status(200).json({ status: "success", data: newpost });
});

// remove Comments

exports.removeComments = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.post_id);
  if (!post) return next(new HttpError("There is no post with that ID", 404));

  //pull oute the comment

  const comment = post.comments.find(
    (comm) => comm.id === req.params.comment_id
  );

  if (!comment)
    return next(new HttpError("There is no comment with that ID", 404));

  if (req.user.role !== "admin" && comment.user.toString() !== req.user.id)
    return next(
      new HttpError("You dont have permission to remove this comment", 403)
    );

  post.comments.pull(req.params.comment_id);
  await post.save();

  res.status(204).json({ status: "success" });
});

exports.editComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.post_id);
  if (!post) return next(new HttpError("There is no post with that ID", 404));

  const comment = post.comments.find(
    (comm) => comm.id === req.params.comment_id
  );

  if (!comment)
    return next(new HttpError("There is no comment with that ID", 404));

  if (req.user.role !== "admin" && comment.user.toString() !== req.user.id)
    return next(
      new HttpError("You dont have permission to remove this comment", 403)
    );

  comment.text = req.body.text;
  await post.save();

  res.status(200).json({ status: "success" });
});

// exports.editPost = catchAsync(async (req, res, next) => {
//   const post = await Post.findById(req.params.id);
//   if (!post) return next(new HttpError("There is no post with that ID", 404));

//   if (req.user.role !== "admin" && post.user.toString() !== req.user.id) {
//     return next(
//       new HttpError("You dont have permission to edit this post", 403)
//     );
//   }
//   post.text = req.body.text;
//   await post.save();
//   res.status(201).json({ status: "success", data: { data: post } });
// });

exports.getLikes = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate({
    path: "likes",
    populate: { path: "user", select: "name avatar" },
  });

  if (!post) return next(new HttpError("There is no post with that ID", 404));
  return res.status(200).json({
    status: "success",
    data: post.likes.map((like) => like.toObject({ getters: true })),
  });
});
