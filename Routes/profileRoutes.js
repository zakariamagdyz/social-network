const express = require("express");
const profileController = require("../Controller/profileController");
const authController = require("../Controller/authController");
const { route } = require("./userRoutes");
const router = express.Router();

router
  .route("/")
  .get(profileController.getAllProfiles)
  .post(authController.protect, profileController.createAndUpdateProfile);

router.use(authController.protect);

router.route("/experience").patch(profileController.addExperience);
router.route("/education").patch(profileController.addEducation);
router.route("/experience/:id").delete(profileController.deleteExperince);
router.route("/education/:id").delete(profileController.deleteEducation);
router.route("/github/:username").get(profileController.gitRepos);
router
  .route("/me")
  .get(profileController.getMe, profileController.getAUserProfile);

router.route("/:id").get(profileController.getAUserProfile);

module.exports = router;
