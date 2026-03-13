import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// In production the server lives at dist/index.js and static files at dist/public/
const staticPath = path.resolve(__dirname, "public");

// Security headers
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// Serve static files with caching
app.use(
  express.static(staticPath, {
    maxAge: "1y",
    immutable: true,
    index: false,
  }),
);

// SPA fallback — serve index.html for all non-asset routes
app.get("*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
