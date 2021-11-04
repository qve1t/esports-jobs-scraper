import { Document } from "mongoose";
import { JobOffer, SimpleJobOfferList } from "../interfaces/JobOffer.interface";
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

export const GetJobOffersList = async (
  search: string,
  page: number,
  limit: number
): Promise<SimpleJobOfferList> => {
  const offersList = await JobOfferModel.find({
    $or: [
      { company: { $regex: search, $options: "i" } },
      { name: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ],
  })
    .skip(page * limit)
    .limit(limit)
    .select("company name location url");

  const countDocuments = await JobOfferModel.find({
    $or: [
      { company: { $regex: search, $options: "i" } },
      { name: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ],
  }).count();

  return {
    data: offersList,
    count: countDocuments,
  };
};

export const GetJobOfferDetails = async (
  id: string
): Promise<JobOffer | null> => {
  const offersList = await JobOfferModel.findOne({ _id: id });

  return offersList;
};
