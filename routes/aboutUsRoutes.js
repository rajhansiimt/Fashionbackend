const express = require("express");

/* MIDDLEWARE */
const router = express.Router();
const aboutUsPageController = require("../controller/aboutUsController");
const { uploadFile } = require("../utility/uploadAWS");
const uploadService = require("../services/uploadService");
const upload = uploadService.upload;


/* GLOBAL MIDDLEWARE USAGE */
router.use((req, res, next) => {
  console.log("API: About Us routes");
  next();
});

/* SWAGGER SCHEMA */
/**
 * @swagger
 * components:
 *   schemas:
 *     aboutUsSchema:
 *       type: object
 *       properties:
 *         image:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *         title:
 *           type: string
 *           example: About Us Title
 *         description:
 *           type: string
 *           example: Description for About Us page
 */

/* ROUTES */

/**
 * @swagger
 * /project/api/v1/about-us-registry:
 *   get:
 *     summary: Get All About Us records
 *     tags: [About Us Registry]
 *     responses:
 *       200:
 *         description: List of About Us records
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
 *                   example: Retrieved all About Us records
 *                 aboutUs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/aboutUsSchema'
 *   post:
 *     summary: Create an About Us record
 *     tags: [About Us Registry]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               title:
 *                 type: string
 *                 example: About Us Title
 *               description:
 *                 type: string
 *                 example: Description for About Us page
 *     responses:
 *       201:
 *         description: About Us record created
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
 *                   example: About Us record created
 *                 data:
 *                   $ref: '#/components/schemas/aboutUsSchema'
 */
router
  .route("/")
  .get(aboutUsPageController.getAllAboutUs)
  .post(upload.array("image",10), aboutUsPageController.createAboutUs);

/**
 * @swagger
 * /project/api/v1/about-us-registry/{id}:
 *   get:
 *     summary: Get About Us record by ID
 *     tags: [About Us Registry]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64ef7dcd9b2f6659c7b59451
 *     responses:
 *       200:
 *         description: Retrieved About Us record
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
 *                   example: Retrieved About Us record
 *                 data:
 *                   $ref: '#/components/schemas/aboutUsSchema'
 *   patch:
 *     summary: Update About Us record by ID
 *     tags: [About Us Registry]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64ef7dcd9b2f6659c7b59451
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               title:
 *                 type: string
 *                 example: Updated Title
 *               description:
 *                 type: string
 *                 example: Updated Description
 *     responses:
 *       200:
 *         description: Updated About Us record
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
 *                   example: Updated About Us record
 *                 data:
 *                   $ref: '#/components/schemas/aboutUsSchema'
 *   delete:
 *     summary: Delete About Us record by ID
 *     tags: [About Us Registry]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64ef7dcd9b2f6659c7b59451
 *     responses:
 *       202:
 *         description: Deleted About Us record
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
 *                   example: Deleted About Us record
 */
router
  .route("/:id")
  .get(aboutUsPageController.getAboutUs)
  .patch(upload.array("image",10), aboutUsPageController.updateAboutUs)
  .delete(aboutUsPageController.deleteAboutUs);

module.exports = router;
