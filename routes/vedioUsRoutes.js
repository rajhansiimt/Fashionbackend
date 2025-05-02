const express = require("express");

/* MIDDLEWARE */
const router = express.Router();
const vedioUsController = require("../controller/vedioUsController");
const uploadService = require("../services/uploadService");
const upload = uploadService.upload;

/* GLOBAL MIDDLEWARE USAGE */
router.use((req, res, next) => {
  console.log("API: Vedio US routes");
  next();
});

/* SWAGGER SCHEMA */
/**
 * @swagger
 * components:
 *  schemas:
 *      vedioUsSchema:
 *          type: object
 *          properties:
 *              video:
 *                type: string
 *                format: binary
 */

/* ROUTES */
/**
 * @swagger
 * /project/api/v1/vedio:
 *  get:
 *     summary: Get All Vedio Entries
 *     description: Retrieve all vedio records.
 *     tags: [Vedio Us Registry]
 *     responses:
 *         200:
 *             description: A list of vedio entries
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
 *                       example: Got All Vedio Entries
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/vedioUsSchema'
 *
 *  post:
 *      summary: Create a Vedio Entry
 *      description: Add a new vedio entry
 *      tags: [Vedio Us Registry]
 *      requestBody:
 *          required: true
 *          content:
 *             multipart/form-data:
 *              schema:
 *                $ref: '#/components/schemas/vedioUsSchema'
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
 *                        example: Created Vedio Entry
 *                      data:
 *                        $ref: '#/components/schemas/vedioUsSchema'
 */
router
  .route("/")
  .get(vedioUsController.getAllVedioUs)
  .post(upload.fields([
    { name: "video", maxCount: 1 },
  ]), vedioUsController.createVedioUs);

/**
 * @swagger
 * /project/api/v1/vedio/{id}:
 *  get:
 *     summary: Get a Vedio Entry
 *     tags: [Vedio Us Registry]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the vedio entry
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
 *                       example: Got Vedio Entry
 *                     data:
 *                       $ref: '#/components/schemas/vedioUsSchema'
 *  delete:
 *     summary: Delete a Vedio Entry
 *     tags: [Vedio Us Registry]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the vedio entry to delete
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
 *                       example: Deleted Vedio Entry
 *  patch:
 *     summary: Update a Vedio Entry
 *     tags: [Vedio Us Registry]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the vedio entry to update
 *         schema:
 *           type: string
 *     requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/vedioUsSchema'
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
 *                       example: Updated Vedio Entry
 *                     data:
 *                       $ref: '#/components/schemas/vedioUsSchema'
 */
router
  .route("/:id")
  .get(vedioUsController.getVedioUs)
  .delete(vedioUsController.deleteVedioUs)
  .patch(upload.single("video"), vedioUsController.updateVedioUs);

module.exports = router;
