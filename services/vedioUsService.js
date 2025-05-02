const { UserError, UserNotFoundError } = require("../utility/error");
const { PageNotFoundError } = require("../utility/commonError");
const { statusCodes } = require("../utility/constant");
const vedioUsModel = require("../models/vedioUsModel");

exports.getAllVedioUs = async (pagination) => {
  let query = vedioUsModel.find().sort({ createdAt: -1 });

  const page = pagination.currentPage || 0;
  const limit = pagination.docPerPageCount || 50;
  const skip = page * limit;

  query = query.skip(skip).limit(limit);
  pagination.totalDocCount = await vedioUsModel.countDocuments();

  if (pagination.totalDocCount === 0) {
    throw new PageNotFoundError("No record found");
  }

  pagination.totalPageCount = Math.ceil(pagination.totalDocCount / limit);

  if (page >= pagination.totalPageCount) {
    throw new PageNotFoundError("This page does not exist");
  }

  const records = await query;

  return {
    status: true,
    message: "Got all records",
    vedioUs: records,
    meta: {
      pagination,
      field: "createdAt",
      rowIds: "",
    },
  };
};

exports.createVedioUs = async (body) => {
  try {
    const record = await vedioUsModel.create(body);
    return {
      status: true,
      message: "Created VedioUs entry",
      vedioUs: record,
    };
  } catch (error) {
    throw new UserError(error.message, error.statusCode || statusCodes.INTERNAL_SERVER);
  }
};

exports.getVedioUs = async (id) => {
  const record = await vedioUsModel.findById(id);
  if (!record) throw new UserNotFoundError("VedioUs record not found");

  return {
    status: "success",
    message: "Fetched record",
    vedioUs: record,
  };
};

exports.updateVedioUs = async (id, updateBody) => {
  const record = await vedioUsModel.findByIdAndUpdate(id, updateBody, { new: true });
  if (!record) throw new UserNotFoundError("VedioUs record not found");

  return {
    status: "success",
    message: "Updated successfully",
    vedioUs: record,
  };
};

exports.deleteVedioUs = async (id) => {
  const record = await vedioUsModel.findByIdAndDelete(id);
  if (!record) throw new UserNotFoundError("VedioUs record not found");

  return {
    status: "success",
    message: "Deleted successfully",
    vedioUs: record,
  };
};
