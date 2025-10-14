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

dotenv.config();

// Fallback for missing .env file in development
if (process.env.NODE_ENV !== "production") {
  if (!process.env.MONGO_URI) {
    console.warn(
      "WARNING: MONGO_URI not found in .env file. Using default local MongoDB connection."
    );
    process.env.MONGO_URI = "mongodb://127.0.0.1:27017/gtec-drone";
  }
  if (!process.env.JWT_SECRET) {
    console.warn(
      "WARNING: JWT_SECRET not found in .env file. Using a default secret. THIS IS INSECURE FOR PRODUCTION."
    );
    process.env.JWT_SECRET = "temporary-secret-for-development";
  }
}

connectDB().then(() => {
  seedDatabase();
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/services", serviceRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/auth", authRoutes);

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
