const aboutUsPageService = require("../services/aboutUsService");
const { statusCodes } = require("../utility/constant");
const { ValidationError } = require("../utility/commonError");
const AboutUsModel = require("../models/aboutUsModel");
const logger = require("../utility/coustomlogger");
const catchAsync = require("../utility/catchAsync");

exports.getAllAboutUs = catchAsync(async (req, res, next) => {
  let pagination = {};
  if (req.query.pagination) {
    pagination = JSON.parse(req.query.pagination);
  } else {
    pagination = {
      currentPage: 0,
      docPerPageCount: 50,
      totalDocCount: 0,
      totalPageCount: 0,
    };
  }

  const data = await aboutUsPageService.getAllAboutUs(pagination);
  res.status(statusCodes.OK).json(data);
});

exports.createAboutUs = catchAsync(async (req, res, next) => {
  const body = {...req.body};
  
  if (req.files && req.files.length > 0) {
    body.image = req.files.map(file => `/uploads/images/${file.filename}`);
  }
  //  else if (req.file) {
  //   body.image = [`/uploads/${req.file.filename}`];
  // }
  console.log(body);
  console.log(body.image)

  const doc = new AboutUsModel(body);

  await doc.validate().catch((error) => {
    throw new ValidationError(error.message);
  });

  const data = await aboutUsPageService.createAboutUs(doc);
  res.status(statusCodes.CREATED).json(data);
});

exports.getAboutUs = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await aboutUsPageService.getAboutUs(id);
  res.status(statusCodes.OK).json(data);
});

exports.updateAboutUs = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const newImages = [];

  if (req.files && req.files.length > 0) {
    newImages.push(...req.files.map(file => `uploads/images/${file.filename}`));
  }
  console.log(newImages);

  const data = await aboutUsPageService.updateAboutUs(id, {
    ...body,
    image:newImages,
  });

  res.status(statusCodes.OK).json(data);
});

exports.deleteAboutUs = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await aboutUsPageService.deleteAboutUs(id);
  res.status(statusCodes.OK).json(data);
});
