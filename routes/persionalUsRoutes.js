const express = require("express");
const router = express.Router();
const persionalUsController = require("../controller/persionalUsController");
const { uploadFile } = require("../utility/uploadAWS");
const { upload } = require('../services/uploadService');

/**
 * @swagger
 * components:
 *   schemas:
 *     PersonalUs:
 *       type: object
 *       required:
 *         - mainImage
 *         - subImage
 *         - titlemain
 *         - titlesub
 *       properties:
 *         mainImage:
 *           type: string
 *           format: uri
 *         subImage:
 *           type: string
 *           format: uri
 *         titlemain:
 *           type: string
 *         titlesub:
 *           type: string
 *         description:
 *           type: string
 *         interviewtitle:
 *           type: string
 *         interviewQuote:
 *           type: string
 */

/**
 * @swagger
 * /project/api/v1/persional:
 *   get:
 *     tags: [Personal Us]
 *     summary: Get all Personal Us entries
 *     parameters:
 *       - in: query
 *         name: pagination
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
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PersonalUs'
 *   post:
 *     tags: [Personal Us]
 *     summary: Create new Personal Us entry
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               mainImage:
 *                 type: string
 *                 format: binary
 *               subImage:
 *                 type: string
 *                 format: binary
 *               titlemain:
 *                 type: string
 *               titlesub:
 *                 type: string
 *               description:
 *                 type: string
 *               interviewtitle:
 *                 type: string
 *               interviewQuote:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonalUs'
 */

router
  .route("/")
  .get(persionalUsController.getAllPersionalUs)
  .post(
    upload.fields([
      { name: "mainImage", maxCount: 1 },
      { name: "subImage", maxCount: 1 }
    ]),
    persionalUsController.createPersionalUs
  );

/**
 * @swagger
 * /project/api/v1/persional/{id}:
 *   get:
 *     tags: [Personal Us]
 *     summary: Get single Personal Us entry
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonalUs'
 *   patch:
 *     tags: [Personal Us]
 *     summary: Update Personal Us entry
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               mainImage:
 *                 type: string
 *                 format: binary
 *               subImage:
 *                 type: string
 *                 format: binary
 *               titlemain:
 *                 type: string
 *               titlesub:
 *                 type: string
 *               description:
 *                 type: string
 *               interviewtitle:
 *                 type: string
 *               interviewQuote:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/PersonalUs'
 *   delete:
 *     tags: [Personal Us]
 *     summary: Delete Personal Us entry
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted
 */

router
  .route("/:id")
  .get(persionalUsController.getPersionalUs)
  .patch(
    uploadFile([
      { name: "mainImage", maxCount: 1 },
      { name: "subImage", maxCount: 1 }
    ]),
    persionalUsController.updatePersionalUs
  )
  .delete(persionalUsController.deletePersionalUs);

module.exports = router;