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
const PORT = 8081 ;

// CORS configuration to allow specific origins (adjust as needed)
const corsOptions = {
  origin: (origin, callback) => {
    // Allow all origins for development (or specify specific ones for production)
    if (process.env.NODE_ENV === "production") {
      // In production, specify exact domains or frontend URLs
      const allowedOrigins = [
        "https://frontend.example.com",
        "http://localhost:3000",
      ];
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS not allowed for this origin"), false);
      }
      return callback(null, true);
    } else {
      // For development, you can allow all origins
      return callback(null, true);
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
  credentials: true, // Enable cookies to be sent and received (useful for JWT, session cookies, etc.)
};

app.use(cors(corsOptions)); // Apply CORS middleware globally

// Middleware setup
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
app.use("/uploads",express.static(path.join(__dirname, "uploads")));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
// Logging the API URL
console.log(`✅ API running at: http://${HOSTNAME_LOCAL}:${PORT}`);

// Serve static images from 'public' directory
app.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "./public", filename);

  // If the file exists, send it, otherwise return 404
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("File not found");
    }
  });
});

// SWAGGER DOCUMENTATION SETUP
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
  apis: ["./routes/*.js"], // Fixed path to match all files in /routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Serve the Swagger JSON endpoint
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
const apiRouter = require("./routes/apiRoutes"); // Ensure this file exists
app.use("/project/api/v1", apiRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://${HOSTNAME_LOCAL}:${PORT}`);
});

module.exports = app;
