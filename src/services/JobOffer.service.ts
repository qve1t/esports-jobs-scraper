import {
  JobOffer as JobOfferNoId,
  SimpleJobOfferList,
} from "../interfaces/JobOffer.interface";
import { JobOffer } from "@prisma/client";
import { db } from "../db/db.server";

export class JobOfferService {
  static async CreateJobOffer(data: JobOffer): Promise<void> {
    if (!data.name || !data.description) {
      return;
    }

    await db.jobOffer.create({
      data: {
        name: data.name,
        company: data.company,
        description: data.description,
        location: data.location,
        url: data.url,
      },
    });
  }

  static async HandleFoundJobOffer(data: JobOfferNoId): Promise<void> {
    if (!data.name || !data.description) {
      return;
    }

    await db.jobOffer.upsert({
      where: { url: data.url },
      update: {
        name: data.name,
        company: data.company,
        description: data.description,
        location: data.location,
        url: data.url,
      },
      create: {
        name: data.name,
        company: data.company,
        description: data.description,
        location: data.location,
        url: data.url,
      },
    });
  }

  static async GetJobOffersList(
    search: string,
    org: string,
    page: number,
    limit: number
  ): Promise<SimpleJobOfferList> {
    const offersList = await db.jobOffer.findMany({
      where: {
        OR: [
          { name: { contains: search }, company: { contains: org } },
          { location: { contains: search }, company: { contains: org } },
        ],
      },
      skip: page * limit,
      take: limit,
      orderBy: { company: "asc" },
      select: { id: true, company: true, name: true, location: true },
    });

    const count = await db.jobOffer.count({
      where: {
        OR: [
          { name: { contains: search }, company: { contains: org } },
          { location: { contains: search }, company: { contains: org } },
        ],
      },
    });

    return {
      data: offersList,
      count: count,
    };
  }

  static async GetJobOfferDetails(id: string): Promise<JobOffer | null> {
    return await db.jobOffer.findUnique({ where: { id: id } });
  }

  static async DeleteOldOffers(
    company: string,
    mainUrl: string,
    newOffersList: string[]
  ) {
    const currentOffers = await db.jobOffer.findMany({
      where: { company: company },
      select: { id: true, url: true },
    });

    const filteredOffers = currentOffers.filter(
      (elem) => !newOffersList.some((filter) => elem.url === mainUrl + filter)
    );

    await Promise.all(
      filteredOffers.map(async (elem) => {
        await db.jobOffer.delete({ where: { id: elem.id } });
      })
    );

    console.log(
      `[server]: Deleted ${filteredOffers.length} old offers of ${company}`
    );
  }
}
