const ListCategory = require("../models/listCategoryModel");
const catchAsync = require("../utility/catchAsync");
const { statusCodes } = require("../utility/constant");
const logger = require("../utility/coustomlogger");

exports.getAllCategories = catchAsync(async (req, res, next) => {
  try {
    logger.infoLog("Fetching all categories");
    const categories = await ListCategory.find();
    // console.log("categories", categories);
    res.status(statusCodes.OK).json(categories);
  } catch (error) {
    logger.errorlLog(error);
    res.status(error.statusCode || statusCodes.INTERNAL_SERVER).json({
      status: error.status,
      message: error.message,
    });
  }
});

exports.createCategory = catchAsync(async (req, res, next) => {
  try {
    const body = req.body;
    logger.infoLog(`Creating category with body ${JSON.stringify(body)}`);

    const category = new ListCategory(body);
    // Removed validation here
    const savedCategory = await category.save();
    res.status(statusCodes.CREATED).json(savedCategory);
  } catch (error) {
    logger.errorlLog(error);
    res.status(error.statusCode || statusCodes.INTERNAL_SERVER).json({
      status: error.status,
      message: error.message,
    });
  }
});

exports.getCategoryById = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    logger.infoLog(`Fetching category with id: ${id}`);
    const category = await ListCategory.findById(id);
    if (!category) {
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ message: "Category not found" });
    }
    res.status(statusCodes.OK).json(category);
  } catch (error) {
    logger.errorlLog(error);
    res.status(error.statusCode || statusCodes.INTERNAL_SERVER).json({
      status: error.status,
      message: error.message,
    });
  }
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    logger.infoLog(`Updating category with id: ${id}`);

    const updatedCategory = await ListCategory.findByIdAndUpdate(id, body, {
      new: true,
      // Removed runValidators here
    });
    if (!updatedCategory) {
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ message: "Category not found" });
    }
    res.status(statusCodes.OK).json(updatedCategory);
  } catch (error) {
    logger.errorlLog(error);
    res.status(error.statusCode || statusCodes.INTERNAL_SERVER).json({
      status: error.status,
      message: error.message,
    });
  }
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    logger.infoLog(`Deleting category with id: ${id}`);
    const deletedCategory = await ListCategory.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ message: "Category not found" });
    }
    res
      .status(statusCodes.OK)
      .json({ message: "Category deleted successfully" });
  } catch (error) {
    logger.errorlLog(error);
    res.status(error.statusCode || statusCodes.INTERNAL_SERVER).json({
      status: error.status,
      message: error.message,
    });
  }
});
