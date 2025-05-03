const { UserError, UserNotFoundError } = require("../utility/error");
const { PageNotFoundError } = require("../utility/commonError");
const { statusCodes } = require("../utility/constant");
const contactUsModel = require("../models/contactFormModel");

exports.getAllContactUs = async (pagination) => {
  let query = contactUsModel
    .find()
    .populate("createdBy")
    .sort({ createdAt: -1 });

  const page = pagination.currentPage;
  const limit = pagination.docPerPageCount * 1 || 50;
  const skip = page * limit;

  query = query.skip(skip).limit(limit);
  pagination.totalDocCount = await contactUsModel.countDocuments();

  if (pagination.totalDocCount === 0) {
    throw new PageNotFoundError("No record found");
  }

  pagination.totalPageCount = Math.ceil(pagination.totalDocCount / limit);

  if (page >= pagination.totalPageCount) {
    throw new PageNotFoundError("This page does not exist");
  }

  let contactUs;
  contactUs = await query;
  console.log("record found");

  return {
    status: true,
    message: "Got all contactUs",
    contactUs: contactUs,
    meta: {
      pagination: pagination,
      field: "createdAt",
      rowIds: "",
    },
  };
};

exports.createContactUs = async (body) => {
  try {
    // let data = await contactUsModel.find();

    // if (data.length > 0) {
    //   throw new UserError("contactUs already created");
    // }
    let contactUs = await contactUsModel.create(body).then();
    return {
      status: true,
      message: `message created`,
      contactUs: contactUs,
    };
  } catch (error) {
    throw new UserError(
      error.message,
      error.statusCode || statusCodes.INTERNAL_SERVER
    );
  }
};

exports.getContactUs = async (id) => {
  try {
    let contactUs = await contactUsModel.findOne().then();
    if (contactUs === null) {
      throw new UserNotFoundError("contactUs not created");
    }

    return {
      status: "success",
      message: `Got User`,
      contactUs: contactUs,
    };
  } catch (error) {
    throw new UserError(
      error.message,
      error.statusCode || statusCodes.INTERNAL_SERVER
    );
  }
};

exports.updateContactUs = async (id, contactUsBody) => {
  try {
    const contactUsToUpdate = new contactUsModel(contactUsBody);
    const docInfo = contactUsToUpdate.toObject();
    delete docInfo._id;
    delete docInfo.id;

    let check = await contactUsModel.findById(id);

    await docInfo.email.push(...check.email);
    await docInfo.phoneNumber.push(...check.phoneNumber);
    await docInfo.address.push(...check.address);

    let contactUs = await contactUsModel
      .findByIdAndUpdate(id, docInfo, { new: true })
      .then();

    if (contactUs === null) {
      throw new UserNotFoundError("contactUs not found");
    }

    return {
      status: "success",
      message: "contactUs Updated",
      contactUs: contactUs,
    };
  } catch (error) {
    throw new UserError(
      error.message,
      error.statusCode || statusCodes.INTERNAL_SERVER
    );
  }
};

exports.deleteContactUs = async (id) => {
  try {
    let contactUs = await contactUsModel.findByIdAndDelete(id).then();

    if (contactUs === null) {
      throw new UserNotFoundError("contactUs not found");
    }

    return {
      status: "success",
      message: "contactUs deleted",
      contactUs: contactUs,
    };
  } catch (error) {
    throw new UserError(
      error.message,
      error.statusCode || statusCodes.INTERNAL_SERVER
    );
  }
};
