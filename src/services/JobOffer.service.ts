import { Document } from "mongoose";
import { JobOffer } from "../interfaces/JobOffer.interface";
import { JobOfferModelInterface } from "../interfaces/JobOfferModel.interface";
import JobOfferModel from "../models/jobOffer";

export const CreateJobOffer = async (data: JobOffer): Promise<void> => {
  const model = new JobOfferModel({
    name: data.name,
    company: data.company,
    description: data.description,
    location: data.location,
    url: data.url,
  });

  await model.save();
};

export const UpdateJobOffer = async (
  model: Document<any, any, JobOfferModelInterface> & JobOfferModelInterface,
  data: JobOffer
): Promise<void> => {
  model.name = data.name;
  model.location = data.location;
  model.description = data.description;
  model.updated = new Date();

  await model.save();
};

export const HandleFoundJobOffer = async (data: JobOffer): Promise<void> => {
  const model = await JobOfferModel.findOne({ url: data.url });

  if (!model) {
    CreateJobOffer(data);
  } else {
    UpdateJobOffer(model, data);
  }
};
