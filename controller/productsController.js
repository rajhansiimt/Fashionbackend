const productService = require("../services/productService");
const ListCategory = require("../models/listCategoryModel");
// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { title, description, listCategoryId } = req.body;
    const imageUrl = req.file ? req.file.location : null;

    const newProduct = await productService.createProduct({
      title,
      description,
      imageUrl,
      listCategoryId,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { title, description, listCategoryId } = req.body;
    const imageUrl = req.file ? req.file.location : null;

    const updatedProduct = await productService.updateProduct(req.params.id, {
      title,
      description,
      imageUrl,
      listCategoryId,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Upload image for category
exports.uploadImageForCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const imageUrl = req.file ? req.file.location : null;

    // Log the received data to help with debugging
    console.log("Category ID:", categoryId);
    console.log("Uploaded File URL:", imageUrl);

    // Check if file is provided
    if (!imageUrl) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    // Check if the category exists
    const category = await ListCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update the category with the uploaded image URL
    category.imageUrl = imageUrl;
    await category.save();

    // Success response
    res.status(201).json({
      message: "Image uploaded successfully for category",
      category, // Return the updated category data
      imageUrl, // Include the image URL in the response
    });
  } catch (error) {
    // Log the actual error for further debugging
    console.error("Error uploading image:", error);
    res.status(500).json({
      message: "Server error while uploading image",
      error: error.message,
    });
  }
};
