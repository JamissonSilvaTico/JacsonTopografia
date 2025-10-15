import mongoose from "mongoose";

const homePageSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  content: { type: String }, // For text-based sections
  type: {
    type: String,
    required: true,
    enum: ["text", "services"],
    default: "text",
  },
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
});

const HomePageSection = mongoose.model(
  "HomePageSection",
  homePageSectionSchema
);

export default HomePageSection;
