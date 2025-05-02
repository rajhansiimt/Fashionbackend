const express = require("express");
const router = express.Router();
const productController = require("../controller/productsController");
const { uploadFile } = require("../utility/uploadAWS");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 */

/**
 * @swagger
 * /project/api/v1/products:
 *   post:
 *     summary: Create a new product with image upload
 *     tags: [Products]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               listCategoryId:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of category IDs
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/",
  uploadFile("image"), // File upload middleware
  (req, res, next) => {
    // Log the request body before validation
    console.log("Request Body before validation:", req.body);

    // Log the uploaded file (should show the image file)
    console.log("Uploaded File:", req.file);

    // Proceed to the next middleware (your controller function)
    next();
  },
  productController.createProduct
);

/**
 * @swagger
 * /project/api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products with images
 */
router.get("/", productController.getAllProducts);

/**
 * @swagger
 * /project/api/v1/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product data
 *       404:
 *         description: Product not found
 */
router.get("/:id", productController.getProductById);

/**
 * @swagger
 * /project/api/v1/products/{id}:
 *   patch:
 *     summary: Update a product
 *     tags: [Products]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               listCategoryId:
 *                 type: array
 *                 items:
 *                   type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.patch(
  "/:id",
  uploadFile("image"), // File upload middleware
  productController.updateProduct
);

/**
 * @swagger
 * /project/api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/:id", productController.deleteProduct);

/**
 * @swagger
 * /project/api/v1/products/uploadImage/{categoryId}:
 *   post:
 *     summary: Upload an image for a specific category ID
 *     tags: [Products]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID to associate with the image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Image uploaded successfully for the category
 *       400:
 *         description: Invalid input
 */
router.post(
  "/uploadImage/:categoryId",
  uploadFile("image"), // Handling single file upload
  productController.uploadImageForCategory
);

module.exports = router;
