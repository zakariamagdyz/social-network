const HttpError = require("../Utils/HttpError");
const ApiFeature = require("../Utils/apiFeatures");
const catchAsync = require("../Utils/catchAsync");

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const docQuery = new ApiFeature(Model.find(), req.query)
      .filter()
      .sorting()
      .limitingFields()
      .pagination();
    const docs = await docQuery.query;
    res
      .status(200)
      .json({ status: "success", results: docs.length, data: docs });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let queryDoc = Model.findById(req.params.id);
    if (popOptions) queryDoc.populate(popOptions);
    const doc = await queryDoc;
    if (!doc)
      return next(new HttpError("No document found with that id!"), 404);

    res.status(200).json({ status: "success", data: doc });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ status: "success", data: newDoc });
  });

exports.updataOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedDoc)
      return next(new HttpError("No document found with that id!", 404));

    res.status(201).json({ status: "success", data: updatedDoc });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const deletedDoc = await Model.findByIdAndDelete(req.params.id);
    if (!deletedDoc)
      return next(new HttpError("No document found with that id!", 404));
    res.status(204).json({ status: "success" });
  });
