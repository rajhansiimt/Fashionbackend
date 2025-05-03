const beautyUsPageService = require("../services/beautyUsService");
const { statusCodes } = require("../utility/constant");
const { ValidationError } = require("../utility/commonError");
const BeautyUsModel = require("../models/beautyUsModel");
const logger = require("../utility/coustomlogger");
const catchAsync = require("../utility/catchAsync");

exports.getAllBeautyUs = catchAsync(async (req, res, next) => {
  try {
    logger.infoLog(`Getting All About Us Record`);
    let pagination = {};
    if (req.query.pagination) {
      pagination = JSON.parse(req.query.pagination);
    } else {
      pagination = {
        currentPage: 0,
        docPerPageCount: 0,
        totalDocCount: 0,
        totalPageCount: 0
      };
    }

    let data = await beautyUsPageService.getAllBeautyUs(pagination);
    logger.infoLog(`${data.aboutUs.length} Record found`);

    res.status(statusCodes.OK).json(data);
  } catch (error) {
    logger.errorlLog("Unable to get", error);
    res.status(error.statusCode || statusCodes.INTERNAL_SERVER)
      .send({ status: error.status, message: error.message });
  }
});

exports.createBeautyUs = catchAsync(async (req, res, next) => {
  try {
    const body = req.body;
    body.image = `/uploads/images/${req.file.filename}`;

    logger.infoLog(`Creating with body ${JSON.stringify(body)}`);

    const doc = new BeautyUsModel(body);
    await doc.validate().catch((error) => {
      throw new ValidationError(error.message);
    });

    let data = await beautyUsPageService.createBeautyUs(doc);
    logger.infoLog(`Created with Id: ${JSON.stringify(data)}`);

    res.status(statusCodes.CREATED).json(data);
  } catch (error) {
    logger.errorlLog("Unable to create", error);
    res.status(error.statusCode || statusCodes.INTERNAL_SERVER)
      .send({ status: error.status, message: error.message });
  }
});

exports.getBeautyUs = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    logger.infoLog(`Getting by id${id}`);

    let data = await beautyUsPageService.getBeautyUs(id);
    logger.infoLog(`found with id: ${JSON.stringify(id)}`);

    res.status(statusCodes.OK).json(data);
  } catch (error) {
    logger.errorlLog("Unable to get", error);
    res.status(error.statusCode || statusCodes.INTERNAL_SERVER)
      .send({ status: error.status, message: error.message });
  }
});

exports.updateBeautyUs = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const { body } = req;

    if (req.file) {
      body.image = `/uploads/image/${req.file.filename}`;
    }

    logger.infoLog(`Updating Record with id: ${JSON.stringify(id)}`);
    logger.infoLog(`FrontEnd Body: ${JSON.stringify(body)}`);

    let data = await beautyUsPageService.updateBeautyUs(id, body);
    res.status(statusCodes.OK).json(data);
  } catch (error) {
    logger.errorlLog("Unable to update", error);
    res.status(error.statusCode || statusCodes.IsNTERNAL_SERVER)
      .send({ status: error.status, message: error.message });
  }
});

exports.deleteBeautyUs = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    logger.infoLog(`Deleting Record with Id: ${JSON.stringify(id)}`);

    let data = await beautyUsPageService.deleteBeautyUs(id);
    logger.infoLog(`Deleted with Id: ${JSON.stringify(id)}`);
    res.status(statusCodes.OK).json(data);
  } catch (error) {
    logger.errorlLog("Unable to delete", error);
    res.status(error.statusCode || statusCodes.INTERNAL_SERVER)
      .send({ status: error.status, message: error.message });
  }
});
