import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
