import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./db.js";
import seedDatabase from "./utils/seedDatabase.js";

import serviceRoutes from "./routes/services.js";
import contentRoutes from "./routes/content.js";
import authRoutes from "./routes/auth.js";
import settingsRoutes from "./routes/settings.js";
import homeSectionsRoutes from "./routes/homePageSections.js";

dotenv.config();

// --- Environment Variable Validation ---
// In production, the app will exit if these are not set.
// In development, it provides fallbacks for convenience.
if (!process.env.MONGO_URI) {
  if (process.env.NODE_ENV === "production") {
    console.error(
      "FATAL ERROR: MONGO_URI environment variable is not defined."
    );
    process.exit(1);
  } else {
    console.warn(
      "WARNING: MONGO_URI not found. Using local fallback for development."
    );
    process.env.MONGO_URI = "mongodb://127.0.0.1:27017/jacson-topografia";
  }
}

if (!process.env.JWT_SECRET) {
  if (process.env.NODE_ENV === "production") {
    console.error(
      "FATAL ERROR: JWT_SECRET environment variable is not defined."
    );
    process.exit(1);
  } else {
    console.warn(
      "WARNING: JWT_SECRET not found. Using insecure fallback for development."
    );
    process.env.JWT_SECRET = "temporary-secret-for-development";
  }
}
// --- End Validation ---

connectDB().then(() => {
  seedDatabase();
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/services", serviceRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/home-sections", homeSectionsRoutes);

// --- DEPLOYMENT CONFIGURATION ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  // Determine o caminho para a pasta 'dist' do frontend
  const frontendDistPath = path.join(__dirname, "..", "dist");

  // Sirva os arquivos estáticos do build do Vite
  app.use(express.static(frontendDistPath));

  // Para qualquer outra rota, sirva o index.html do frontend
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendDistPath, "index.html"));
  });
}
// --- END DEPLOYMENT CONFIGURATION ---

const PORT = process.env.PORT || 3002;

app.listen(PORT, () =>
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  )
);
