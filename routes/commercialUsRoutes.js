const express = require("express");

/* MIDDLEWARE */
const router = express.Router();
const CommercialUsController = require("../controller/commercialUsController"); 
// const
const uploadService = require("../services/uploadService");
const upload = uploadService.upload;

/* GLOBAL MIDDLEWARE USAGE */
router.use((req, res, next) => {
  console.log("api: Commercial US routes");
  next();
});

/* SWAGGER SCHEMA */
/**
 * @swagger
 * components:
 *  schemas:
 *      commercialUsSchema:
 *          type: object
 *          properties:
 *              image:
 *                type: string
 *                format: binary
 */

/* ROUTES */
/**
 * @swagger
 * /project/api/v1/commercial:
 *  get:
 *     summary: Get All Cover Entries
 *     description: Retrieve all commercial records.
 *     tags: [Commercial Us Registry]
 *     responses:
 *         200:
 *             description: A list of commercial entries
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
 *                       example: Got All commercial Entries
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/commercialUsSchema'
 *
 *  post:
 *      summary: Create a Commercial Entry
 *      description: Add a new commercial entry
 *      tags: [Commercial Us Registry]
 *      requestBody:
 *          required: true
 *          content:
 *             multipart/form-data:
 *              schema:
 *                $ref: '#/components/schemas/commercialUsSchema'
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
 *                        example: Created Commercial Entry
 *                      data:
 *                        $ref: '#/components/schemas/commercialUsSchema'
 */
router
  .route("/")
  .get(CommercialUsController.getAllCommercialUs)
  .post(upload.single('image'),CommercialUsController.createCommercialUs);

/**
 * @swagger
 * /project/api/v1/commercial/{id}:
 *  get:
 *     summary: Get a Commercial Entry
 *     tags: [Commercial Us Registry]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the commercial entry
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
 *                       example: Got Commercial Entry
 *                     data:
 *                       $ref: '#/components/schemas/commercialUsSchema'
 *  delete:
 *     summary: Delete a commercial Entry
 *     tags: [Commercial Us Registry]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the commercial entry to delete
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
 *                       example: Deleted Commercial Entry
 *  patch:
 *     summary: Update a Commercial Entry
 *     tags: [Commercial Us Registry]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the commercial entry to update
 *         schema:
 *           type: string
 *     requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/commercialUsSchema'
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
 *                       example: Updated Commercial Entry
 *                     data:
 *                       $ref: '#/components/schemas/commercialUsSchema'
 */
router
  .route("/:id")
  .get(CommercialUsController.getCommercialUs)
  .delete(CommercialUsController.deleteCommercialUs)
  .patch(upload.single('image'),CommercialUsController.updateCommercialUs);

module.exports = router;
