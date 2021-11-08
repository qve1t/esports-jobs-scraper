import { Like } from "typeorm";
import { JobOfferEntity } from "../entity/JobOffer.entity";
import { JobOffer, SimpleJobOfferList } from "../interfaces/JobOffer.interface";

export class JobOfferService {
  static async CreateJobOffer(data: JobOffer): Promise<void> {
    const model = new JobOfferEntity();

    if (!data.name || !data.description) {
      return;
    }

    model.name = data.name;
    model.company = data.company;
    model.description = data.description;
    model.location = data.location;
    model.url = data.url;

    await model.save();
  }

  static async UpdateJobOffer(
    model: JobOfferEntity,
    data: JobOffer
  ): Promise<void> {
    model.name = data.name;
    model.location = data.location;
    model.description = data.description;
    model.url = data.url;

    await model.save();
  }

  static async HandleFoundJobOffer(data: JobOffer): Promise<void> {
    const model = await JobOfferEntity.findOne({ url: data.url });

    if (!model) {
      this.CreateJobOffer(data);
    } else {
      this.UpdateJobOffer(model, data);
    }
  }

  static async GetJobOffersList(
    search: string,
    org: string,
    page: number,
    limit: number
  ): Promise<SimpleJobOfferList> {
    const [offersList, count] = await JobOfferEntity.findAndCount({
      where: [
        { name: Like(`%${search}%`), company: Like(`%${org}%`) },
        { location: Like(`%${search}%`), company: Like(`%${org}%`) },
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
  }

  static async GetJobOfferDetails(id: string): Promise<JobOffer | undefined> {
    const offersList = await JobOfferEntity.findOne({ _id: id });

    return offersList;
  }

  static async DeleteOldOffers(
    company: string,
    mainUrl: string,
    newOffersList: string[]
  ) {
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
  }
}
