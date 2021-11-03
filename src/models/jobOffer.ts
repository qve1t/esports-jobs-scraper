import { Schema, model } from "mongoose";
import { JobOfferModelInterface } from "../interfaces/JobOfferModel.interface";

const JobOfferSchema = new Schema<JobOfferModelInterface>({
  name: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  url: { type: String, required: true },
  updated: { type: Date, required: true, default: new Date() },
  visible: { type: Boolean, required: true, default: true },
});

const JobOfferModel = model<JobOfferModelInterface>("JobOffer", JobOfferSchema);

export default JobOfferModel;
