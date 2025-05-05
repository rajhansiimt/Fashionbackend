// DEPENDENCIES
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// LOAD .env
dotenv.config({ path: "./config.env" });

const app = express();

// MIDDLEWARES
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// TEMPORARY: Allow all origins to fix Swagger CORS (lock down later)
app.use(
  cors({
    origin: "*", // For testing only
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// STATIC FILES
app.use(express.static(path.join(__dirname, "./public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;   
  const filePath = path.join(__dirname, "./public", filename);
  res.sendFile(filePath);
});

// SWAGGER CONFIGURATION
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Backend Management API Services",
      version: "1.0.0",
      contact: {
        name: "Swagger Docs",
        url: `http://${process.env.HOSTNAME_LOCAL}:${process.env.PORT}/project/api/v1/api-docs/swagger.json`,
      },
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    servers: [
      {
        url: `http://${process.env.HOSTNAME_LOCAL}:${process.env.PORT}`,
        description: "Local environment",
      },
      {
        url: `http://${process.env.HOSTNAME_DEV}`,
        description: "Development environment",
      },
      {
        url: `http://${process.env.HOSTNAME_PROD}`,
        description: "Production environment",
      },
    ],
  },
  apis: ["app.js", path.join(__dirname, "/routes/*.js")],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Serve Swagger JSON
app.get("/project/api/v1/api-docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocs);
});

// Serve Swagger UI
app.use(
  "/project/api/v1/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs)
);

// ROUTES
const apiRouter = require("./routes/apiRoutes");
app.use("/project/api/v1", apiRouter);

// FRONTEND ROUTES
app.get(
  "/admin/*",
  express.static(path.join(__dirname, "./public", "admin"), { maxAge: "1y" })
);
app.all("/admin/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "admin", "index.html"));
});

app.get(
  "/website/*",
  express.static(path.join(__dirname, "./public", "website"), { maxAge: "1y" })
);
app.all("/website/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "website", "index.html"));
});

app.get(
  "/agent/*",
  express.static(path.join(__dirname, "./public", "agent"), { maxAge: "1y" })
);
app.all("/agent/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "agent", "index.html"));
});

// EXPORT APP
module.exports = app;
