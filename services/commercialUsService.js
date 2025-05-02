const { UserError, UserNotFoundError } = require("../utility/error");
const { PageNotFoundError } = require("../utility/commonError");
const { statusCodes } = require("../utility/constant");
const commercialUsModel = require("../models/commercialUsModel");

exports.getAllCommercialUs = async (pagination) => {
  let query = commercialUsModel.find().sort({ createdAt: -1 });

  const page = pagination.currentPage;
  const limit = pagination.docPerPageCount * 1 || 50;
  const skip = page * limit;

  query = query.skip(skip).limit(limit);
  pagination.totalDocCount = await commercialUsModel.countDocuments();

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

exports.createCommercialUs = async (body) => {
  try {
    // let data = await coversUsModel.find();

    // if (data.length > 0) {
    //   throw new UserError("AboutUs already created");
    // }
    let aboutUs = await commercialUsModel.create(body).then();
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

exports.getCommercialUs = async (id) => {
  try {
    let aboutUs = await commercialUsModel.findOne().then();
    if (aboutUs === null) {
      throw new UserNotFoundError("CommercialUs not created");
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

exports.updateCommercialUs = async (id, aboutUsBody) => {
  try {
    const aboutUsToUpdate = new commercialUsModel(aboutUsBody);
    const docInfo = aboutUsToUpdate.toObject();
    delete docInfo._id;
    delete docInfo.id;

    // let check = await commercialUsModel.findById(id);

    // await docInfo.image.push(...check.image);

    let aboutUs = await commercialUsModel
      .findByIdAndUpdate(id, docInfo, { new: true })
      .then();

    if (aboutUs === null) {
      throw new UserNotFoundError("Commercialus not found");
    }

    return {
      status: "success",
      message: "CommercialUs Updated",
      aboutUs: aboutUs,
    };
  } catch (error) {
    throw new UserError(
      error.message,
      error.statusCode || statusCodes.INTERNAL_SERVER
    );
  }
};

exports.deleteCommercialUs = async (id) => {
  try {
    let aboutUs = await commercialUsModel.findByIdAndDelete(id).then();

    if (aboutUs === null) {
      throw new UserNotFoundError("Commercial not found");
    }

    return {
      status: "success",
      message: "CommercialUs deleted",
      aboutUs: aboutUs,
    };
  } catch (error) {
    throw new UserError(
      error.message,
      error.statusCode || statusCodes.INTERNAL_SERVER
    );
  }
};
