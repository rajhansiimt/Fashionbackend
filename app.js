const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const bodyParser = require("body-parser");
const app = express();

// Load environment variables
dotenv.config({ path: "./config.env" });

// Environment configuration
const HOSTNAME_LOCAL = process.env.HOSTNAME_LOCAL || "localhost";
const HOSTNAME_DEV = process.env.HOSTNAME_DEV || "dev.example.com";
const HOSTNAME_PROD = process.env.HOSTNAME_PROD || "prod.example.com";
const PORT = 8083;

// Define allowed origins
// const allowedOrigins = [
//   "https://your-frontend-app.onrender.com",
//   "http://localhost:3000",
// ];

// // CORS configuration
// const corsOptions = {
//   origin: (origin, callback) => {
//     // Allow requests with no origin (like curl, Postman, mobile apps)
//     if (!origin) return callback(null, true);

//     if (
//       process.env.NODE_ENV === "production" &&
//       !allowedOrigins.includes(origin)
//     ) {
//       return callback(new Error("CORS not allowed for this origin"), false);
//     }

//     return callback(null, true);
//   },
//   methods: ["GET", "POST", "PATCH", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
//   credentials: true,
// };
// // CORS configuration to allow all origins
const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
  credentials: true,
};


app.use(cors(corsOptions));

// Middleware setup
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());

console.log(`✅ API running at: http://${HOSTNAME_LOCAL}:${PORT}`);

// Serve static images from 'public' directory
app.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "./public", filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("File not found");
    }
  });
});

// Swagger documentation setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Backend Project Management API Services",
      version: "1.0.0",
      contact: {
        name: "Swagger Docs",
        url: `http://${HOSTNAME_LOCAL}:${PORT}/project/api/v1/api-docs/swagger.json`,
      },
    },
    components: {
      securitySchemes: {
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
        url: `http://${HOSTNAME_LOCAL}:${PORT}`,
        description: "Local Environment",
      },
      {
        url: `http://${HOSTNAME_DEV}:${PORT}`,
        description: "Development Environment",
      },
      {
        url: `http://${HOSTNAME_PROD}:${PORT}`,
        description: "Production Environment",
      },
    ],
  },
  apis: ["./routes/*.js"],
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

// API Routes
const apiRouter = require("./routes/apiRoutes");
app.use("/project/api/v1", apiRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://${HOSTNAME_LOCAL}:${PORT}`);
});

module.exports = app;
