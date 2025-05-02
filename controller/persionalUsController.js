const persioanlUsPageService = require("../services/persionalUsService");
const { statusCodes } = require("../utility/constant");
const { ValidationError } = require("../utility/commonError");
const persionalUsModel = require("../models/persionalUsModel");
const logger = require("../utility/coustomlogger");
const catchAsync = require("../utility/catchAsync");

exports.getAllPersionalUs = catchAsync(async (req, res, next) => {
    try {
        logger.infoLog(`Getting All Covers Us Record`);
        let pagination = {};
        if (req.query.pagination) {
            pagination = JSON.parse(req.query.pagination);
        } else {
            pagination.currentPage = 0;
            pagination.docPerPageCount = 0;
            pagination.totalDocCount = 0;
            pagination.totalPageCount = 0;
        }

        let data = await persioanlUsPageService.getAllPersionalUs(pagination);

        console.log("data mil gaya kya:", data); // DEBUG karlo
        logger.infoLog(`${(data || []).length} Record found`);

        res.status(statusCodes.OK).json(data);
    } catch (error) {
        logger.errorlLog("Unable to get", error);
        res
            .status(error.statusCode || statusCodes.INTERNAL_SERVER)
            .send({ status: error.status, message: error.message });
    }
});


exports.createPersionalUs = catchAsync(async (req, res, next) => {
    try {
      const body = req.body;
        console.log(req.files);
      // AWS S3 se aayi images
      if (req.files && req.files.mainImage && req.files.subImage) {
        body.mainImage = `/uploads/images/${req.files.mainImage[0].filename}`;
        body.subImage = `/uploads/images/${req.files.subImage[0].filename}`;
      } else {
        throw new ValidationError("Main Image and Sub Image both are required");
      }
  
      logger.infoLog(`Creating with body ${JSON.stringify(body)}`);
  
      const doc = new persionalUsModel(body);
  
      await doc.validate(); // Validate schema
  
      const data = await persioanlUsPageService.createPersionalUs(doc); // Save karo DB me
  
      logger.infoLog(`Created with Id: ${JSON.stringify(data.id)}`);
  
      res.status(statusCodes.CREATED).json(data);
    } catch (error) {
      logger.errorlLog("Unable to create", error);
      res
        .status(error.statusCode || statusCodes.INTERNAL_SERVER)
        .send({ status: error.status, message: error.message });
    }
  });  


exports.getPersionalUs = catchAsync(async (req, res, next) => {
    try {
        const id = req.params.id;
        logger.infoLog(`Getting by id${id}`);

        let data = await persioanlUsPageService.getPersionalUs(id);
        logger.infoLog(`found with id: ${JSON.stringify(id)}`);

        res.status(statusCodes.OK).json(data);
    } catch (error) {
        logger.errorlLog("Unable to get", error);
        res
            .status(error.statusCode || statusCodes.INTERNAL_SERVER)
            .send({ status: error.status, message: error.message });
    }
});

exports.updatePersionalUs = catchAsync(async (req, res, next) => {
    try {
        const id = req.params.id;
        const { body } = req;

        if (
            req.files &&
            req.files.image &&
            req.files.image.length > 0
        ) {
            console.log("Uploaded files:", req.files.image);

            const newImages = req.files.image
                .filter((file) => file && file.location) // Check the property that contains the URL or path
                .map((file) => file.location);

            console.log("New Images:", newImages);

            body.image = Array.isArray(body.image)
                ? [...body.propertyImage, ...newImages]
                : newImages;

            console.log("Updated propertyImage in Body:", body.bedroomAmenities);
        }

        logger.infoLog(`Updating Record with id: ${JSON.stringify(id)}`);
        logger.infoLog(`FrontEnd Body: ${JSON.stringify(body)}`);

        let data = await persioanlUsPageService.updatePersionalUs(id, body);
        res.status(statusCodes.OK).json(data);
    } catch (error) {
        logger.errorlLog("Unable to update", error);
        res
            .status(error.statusCode || statusCodes.INTERNAL_SERVER)
            .send({ status: error.status, message: error.message });
    }
});

exports.deletePersionalUs = catchAsync(async (req, res, next) => {
    try {
        const id = req.params.id;
        logger.infoLog(`Deleting Record with Id: ${JSON.stringify(id)}`);

        let data = await persioanlUsPageService.deletePersionalUs(id);
        logger.infoLog(`Deleted with Id: ${JSON.stringify(id)}`);
        res.status(statusCodes.OK).json(data);
    } catch (error) {
        logger.errorlLog("Unable to delete", error);
        res
            .status(error.statusCode || statusCodes.INTERNAL_SERVER)
            .send({ status: error.status, message: error.message });
    }
});
