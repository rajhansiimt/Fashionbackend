const vedioUsService = require("../services/vedioUsService");
const { statusCodes } = require("../utility/constant");
const { ValidationError } = require("../utility/commonError");
const logger = require("../utility/coustomlogger");
const catchAsync = require("../utility/catchAsync");
const VedioUsModel = require("../models/vedioUsModel");

exports.getAllVedioUs = catchAsync(async (req, res) => {
  let pagination = req.query.pagination ? JSON.parse(req.query.pagination) : {
    currentPage: 0,
    docPerPageCount: 0,
    totalDocCount: 0,
    totalPageCount: 0,
  };

  let data = await vedioUsService.getAllVedioUs(pagination);
  res.status(statusCodes.OK).json(data);
});

exports.createVedioUs = catchAsync(async (req, res) => {
  const body = req.body;

  const videoFile = req.files?.video?.[0];

  if (videoFile) {
    body.video = `/uploads/videos/${videoFile.filename}`;
  }

  const doc = new VedioUsModel(body);
  await doc.validate().catch((err) => {
    throw new ValidationError(err.message);
  });

  const data = await vedioUsService.createVedioUs(doc);
  res.status(statusCodes.CREATED).json(data);
});

exports.getVedioUs = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = await vedioUsService.getVedioUs(id);
  res.status(statusCodes.OK).json(data);
});

exports.updateVedioUs = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (req.file) {
    body.video = `/uploads/video/${req.file.filename}`;
  }

  const data = await vedioUsService.updateVedioUs(id, body);
  res.status(statusCodes.OK).json(data);
});

exports.deleteVedioUs = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = await vedioUsService.deleteVedioUs(id);
  res.status(statusCodes.OK).json(data);
});
