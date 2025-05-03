const express = require("express");
const router = express.Router();

// Importing all route files
const aboutUsRegistryRouter = require("./aboutUsRoutes");
const contactUsRegistryRouter = require("./contactFormRoutes");
const listCategoryRouter = require("./listCategoryRoutes");
const productRouter = require("./productRoutes");
const beautyUsRouter  = require("./beautyUsRoutes");
const coversUsRouter = require("./coversUsRoutes");
const commercialUsRouter = require("./commercialUsRoutes");
const fashionUsRouter = require("./fashionUsRoutes");
const homeUsRouter = require("./homeUsRoutes");
const vedioUsRoutes = require("./vedioUsRoutes");
const persionalUsRoutes = require("./persionalUsRoutes");
const adminRoutes = require("./adminRoutes");

// Correctly mounting the routes
router.use("/about-us-registry", aboutUsRegistryRouter);
router.use("/contact-us-registry", contactUsRegistryRouter);
router.use("/list-category", listCategoryRouter);
router.use("/products", productRouter); 
router.use("/beauty", beautyUsRouter);
router.use("/commercial", commercialUsRouter);
router.use("/cover", coversUsRouter);
router.use("/fashion", fashionUsRouter);
router.use("/home", homeUsRouter);
router.use("/vedio", vedioUsRoutes);
router.use("/persional", persionalUsRoutes);


router.use("/admin", adminRoutes);
module.exports = router;
