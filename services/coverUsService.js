const { UserError, UserNotFoundError } = require("../utility/error");
const { PageNotFoundError } = require("../utility/commonError");
const { statusCodes } = require("../utility/constant");
const coversUsModel = require("../models/coversUsModel");

exports.getAllCoverUs = async (pagination) => {
  let query = coversUsModel.find().sort({ createdAt: -1 });

  const page = pagination.currentPage;
  const limit = pagination.docPerPageCount * 1 || 50;
  const skip = page * limit;

  query = query.skip(skip).limit(limit);
  pagination.totalDocCount = await coversUsModel.countDocuments();

  if (pagination.totalDocCount === 0) {
    throw new PageNotFoundError("No record found");
  }

  pagination.totalPageCount = Math.ceil(pagination.totalDocCount / limit);

  if (page >= pagination.totalPageCount) {
    throw new PageNotFoundError("This page does not exist");
  }

  let aboutUs;
  aboutUs = await query;   
  console.log("record found");

  return {
    status: true,
    message: "Got all aboutUs",
    aboutUs: aboutUs,
    meta: {
      pagination: pagination,
      field: "createdAt",
      rowIds: "",
    },
  };
};

exports.createCoverUs = async (body) => {
  try {
    // let data = await coversUsModel.find();

    // if (data.length > 0) {
    //   throw new UserError("AboutUs already created");
    // }
    let aboutUs = await coversUsModel.create(body).then();
    return {
      status: true,
      message: `message created`,
      aboutUs: aboutUs,
    };
  } catch (error) {
    throw new UserError(
      error.message,
      error.statusCode || statusCodes.INTERNAL_SERVER
    );
  }
};

exports.getCoverUs = async (id) => {
  try {
    let aboutUs = await coversUsModel.findOne().then();
    if (aboutUs === null) {
      throw new UserNotFoundError("AboutUs not created");
    }

    return {
      status: "success",
      message: `Got User`,
      aboutUs: aboutUs,
    };
  } catch (error) {
    throw new UserError(
      error.message,
      error.statusCode || statusCodes.INTERNAL_SERVER
    );
  }
};

exports.updateCoverUs = async (id, aboutUsBody) => {
  try {
    const aboutUsToUpdate = new coversUsModel(aboutUsBody);
    const docInfo = aboutUsToUpdate.toObject();
    delete docInfo._id;
    delete docInfo.id;

    // let check = await coversUsModel.findById(id);

    // await docInfo.image.push(...check.image);

    let aboutUs = await coversUsModel
      .findByIdAndUpdate(id, docInfo, { new: true })
      .then();

    if (aboutUs === null) {
      throw new UserNotFoundError("Aboutus not found");
    }

    return {
      status: "success",
      message: "AboutUs Updated",
      aboutUs: aboutUs,
    };
  } catch (error) {
    throw new UserError(
      error.message,
      error.statusCode || statusCodes.INTERNAL_SERVER
    );
  }
};

exports.deleteCoversUs = async (id) => {
  try {
    let aboutUs = await coversUsModel.findByIdAndDelete(id).then();

    if (aboutUs === null) {
      throw new UserNotFoundError("Cover not found");
    }

    return {
      status: "success",
      message: "CoverUs deleted",
      aboutUs: aboutUs,
    };
  } catch (error) {
    throw new UserError(
      error.message,
      error.statusCode || statusCodes.INTERNAL_SERVER
    );
  }
};
