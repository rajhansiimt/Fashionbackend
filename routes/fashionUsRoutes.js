const express = require("express");

/* MIDDLEWARE */
const router = express.Router();
const fashionUsController = require("../controller/fashionUsController"); // Make sure this controller exists
// const
const uploadService = require("../services/uploadService");
const upload = uploadService.upload;

/* GLOBAL MIDDLEWARE USAGE */
router.use((req, res, next) => {
  console.log("api: Beauty US routes");
  next();
});

/* SWAGGER SCHEMA */
/**
 * @swagger
 * components:
 *  schemas:
 *      fashionUsSchema:
 *          type: object
 *          properties:
 *              image:
 *                type: string
 *                format: binary
 */

/* ROUTES */
/**
 * @swagger
 * /project/api/v1/fashion:
 *  get:
 *     summary: Get All Fashion Entries
 *     description: Retrieve all fashion records.
 *     tags: [Fashion Us Registry]
 *     responses:
 *         200:
 *             description: A list of fashion entries
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: success   
 *                     message:
 *                       type: string
 *                       example: Got All Fashion Entries
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/fashionUsSchema'
 *
 *  post:
 *      summary: Create a Fashion Entry
 *      description: Add a new fashion entry
 *      tags: [Fashion Us Registry]
 *      requestBody:
 *          required: true
 *          content:
 *             multipart/form-data:
 *              schema:
 *                $ref: '#/components/schemas/fashionUsSchema'
 *      responses:
 *          201:
 *              description: Created
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      status:
 *                        type: string
 *                        example: success
 *                      message:
 *                        type: string
 *                        example: Created Fashion Entry
 *                      data:
 *                        $ref: '#/components/schemas/fashionUsSchema'
 */
router
  .route("/")
  .get(fashionUsController.getAllFashionUs)
  .post(upload.single('image'),fashionUsController.createFashionUs);

/**
 * @swagger
 * /project/api/v1/fashion/{id}:
 *  get:
 *     summary: Get a Fashion Entry
 *     tags: [Fashion Us Registry]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the fashion entry
 *         schema:
 *           type: string
 *     responses:
 *         200:
 *             description: Success
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: success
 *                     message:
 *                       type: string
 *                       example: Got Fashion Entry
 *                     data:
 *                       $ref: '#/components/schemas/fashionUsSchema'
 *  delete:
 *     summary: Delete a Fashion Entry
 *     tags: [Fashion Us Registry]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the fashion entry to delete
 *         schema:
 *           type: string
 *     responses:
 *         202:
 *             description: Deleted
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: success
 *                     message:
 *                       type: string
 *                       example: Deleted Fashion Entry
 *  patch:
 *     summary: Update a Fashion Entry
 *     tags: [Fashion Us Registry]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the fashion entry to update
 *         schema:
 *           type: string
 *     requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/fashionUsSchema'
 *     responses:
 *         200:
 *             description: Updated
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: success
 *                     message:
 *                       type: string
 *                       example: Updated Fashion Entry
 *                     data:
 *                       $ref: '#/components/schemas/fashionUsSchema'
 */
router
  .route("/:id")
  .get(fashionUsController.getFashionUs)
  .delete(fashionUsController.deleteFashionUs)
  .patch(upload.single('image'),fashionUsController.updateFashionUs);

module.exports = router;
