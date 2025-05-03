const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const listCategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
    detail: {
      type: String,
      required: [true, "Detail is required"],
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the user model
      required: false, // Optional, as it's not always required
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

// Adding uniqueValidator plugin to handle unique constraint errors
listCategorySchema.plugin(uniqueValidator);

// Create and export the ListCategory model
const ListCategory = mongoose.model("ListCategory", listCategorySchema);

module.exports = ListCategory;
