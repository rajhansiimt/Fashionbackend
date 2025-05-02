const { UserError, UserNotFoundError } = require("../utility/error");
const { PageNotFoundError } = require("../utility/commonError");
const { statusCodes } = require("../utility/constant");
const HomeUsModel = require("../models/homeUsModel");

exports.getAllHomeUs = async (pagination) => {
  let query = HomeUsModel.find().sort({ createdAt: -1 });

  const page = pagination.currentPage;
  const limit = pagination.docPerPageCount || 50;
  const skip = page * limit;

  query = query.skip(skip).limit(limit);
  pagination.totalDocCount = await HomeUsModel.countDocuments();

  if (pagination.totalDocCount === 0) {
    throw new PageNotFoundError("No record found");
  }

  pagination.totalPageCount = Math.ceil(pagination.totalDocCount / limit);

  if (page >= pagination.totalPageCount) {
    throw new PageNotFoundError("This page does not exist");
  }

  const aboutUs = await query;

  return {
    status: true,
    message: "Got all About Us records",
    aboutUs,
    meta: {
      pagination,
      field: "createdAt",
      rowIds: "",
    },
  };
};

exports.createHomeUs = async (body) => {
  try {
    const aboutUs = await HomeUsModel.create(body);
    return {
      status: true,
      message: `About Us record created`,
      aboutUs,
    };
  } catch (error) {
    throw new UserError(error.message, error.statusCode || statusCodes.INTERNAL_SERVER);
  }
};

exports.getHomeUs = async (id) => {
  try {
    const aboutUs = await HomeUsModel.findById(id);

    if (!aboutUs) {
      throw new UserNotFoundError("About Us record not found");
    }

    return {
      status: "success",
      message: `Got About Us record`,
      aboutUs,
    };
  } catch (error) {
    throw new UserError(error.message, error.statusCode || statusCodes.INTERNAL_SERVER);
  }
};

exports.updateHomeUs = async (id, aboutUsBody) => {
  try {
    const existingRecord = await HomeUsModel.findById(id);
    if (!existingRecord) {
      throw new UserNotFoundError("About Us record not found");
    }

    if (aboutUsBody.newImages && aboutUsBody.newImages.length > 0) {
      existingRecord.image.push(...aboutUsBody.newImages);
    }

    existingRecord.title = aboutUsBody.title || existingRecord.title;
    existingRecord.description = aboutUsBody.description || existingRecord.description;

    const updated = await existingRecord.save();

    return {
      status: true,
      message: "Updated About Us record",
      aboutUs: updated,
    };
  } catch (error) {
    throw new UserError(error.message, error.statusCode || statusCodes.INTERNAL_SERVER);
  }
};

exports.deleteHomeUs = async (id) => {
  try {
    const deleted = await HomeUsModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new UserNotFoundError("About Us record not found");
    }

    return {
      status: true,
      message: "Deleted About Us record",
    };
  } catch (error) {
    throw new UserError(error.message, error.statusCode || statusCodes.INTERNAL_SERVER);
  }
};
