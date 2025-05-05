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
  try {
    const body = req.body;

    // Handle image upload
    body.image = `/uploads/images/${req.file.filename}`;

    logger.infoLog(`Creating with body ${JSON.stringify(body)}`);

    // Create the new document
    const doc = new AboutUsModel(body);

    // Validate the document
    await doc.validate();

    // Create the record in the service
    let data = await aboutUsPageService.createAboutUs(doc);

    logger.infoLog(`Created with Id: ${JSON.stringify(data)}`);

    // Send the response
    res.status(statusCodes.CREATED).json(data);
  } catch (error) {
    logger.errorLog("Unable to create", error);
    res.status(error.statusCode || statusCodes.INTERNAL_SERVER)
      .send({ status: error.status, message: error.message });
  }
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
