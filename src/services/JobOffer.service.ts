import { Like } from "typeorm";
import { JobOfferEntity } from "../entity/JobOffer.entity";
import { JobOffer, SimpleJobOfferList } from "../interfaces/JobOffer.interface";

export const CreateJobOffer = async (data: JobOffer): Promise<void> => {
  const model = new JobOfferEntity();

  model.name = data.name;
  model.company = data.company;
  model.description = data.description;
  model.location = data.location;
  model.url = data.url;

  await model.save();
};

export const UpdateJobOffer = async (
  model: JobOfferEntity,
  data: JobOffer
): Promise<void> => {
  model.name = data.name;
  model.location = data.location;
  model.description = data.description;

  await model.save();
};

export const HandleFoundJobOffer = async (data: JobOffer): Promise<void> => {
  const model = await JobOfferEntity.findOne({ url: data.url });

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
  const [offersList, count] = await JobOfferEntity.findAndCount({
    where: [
      { company: Like(`%${search}%`) },
      { name: Like(`%${search}%`) },
      { location: Like(`%${search}%`) },
    ],
    order: { company: "ASC" },
    skip: page * limit,
    take: limit,
    select: ["_id", "company", "name", "location"],
  });

  return {
    data: offersList,
    count: count,
  };
};

export const GetJobOfferDetails = async (
  id: string
): Promise<JobOffer | undefined> => {
  const offersList = await JobOfferEntity.findOne({ _id: id });

  return offersList;
};

export const DeleteOldOffers = async (
  company: string,
  mainUrl: string,
  newOffersList: string[]
) => {
  const currentOffers = await JobOfferEntity.find({
    where: { company: company },
    select: ["_id", "url"],
  });

  const filteredOffers = currentOffers.filter(
    (elem) => !newOffersList.some((filter) => elem.url === mainUrl + filter)
  );

  await Promise.all(
    filteredOffers.map(async (elem) => {
      await JobOfferEntity.delete(elem._id);
    })
  );

  console.log(
    `[server]: Deleted ${filteredOffers.length} old offers of ${company}`
  );
};
