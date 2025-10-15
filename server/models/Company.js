import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logoUrl: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const Company = mongoose.model("Company", companySchema);

export default Company;
