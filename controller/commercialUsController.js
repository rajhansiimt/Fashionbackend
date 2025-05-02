const commercialUsPageService = require("../services/commercialUsService");
const { statusCodes } = require("../utility/constant");
const { ValidationError } = require("../utility/commonError");
const commercialUsModel = require("../models/commercialUsModel");
const logger = require("../utility/coustomlogger");
const catchAsync = require("../utility/catchAsync");

exports.getAllCommercialUs = catchAsync(async (req, res, next) => {
  try {
    logger.infoLog(`Getting All Commercial Us Record`);
    let pagination = {};
    if (req.query.pagination) {
      pagination = JSON.parse(req.query.pagination);
    } else {
      (pagination.currentPage = 0),
        (pagination.docPerPageCount = 0),
        (pagination.totalDocCount = 0),
        (pagination.totalPageCount = 0);
    }

    let data = await commercialUsPageService.getAllCommercialUs(pagination);
    logger.infoLog(`${data.aboutUs.length} Record found`);

    res.status(statusCodes.OK).json(data);
  } catch (error) {
    logger.errorlLog("Unable to get", error);
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER)
      .send({ status: error.status, message: error.message });
  }
});

exports.createCommercialUs = catchAsync(async (req, res, next) => {
  try {
    const body = req.body;

    console.log("@@@@@@@@@@@@@@@@@@@@@@@", req.body);

    body.image = `/uploads/images/${req.file.filename}`;

    // if (req.files && req.files.image?.length > 0) {
    //   body.image = req.files.image.map((file) => file.location);
    // }
    logger.infoLog(`Creating with body ${JSON.stringify(body)}`);

    const doc = new commercialUsModel(body);
    console.log(doc);
    await doc.validate().catch((error) => {

      throw new ValidationError(error.message);
    });

    let data = await commercialUsPageService.createCommercialUs(doc);
    logger.infoLog(`Created with Id: ${JSON.stringify(data)}`);

    res.status(statusCodes.CREATED).json(data);
  } catch (error) {
    logger.errorlLog("Unable to create", error);
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER)
      .send({ status: error.status, message: error.message });
  }
});

exports.getCommercialUs = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    logger.infoLog(`Getting by id${id}`);

    let data = await commercialUsPageService.getCommercialUs(id);
    logger.infoLog(`found with id: ${JSON.stringify(id)}`);

    res.status(statusCodes.OK).json(data);
  } catch (error) {
    logger.errorlLog("Unable to get", error);
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER)
      .send({ status: error.status, message: error.message });
  }
});

exports.updateCommercialUs = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const { body } = req;

    // if (
    //   req.files &&
    //   req.files.image &&
    //   req.files.image.length > 0
    // ) {
    //   console.log("Uploaded files:", req.files.image);

    //   const newImages = req.files.image
    //     .filter((file) => file && file.location)
    //     .map((file) => file.location);

    //   console.log("New Images:", newImages);

    //   body.image = Array.isArray(body.image)
    //     ? [...body.propertyImage, ...newImages]
    //     : newImages;

    //   console.log("Updated propertyImage in Body:", body.bedroomAmenities);
    // }

    if (req.file) {
      body.image = `/uploads/images/${req.file.filename}`;
    }


    logger.infoLog(`Updating Record with id: ${JSON.stringify(id)}`);
    logger.infoLog(`FrontEnd Body: ${JSON.stringify(body)}`);

    let data = await commercialUsPageService.updateCommercialUs(id, body);
    res.status(statusCodes.OK).json(data);
  } catch (error) {
    logger.errorlLog("Unable to update", error);
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER)
      .send({ status: error.status, message: error.message });
  }
});

exports.deleteCommercialUs = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    logger.infoLog(`Deleting Record with Id: ${JSON.stringify(id)}`);

    let data = await commercialUsPageService.deleteCommercialUs(id);
    logger.infoLog(`Deleted with Id: ${JSON.stringify(id)}`);
    res.status(statusCodes.OK).json(data);
  } catch (error) {
    logger.errorlLog("Unable to delete", error);
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER)
      .send({ status: error.status, message: error.message });
  }
});
