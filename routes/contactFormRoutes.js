const express = require("express");

/* MIDDLEWARE */
const router = express.Router();
const contactUsController = require("../controller/contactFormController");

/* Global Middleware for logging */
router.use((req, res, next) => {
  console.log("API: Contact Us Routes Hit");
  next();
});

/**
 * @swagger
 * components:
 *  schemas:
 *      ContactUs:
 *          type: object
 *          required:
 *            - FirstName
 *            - LastName
 *            - phoneNumber
 *            - email
 *            - address
 *            - Message
 *          properties:
 *               FirstName:
 *                 type: string
 *                 example: John
 *               LastName:
 *                 type: string
 *                 example: Doe
 *               phoneNumber:
 *                 type: string
 *                 example: 9876543210
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               address:
 *                 type: string
 *                 example: 123 Street Name, City, Country
 *               Message:
 *                 type: string
 *                 example: I would like to inquire about...
 */

/**
 * @swagger
 * /project/api/v1/contact-us-registry:
 *  get:
 *    summary: Get All Contact Us Records
 *    tags: [Contact Us Registry]
 *    parameters:
 *      - in: query
 *        name: pagination
 *        required: false
 *        schema:
 *          type: string
 *          example: {"docPerPageCount":5,"currentPage":0}
 *    responses:
 *      200:
 *        description: Contact Us records fetched successfully
 *
 *  post:
 *    summary: Create a Contact Us entry
 *    tags: [Contact Us Registry]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ContactUs'
 *    responses:
 *      201:
 *        description: Contact created successfully
 */
router
  .route("/")
  .get(contactUsController.getAllContactUs)
  .post(contactUsController.createContactUs);

/**
 * @swagger
 * /project/api/v1/contact-us-registry/{id}:
 *  get:
 *    summary: Get a Contact Us record by ID
 *    tags: [Contact Us Registry]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Contact record fetched

 *  patch:
 *    summary: Update a Contact Us record by ID
 *    tags: [Contact Us Registry]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ContactUs'
 *    responses:
 *      200:
 *        description: Contact record updated

 *  delete:
 *    summary: Delete a Contact Us record by ID
 *    tags: [Contact Us Registry]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Contact record deleted
 */
router
  .route("/:id")
  .get(contactUsController.getContactUs)
  .patch(contactUsController.updateContactUs)
  .delete(contactUsController.deleteContactUs);

module.exports = router;
