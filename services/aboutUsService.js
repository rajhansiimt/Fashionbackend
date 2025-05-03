const { UserError, UserNotFoundError } = require("../utility/error");
const { PageNotFoundError } = require("../utility/commonError");
const { statusCodes } = require("../utility/constant");
const AboutUsModel = require("../models/aboutUsModel");

exports.getAllAboutUs = async (pagination) => {
  let query = AboutUsModel.find().sort({ createdAt: -1 });

  const page = pagination.currentPage;
  const limit = pagination.docPerPageCount || 50;
  const skip = page * limit;

  query = query.skip(skip).limit(limit);
  pagination.totalDocCount = await AboutUsModel.countDocuments();

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

exports.createAboutUs = async (body) => {
  try {
    const aboutUs = await AboutUsModel.create(body);
    return {
      status: true,
      message: `About Us record created`,
      aboutUs,
    };
  } catch (error) {
    throw new UserError(error.message, error.statusCode || statusCodes.INTERNAL_SERVER);
  }
};

exports.getAboutUs = async (id) => {
  try {
    const aboutUs = await AboutUsModel.findById(id);

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

exports.updateAboutUs = async (id, aboutUsBody) => {
  try {
    const existingRecord = await AboutUsModel.findById(id);
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

exports.deleteAboutUs = async (id) => {
  try {
    const deleted = await AboutUsModel.findByIdAndDelete(id);
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
