const express = require("express");
const authController = require("../Controller/authController");
const userController = require("../Controller/userController");

const router = express.Router();

router.route("/sign-up").post(authController.signUp);
router.route("/sign-out").post(authController.signOut);
router.route("/log-in").post(authController.signIn);
router.route("/forgot-password").post(authController.forgotPassword);
router.route("/reset-password/:token").patch(authController.resetPassword);
router
  .route("/update-my-password")
  .patch(authController.protect, authController.updatePassword);

router.use(authController.protect);

////
router
  .route("/update-me")
  .patch(
    userController.updataUserAvatar,
    userController.resizePhoto,
    userController.updateMe
  );
router.route("/delete-me").delete(userController.deleteMe);

router
  .route("/auth")
  .get(userController.addMeToParams, userController.getAUser);

// router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createAUser);

router
  .route("/:id")
  .get(userController.getAUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
