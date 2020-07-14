const express = require("express");
const authController = require("../Controller/authController");
const postController = require("../Controller/postController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createAPost);
router
  .route("/:id")
  .get(postController.getAPost)
  .patch(postController.updateUserPost)
  .delete(postController.deleteUserpost);

router.route("/:id/like").post(postController.addLike);
router.route("/:id/likes").get(postController.getLikes);
router.route("/:id/unlike").delete(postController.removeLike);
router.route("/:id/comments").post(postController.addComment);
router.route("/:post_id/:comment_id").delete(postController.removeComments);
router.route("/:post_id/:comment_id").patch(postController.editComment);

module.exports = router;
