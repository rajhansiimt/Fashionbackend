const contactUsService = require("../services/contactFormService");
const { statusCodes } = require("../utility/constant");
const { ValidationError } = require("../utility/commonError");
const contactUsModel = require("../models/contactFormModel");
const logger = require("../utility/coustomlogger");
const catchAsync = require("../utility/catchAsync");

// ✅ Get all Contact Us records with optional pagination
exports.getAllContactUs = catchAsync(async (req, res) => {
  logger.infoLog("📥 Fetching all Contact Us records...");

  let pagination = {
    currentPage: 0,
    docPerPageCount: 0,
    totalDocCount: 0,
    totalPageCount: 0,
  };

  if (req.query.pagination) {
    try {
      pagination = JSON.parse(req.query.pagination);
    } catch (error) {
      throw new ValidationError("Invalid pagination format");
    }
  }

  const data = await contactUsService.getAllContactUs(pagination);
  logger.infoLog(`✅ Retrieved ${data?.contactUs?.length || 0} records`);

  res.status(statusCodes.OK).json({
    status: true,
    message: "Contact Us list retrieved successfully",
    data,
  });
});

// ✅ Create a new Contact Us record
exports.createContactUs = catchAsync(async (req, res) => {
  const body = req.body;
  logger.infoLog("📝 Creating new Contact Us entry");

  const requiredFields = [
    "FirstName",
    "LastName",
    "phoneNumber",
    "email",
    "address",
    "Message",
  ];

  for (const field of requiredFields) {
    if (!body[field] || body[field].trim() === "") {
      throw new ValidationError(`${field} is required`);
    }
  }

  const newContact = new contactUsModel(body);

  await newContact.validate().catch((error) => {
    throw new ValidationError(error.message);
  });

  const data = await contactUsService.createContactUs(newContact);
  logger.infoLog(`✅ Contact created with ID: ${data._id}`);

  res.status(statusCodes.CREATED).json({
    status: true,
    message: "Contact form submitted successfully",
    data,
  });
});

// ✅ Get a Contact Us record by ID
exports.getContactUs = catchAsync(async (req, res) => {
  const { id } = req.params;
  logger.infoLog(`📄 Fetching Contact Us record with ID: ${id}`);

  const data = await contactUsService.getContactUs(id);

  if (!data) {
    throw new ValidationError("Contact record not found");
  }

  res.status(statusCodes.OK).json({
    status: true,
    message: "Contact record retrieved successfully",
    data,
  });
});

// ✅ Update a Contact Us record by ID
exports.updateContactUs = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  logger.infoLog(`🔧 Updating Contact Us record with ID: ${id}`);
  logger.infoLog(`Update fields: ${JSON.stringify(updateFields)}`);

  const data = await contactUsService.updateContactUs(id, updateFields);

  res.status(statusCodes.OK).json({
    status: true,
    message: "Contact record updated successfully",
    data,
  });
});

// ✅ Delete a Contact Us record by ID
exports.deleteContactUs = catchAsync(async (req, res) => {
  const { id } = req.params;
  logger.infoLog(`🗑️ Deleting Contact Us record with ID: ${id}`);

  const data = await contactUsService.deleteContactUs(id);

  res.status(statusCodes.OK).json({
    status: true,
    message: "Contact record deleted successfully",
    data,
  });
});
