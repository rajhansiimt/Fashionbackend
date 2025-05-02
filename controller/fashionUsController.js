const fashionUsPageService = require("../services/fashionUsService");
const { statusCodes } = require("../utility/constant");
const { ValidationError } = require("../utility/commonError");
const FashionUsModel = require("../models/fashionUsModel");
const logger = require("../utility/coustomlogger");
const catchAsync = require("../utility/catchAsync");

exports.getAllFashionUs = catchAsync(async (req, res, next) => {
  try {
    logger.infoLog(`Getting All About Us Record`);
    let pagination = {};
    if (req.query.pagination) {
      pagination = JSON.parse(req.query.pagination);
    } else {
      (pagination.currentPage = 0),
        (pagination.docPerPageCount = 0),
        (pagination.totalDocCount = 0),
        (pagination.totalPageCount = 0);
    }

    let data = await fashionUsPageService.getAllFashionUs(pagination);
    logger.infoLog(`${data.aboutUs.length} Record found`);

    res.status(statusCodes.OK).json(data);
  } catch (error) {
    logger.errorlLog("Unable to get", error);
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER)
      .send({ status: error.status, message: error.message });
  }
});

exports.createFashionUs = catchAsync(async (req, res, next) => {
  try {
    const body = req.body;

    console.log("@@@@@@@@@@@@@@@@@@@@@@@", req.body);

    body.image = `/uploads/images/${req.file.filename}`;

    // if (req.files && req.files.image?.length > 0) {
    //   body.image = req.files.image.map((file) => file.location);
    // }
    logger.infoLog(`Creating with body ${JSON.stringify(body)}`);

    const doc = new FashionUsModel(body);
    console.log(doc);
    await doc.validate().catch((error) => {

      throw new ValidationError(error.message);
    });

    let data = await fashionUsPageService.createFashionUs(doc);
    logger.infoLog(`Created with Id: ${JSON.stringify(data)}`);

    res.status(statusCodes.CREATED).json(data);
  } catch (error) {
    logger.errorlLog("Unable to create", error);
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER)
      .send({ status: error.status, message: error.message });
  }
});

exports.getFashionUs = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    logger.infoLog(`Getting by id${id}`);

    let data = await fashionUsPageService.getFashionUs(id);
    logger.infoLog(`found with id: ${JSON.stringify(id)}`);

    res.status(statusCodes.OK).json(data);
  } catch (error) {
    logger.errorlLog("Unable to get", error);
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER)
      .send({ status: error.status, message: error.message });
  }
});

exports.updateFashionUs = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const { body } = req;

    // if (
    //   req.files &&
    //   req.files &&
    //   req.files.length > 0
    // ) {
    //   console.log("Uploaded files:", req.files.image);

    //   const newImages = req.files.image
    //     .filter((file) => file && file.location) // Check the property that contains the URL or path
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

    let data = await fashionUsPageService.updateFashionUs(id, body);
    res.status(statusCodes.OK).json(data);
  } catch (error) {
    logger.errorlLog("Unable to update", error);
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER)
      .send({ status: error.status, message: error.message });
  }
});

exports.deleteFashionUs = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    logger.infoLog(`Deleting Record with Id: ${JSON.stringify(id)}`);

    let data = await fashionUsPageService.deleteFashionUs(id);
    logger.infoLog(`Deleted with Id: ${JSON.stringify(id)}`);
    res.status(statusCodes.OK).json(data);
  } catch (error) {
    logger.errorlLog("Unable to delete", error);
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER)
      .send({ status: error.status, message: error.message });
  }
});
