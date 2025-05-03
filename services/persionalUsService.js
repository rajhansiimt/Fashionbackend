const persionalUsModel = require("../models/persionalUsModel");
const { PageNotFoundError } = require("../utility/commonError");

exports.getAllPersionalUs = async (pagination) => {
  const page = parseInt(pagination.currentPage) || 0;
  const limit = parseInt(pagination.docPerPageCount) || 10;
  const skip = page * limit;

  const [totalDocCount, docs] = await Promise.all([
    persionalUsModel.countDocuments(),
    persionalUsModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
  ]);

  if (!docs.length) throw new PageNotFoundError("No Personal Us records found");

  return {
    status: true,
    message: "Fetched all Personal Us records",
    data: docs,
    meta: {
      pagination: {
        currentPage: page,
        docPerPageCount: limit,
        totalDocCount,
        totalPageCount: Math.ceil(totalDocCount / limit)
      }
    }
  };
};

exports.getPersionalUs = async (id) => {
  const data = await persionalUsModel.findById(id);
  if (!data) throw new PageNotFoundError("Personal Us record not found");
  return { status: true, message: "Fetched Personal Us record", data };
};

exports.createPersionalUs = async (doc) => {
  const data = await doc.save();
  return { status: true, message: "Created Personal Us record", data };
};

exports.updatePersionalUs = async (id, body) => {
  const data = await persionalUsModel.findByIdAndUpdate(id, body, { 
    new: true,
    runValidators: true
  });
  if (!data) throw new PageNotFoundError("Personal Us record not found for update");
  return { status: true, message: "Updated Personal Us record", data };
};

exports.deletePersionalUs = async (id) => {
  const data = await persionalUsModel.findByIdAndDelete(id);
  if (!data) throw new PageNotFoundError("Personal Us record not found for delete");
  return { status: true, message: "Deleted Personal Us record", data };
};