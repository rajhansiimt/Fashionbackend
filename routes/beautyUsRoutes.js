const express = require("express");

/* MIDDLEWARE */
const router = express.Router();
const beautyController = require("../controller/beautyUsController"); // Make sure this controller exists
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
 *      beautyUsSchema:
 *          type: object
 *          properties:
 *              image:
 *                type: string
 *                format: binary
 */

/* ROUTES */
/**
 * @swagger
 * /project/api/v1/beauty:
 *  get:
 *     summary: Get All Beauty Entries
 *     description: Retrieve all beauty records.
 *     tags: [Beauty Us Registry]
 *     responses:
 *         200:
 *             description: A list of beauty entries
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
 *                       example: Got All Beauty Entries
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/beautyUsSchema'
 *
 *  post:
 *      summary: Create a Beauty Entry
 *      description: Add a new beauty entry
 *      tags: [Beauty Us Registry]
 *      requestBody:
 *          required: true
 *          content:
 *             multipart/form-data:
 *              schema:
 *                $ref: '#/components/schemas/beautyUsSchema'
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
 *                        example: Created Beauty Entry
 *                      data:
 *                        $ref: '#/components/schemas/beautyUsSchema'
 */
router
  .route("/")
  .get(beautyController.getAllBeautyUs)
  .post(upload.single('image'),beautyController.createBeautyUs);

/**
 * @swagger
 * /project/api/v1/beauty/{id}:
 *   get:
 *     summary: Get a Beauty Entry
 *     tags: [Beauty Us Registry]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the beauty entry
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Got Beauty Entry
 *                 data:
 *                   $ref: '#/components/schemas/beautyUsSchema'
 * 
 *   delete:
 *     summary: Delete a Beauty Entry
 *     tags: [Beauty Us Registry]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the beauty entry to delete
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Deleted Beauty Entry
 * 
 *   patch:
 *     summary: Update a Beauty entry by ID
 *     tags: [Beauty Us Registry]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the beauty entry to update
 *         required: true
 *         schema:
 *           type: string
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
 *       200:
 *         description: Beauty entry updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/beautyUsSchema'
 */

router
  .route("/:id")
  .get(beautyController.getBeautyUs)
  .delete(beautyController.deleteBeautyUs)
  .patch(upload.single('image'),beautyController.updateBeautyUs);

module.exports = router;
