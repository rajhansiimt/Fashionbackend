const express = require("express");
const router = express.Router();
const listCategoryController = require("../controller/listCategoryController");

/* GLOBAL MIDDLEWARE USAGE */
router.use((req, res, next) => {
  console.log("API: List Category Routes");
  next();
});

/* SWAGGER SCHEMA */
/**
 * @swagger
 * components:
 *  schemas:
 *      ListCategory:
 *          type: object
 *          properties:
 *              categoryName:
 *                  type: string
 *                  description: Name of the category
 *                  example: Electronics
 *              detail:
 *                  type: string
 *                  description: Detailed description of the category
 *                  example: All kinds of electronic items
 */

/**
 * @swagger
 * /project/api/v1/list-category:
 *  get:
 *     summary: Get All Categories API
 *     description: Retrieves all categories with pagination support
 *     tags: [List Category]
 *     parameters:
 *       - name: pagination
 *         in: query
 *         required: false
 *         description: Pagination parameters
 *         schema:
 *           type: string
 *           example: {"docPerPageCount":5,"currentPage":0,"totalPageCount":0,"totalDocCount":0}
 *     responses:
 *         200:
 *             description: A JSON array of all categories
 *             content:
 *               application/json:
 *                 schema:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ListCategory'
 *  post:
 *    summary: Create Category API
 *    description: Create a new category record
 *    tags: [List Category]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ListCategory'
 *    responses:
 *          201:
 *              description: Category created successfully
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/ListCategory'
 */
router
  .route("/")
  .get(listCategoryController.getAllCategories)
  .post(listCategoryController.createCategory);

/**
 * @swagger
 * /project/api/v1/list-category/{categoryId}:
 *  get:
 *     summary: Get Category by ID API
 *     description: Retrieves a single category by ID
 *     tags: [List Category]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: The ID of the category to retrieve
 *         schema:
 *           type: string
 *           example: 65abc123def456ghi789
 *     responses:
 *         200:
 *             description: Successfully retrieved category
 *             content:
 *               application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/ListCategory'
 *  delete:
 *     summary: Delete Category API
 *     description: Deletes a category by ID
 *     tags: [List Category]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: The ID of the category to delete
 *         schema:
 *           type: string
 *           example: 65abc123def456ghi789
 *     responses:
 *         202:
 *             description: Successfully deleted category
 *  patch:
 *    summary: Update Category API
 *    description: Updates an existing category
 *    tags: [List Category]
 *    parameters:
 *      - name: categoryId
 *        in: path
 *        required: true
 *        description: The ID of the category to update
 *        schema:
 *          type: string
 *          example: 65abc123def456ghi789
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ListCategory'
 *    responses:
 *         200:
 *             description: Successfully updated category
 */
router
  .route("/:id")
  .get(listCategoryController.getCategoryById)
  .delete(listCategoryController.deleteCategory)
  .patch(listCategoryController.updateCategory);

module.exports = router;
