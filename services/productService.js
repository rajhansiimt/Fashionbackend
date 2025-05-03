const Product = require("../models/ProductModel"); // Import the Product model

// Fetch all products from the database
const getAllProducts = async () => {
  try {
    return await Product.find(); // Fetch all products
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};

// Create a new product and save it in the database
const createProduct = async (productData) => {
  try {
    const newProduct = new Product(productData);
    await newProduct.save(); // Save the product to the database
    return newProduct;
  } catch (error) {
    throw new Error("Error creating product: " + error.message);
  }
};

// Get a product by its ID
const getProductById = async (id) => {
  try {
    const product = await Product.findById(id); // Find the product by ID
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error("Error fetching product: " + error.message);
  }
};

// Update an existing product by its ID
const updateProduct = async (id, updatedData) => {
  try {
    const product = await Product.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated product
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error("Error updating product: " + error.message);
  }
};

// Delete a product by its ID
const deleteProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id); // Find and delete the product by ID
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error("Error deleting product: " + error.message);
  }
};

// Upload an image for a category
const uploadImageForCategory = async (categoryId, imageUrl) => {
  // Assuming Category model exists and has an imageUrl field
  const Category = require("../models/Category");

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }

    category.imageUrl = imageUrl;
    await category.save();

    return category;
  } catch (error) {
    throw new Error("Error uploading image for category: " + error.message);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadImageForCategory,
};
