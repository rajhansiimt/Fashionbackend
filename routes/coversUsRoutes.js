const express = require("express");

/* MIDDLEWARE */
const router = express.Router();
const CoverUsController = require("../controller/coverUsController"); 
// const
const uploadService = require("../services/uploadService");
const upload = uploadService.upload;

/* GLOBAL MIDDLEWARE USAGE */
router.use((req, res, next) => {
  console.log("api: Cover US routes");
  next();
});

/* SWAGGER SCHEMA */
/**
 * @swagger
 * components:
 *  schemas:
 *      coverUsSchema:
 *          type: object
 *          properties:
 *              image:
 *                type: string
 *                format: binary
 */

/* ROUTES */
/**
 * @swagger
 * /project/api/v1/cover:
 *  get:
 *     summary: Get All Cover Entries
 *     description: Retrieve all cover records.
 *     tags: [Cover Us Registry]
 *     responses:
 *         200:
 *             description: A list of cover entries
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
 *                       example: Got All cover Entries
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/coverUsSchema'
 *
 *  post:
 *      summary: Create a Cover Entry
 *      description: Add a new cover entry
 *      tags: [Cover Us Registry]
 *      requestBody:
 *          required: true
 *          content:
 *             multipart/form-data:
 *              schema:
 *                $ref: '#/components/schemas/coverUsSchema'
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
 *                        example: Created Cover Entry
 *                      data:
 *                        $ref: '#/components/schemas/coverUsSchema'
 */
router
  .route("/")
  .get(CoverUsController.getAllCoverUs)
  .post(upload.single('image'),CoverUsController.createCoverUs);

/**
 * @swagger
 * /project/api/v1/cover/{id}:
 *  get:
 *     summary: Get a Cover Entry
 *     tags: [Cover Us Registry]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the cover entry
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
 *                       example: Got Beauty Entry
 *                     data:
 *                       $ref: '#/components/schemas/coverUsSchema'
 *  delete:
 *     summary: Delete a cover Entry
 *     tags: [Cover Us Registry]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the cover entry to delete
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
 *                       example: Deleted Cover Entry
 *  patch:
 *     summary: Update a Cover Entry
 *     tags: [Cover Us Registry]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the cover entry to update
 *         schema:
 *           type: string
 *     requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/coverUsSchema'
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
 *                       example: Updated Cover Entry
 *                     data:
 *                       $ref: '#/components/schemas/coverUsSchema'
 */
router
  .route("/:id")
  .get(CoverUsController.getCoverUs)
  .delete(CoverUsController.deleteCoverUs)
  .patch(upload.single('image'),CoverUsController.updateCoverUs);

module.exports = router;
