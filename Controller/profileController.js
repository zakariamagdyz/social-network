const HttpError = require("../Utils/HttpError");
const catchAsync = require("../Utils/catchAsync");
const selectFields = require("../Utils/selectFields");
const Profile = require("../Models/Profile");
const Factory = require("./FactoryController");
const request = require("request");

exports.createAndUpdateProfile = catchAsync(async (req, res, next) => {
  const {
    company,
    location,
    website,
    status,
    skills,
    bio,
    gitHubUserName,
    experience,
    education,
    social,
  } = req.body;

  let profileData = {};

  profileData.user = req.user._id;
  if (company) profileData.company = company;
  if (location) profileData.location = location;
  if (website) profileData.website = website;
  if (status) profileData.status = status;
  if (bio) profileData.bio = bio;
  if (gitHubUserName) profileData.gitHubUserName = gitHubUserName;
  profileData.social = {};
  if (social.youtube) profileData.social.youtube = social.youtube;
  if (social.linkedin) profileData.social.linkedin = social.linkedin;
  if (social.facebook) profileData.social.facebook = social.facebook;
  if (social.twitter) profileData.social.twitter = social.twitter;
  if (social.instagram) profileData.social.instagram = social.instagram;
  if (skills) {
    const filterdSkills = skills.split(",").map((skill) => skill.trim());

    profileData.skills = filterdSkills;
  } else {
    profileData.skills = [];
  }

  if (experience) profileData.experience = experience;
  if (education) profileData.education = education;

  const currentProfile = await Profile.findOne({ user: req.user._id });

  if (!currentProfile) {
    const newProfile = await Profile.create(profileData);

    return res.status(200).json({
      status: "success",
      data: newProfile.toObject({ getters: true }),
    });
  }

  const updatedProfile = await Profile.findOneAndUpdate(
    { user: req.user._id },
    profileData,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: updatedProfile.toObject({ getters: true }),
  });
});

exports.getAllProfiles = Factory.getAll(Profile);

exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

exports.getAUserProfile = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.params.id });
  if (!profile)
    return next(new HttpError("There is no profile for that user!", 404));

  res
    .status(200)
    .json({ status: "success", data: profile.toObject({ getters: true }) });
});

exports.addExperience = catchAsync(async (req, res, next) => {
  const expObj = selectFields(
    req.body,
    "title",
    "location",
    "company",
    "from",
    "to",
    "description",
    "current"
  );

  const currentProfile = await Profile.findOne({ user: req.user._id });

  currentProfile.experience.unshift(expObj);
  await currentProfile.save();

  res.status(200).json({ status: "success", data: { data: currentProfile } });
});

exports.addEducation = catchAsync(async (req, res, next) => {
  const expObj = selectFields(
    req.body,
    "school",
    "degree",
    "fieldOfStudy",
    "from",
    "to",
    "description",
    "current"
  );

  const currentProfile = await Profile.findOne({ user: req.user._id });

  currentProfile.education.unshift(expObj);

  await currentProfile.save();

  res.status(200).json({ status: "success", data: currentProfile });
});

exports.deleteExperince = catchAsync(async (req, res, next) => {
  const currentProfile = await Profile.findOne({ user: req.user._id });

  currentProfile.experience.pull(req.params.id);

  await currentProfile.save();

  res.status(200).json({ status: "success", data: currentProfile });
});

exports.deleteEducation = catchAsync(async (req, res, next) => {
  const currentProfile = await Profile.findOne({ user: req.user._id });

  currentProfile.education.pull(req.params.id);

  await currentProfile.save();

  res.status(200).json({ status: "success", data: currentProfile });
});

exports.gitRepos = catchAsync(async (req, res, next) => {
  const options = {
    uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
    method: "GET",
    headers: { "user-agent": "node.js" },
  };

  request(options, (err, response, body) => {
    if (err) console.log(err);
    if (response.statusCode !== 200) {
      return next(new HttpError("No repos found for that username", 404));
    }

    res.status(200).json({ status: "success", data: JSON.parse(body) });
  });
});
