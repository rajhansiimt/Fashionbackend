const express = require("express");

/* MIDDLEWARE */
const router = express.Router();
const homeUsController = require("../controller/homeUsController");
const uploadService = require("../services/uploadService");
const upload = uploadService.upload;

/* GLOBAL MIDDLEWARE USAGE */
router.use((req, res, next) => {
  console.log("API: Home Us routes");
  next();
});

/* SWAGGER SCHEMA */
/**
 * @swagger
 * components:
 *  schemas:
 *      HomeUsSchema:
 *          type: object
 *          properties:
 *              image:
 *                type: string
 *                format: binary
 */

/* ROUTES */

/**
 * @swagger
 * /project/api/v1/home:
 *  get:
 *     summary: Get All Home Entries
 *     tags: [Home Us Registry]
 *     responses:
 *         200:
 *             description: A list of home entries
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: boolean
 *                     message:
 *                       type: string
 *                     aboutUs:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/HomeUsSchema'
 *                     meta:
 *                       type: object
 *
 *  post:
 *     summary: Create a Home Entry
 *     tags: [Home Us Registry]
 *     requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 image:
 *                   type: string
 *                   format: binary
 *     responses:
 *         201:
 *             description: Created
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: boolean
 *                     message:
 *                       type: string
 *                     aboutUs:
 *                       $ref: '#/components/schemas/HomeUsSchema'
 */
router
  .route("/")
  .get(homeUsController.getAllHomeUs)
  .post(upload.array("image",10),  // corrected to single image upload
    homeUsController.createHomeUs
  );

/**
 * @swagger
 * /project/api/v1/home/{id}:
 *  get:
 *     summary: Get a Home Entry by ID
 *     tags: [Home Us Registry]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Home Entry
 *     responses:
 *         200:
 *             description: Success
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: boolean
 *                     message:
 *                       type: string
 *                     aboutUs:
 *                       $ref: '#/components/schemas/HomeUsSchema'
 *
 *  delete:
 *     summary: Delete a Home Entry
 *     tags: [Home Us Registry]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Home Entry
 *     responses:
 *         200:
 *             description: Successfully deleted
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: boolean
 *                     message:
 *                       type: string
 *                     aboutUs:
 *                       $ref: '#/components/schemas/HomeUsSchema'
 *
 *  patch:
 *     summary: Update a Home Entry
 *     tags: [Home Us Registry]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Home Entry
 *     requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 image:
 *                   type: string
 *                   format: binary
 *     responses:
 *         200:
 *             description: Successfully updated
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: boolean
 *                     message:
 *                       type: string
 *                     aboutUs:
 *                       $ref: '#/components/schemas/HomeUsSchema'
 */
router
  .route("/:id")
  .get(homeUsController.getHomeUs)
  .delete(homeUsController.deleteHomeUs)
  .patch(upload.array("image",10),  
    homeUsController.updateHomeUs
  );

module.exports = router;
