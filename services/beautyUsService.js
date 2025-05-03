const { UserError, UserNotFoundError } = require("../utility/error");
const { PageNotFoundError } = require("../utility/commonError");
const { statusCodes } = require("../utility/constant");
const beautyUsModel = require("../models/beautyUsModel");

exports.getAllBeautyUs = async (pagination) => {
  let query = beautyUsModel.find().sort({ createdAt: -1 });

  const page = pagination.currentPage;
  const limit = pagination.docPerPageCount * 1 || 50;
  const skip = page * limit;

  query = query.skip(skip).limit(limit);
  pagination.totalDocCount = await beautyUsModel.countDocuments();

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

exports.createBeautyUs = async (body) => {
  try {
    // let data = await beautyUsModel.find();

    // if (data.length > 0) {
    //   throw new UserError("AboutUs already created");
    // }
    let aboutUs = await beautyUsModel.create(body).then();
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

exports.getBeautyUs = async (id) => {
  try {
    let aboutUs = await beautyUsModel.findOne().then();
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

exports.updateBeautyUs = async (id, aboutUsBody) => {
  try {
    const aboutUsToUpdate = new beautyUsModel(aboutUsBody);
    const docInfo = aboutUsToUpdate.toObject();
    delete docInfo._id;
    delete docInfo.id;

    // let check = await beautyUsModel.findById(id);

    // await docInfo.image.push(...check.image);

    let aboutUs = await beautyUsModel
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

exports.deleteBeautyUs = async (id) => {
  try {
    let aboutUs = await beautyUsModel.findByIdAndDelete(id).then();

    if (aboutUs === null) {
      throw new UserNotFoundError("AboutUs not found");
    }

    return {
      status: "success",
      message: "AboutUs deleted",
      aboutUs: aboutUs,
    };
  } catch (error) {
    throw new UserError(
      error.message,
      error.statusCode || statusCodes.INTERNAL_SERVER
    );
  }
};
