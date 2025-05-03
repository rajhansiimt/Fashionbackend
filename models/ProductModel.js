const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false, // Optional field
    },
    listCategoryId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ListCategory", // Reference to ListCategory collection
        required: true, // Ensure a category ID is provided
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
