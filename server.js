require("dotenv").config();

const express = require("express");
const path = require("path");
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || `http://localhost:${PORT}`;
const STATIC_DIR = process.env.STATIC_DIR || "./client";

// ---- Middleware ----
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, STATIC_DIR)));

// ---- API routes (small demo endpoints so the frontend has something to call) ----

// Returns the list of things being learned - powers the "What I'm Learning" section
app.get("/api/learning", (req, res) => {
  res.json({
    learner: "Abdul Basit Hansi",
    currentlyLearning: [
      "Provisioning and connecting to an AWS EC2 instance over SSH",
      "Configuring Ubuntu servers: users, firewalls & security groups",
      "Deploying a Node.js + Express app on a Linux VM",
      "Managing environment variables safely with .env",
      "Using PM2 / systemd to keep a Node app alive after SSH disconnects",
      "Setting up an Elastic IP so the server has a stable address",
      "Reverse proxying with Nginx and adding HTTPS via Let's Encrypt",
      "Basic Docker packaging for reproducible deployments"
    ]
  });
});

// Returns popular AWS / cloud services - powers the "Trending in the Cloud" section
app.get("/api/trending", (req, res) => {
  res.json({
    popularAwsServices: [
      { name: "EC2", use: "Resizable virtual servers - what this project runs on" },
      { name: "S3", use: "Object storage for static assets, backups & data lakes" },
      { name: "Lambda", use: "Run code without managing servers (serverless)" },
      { name: "RDS", use: "Managed relational databases (Postgres, MySQL, etc.)" },
      { name: "CloudFront", use: "Global CDN for low-latency content delivery" },
      { name: "IAM", use: "Fine-grained access control for users & services" },
      { name: "Route 53", use: "Scalable DNS and domain management" },
      { name: "ECS / EKS", use: "Running containers at scale on AWS" }
    ]
  });
});

// Health check - useful once this is behind a load balancer / target group
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// ---- Page routes ----
app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, STATIC_DIR, "success.html"));
});

app.get("/cancel", (req, res) => {
  res.sendFile(path.join(__dirname, STATIC_DIR, "cancel.html"));
});

// Fallback to index for anything else (simple SPA-friendly fallback)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, STATIC_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at ${DOMAIN} (port ${PORT})`);
  console.log(`📁 Serving static files from: ${STATIC_DIR}`);
});
