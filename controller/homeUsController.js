const homeUsPageService = require("../services/homeUsService");
const { statusCodes } = require("../utility/constant");
const { ValidationError } = require("../utility/commonError");
const HomeUsModel = require("../models/homeUsModel");
const logger = require("../utility/coustomlogger");
const catchAsync = require("../utility/catchAsync");

exports.getAllHomeUs = catchAsync(async (req, res, next) => {
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

  const data = await homeUsPageService.getAllHomeUs(pagination);
  res.status(statusCodes.OK).json(data);
});

exports.createHomeUs = catchAsync(async (req, res, next) => {
  const body = {...req.body};
  
  if (req.files && req.files.length > 0) {
    body.image = req.files.map(file => `/uploads/images/${file.filename}`);
  }
  //  else if (req.file) {
  //   body.image = [`/uploads/${req.file.filename}`];
  // }
  console.log(body);
  console.log(body.image)

  const doc = new HomeUsModel(body);

  await doc.validate().catch((error) => {
    throw new ValidationError(error.message);
  });

  const data = await homeUsPageService.createHomeUs(doc);
  res.status(statusCodes.CREATED).json(data);
});

exports.getHomeUs = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await homeUsPageService.getHomeUs(id);
  res.status(statusCodes.OK).json(data);
});

exports.updateHomeUs = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const newImages = [];

  if (req.files && req.files.length > 0) {
    newImages.push(...req.files.map(file => `uploads/images/${file.filename}`));
  }
  console.log(newImages);

  const data = await homeUsPageService.updateHomeUs(id, {
    ...body,
    image:newImages,
  });

  res.status(statusCodes.OK).json(data);
});

exports.deleteHomeUs = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await homeUsPageService.deleteHomeUs(id);
  res.status(statusCodes.OK).json(data);
});
