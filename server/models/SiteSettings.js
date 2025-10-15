import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema({
  logoType: {
    type: String,
    enum: ["text", "image"],
    default: "text",
    required: true,
  },
  logoTextLine1: { type: String, default: "Jacson" },
  logoTextLine2: { type: String, default: "Topografia & Agrimensura" },
  logoImageUrl: { type: String, default: "" },
});

const SiteSettings = mongoose.model("SiteSettings", siteSettingsSchema);

export default SiteSettings;
