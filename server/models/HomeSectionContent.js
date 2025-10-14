import mongoose from "mongoose";

const homeSectionsContentSchema = new mongoose.Schema({
  aboutSectionTitle: { type: String, required: true },
  aboutSectionSubtitle: { type: String, required: true },
  aboutSectionText: { type: String, required: true },
  servicesSectionTitle: { type: String, required: true },
  servicesSectionSubtitle: { type: String, required: true },
});

const HomeSectionsContent = mongoose.model(
  "HomeSectionsContent",
  homeSectionsContentSchema
);

export default HomeSectionsContent;
