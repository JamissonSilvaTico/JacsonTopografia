import mongoose from "mongoose";

const aboutPageContentSchema = new mongoose.Schema({
  preTitle: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  imageUrl: { type: String, required: true },
  paragraph1: { type: String, required: true },
  paragraph2: { type: String, required: true },
});

const AboutPageContent = mongoose.model(
  "AboutPageContent",
  aboutPageContentSchema
);

export default AboutPageContent;
