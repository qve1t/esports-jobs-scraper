import { Router } from "express";
import { JobOfferService } from "../services/JobOffer.service";

const JobOfferRouter = Router();

JobOfferRouter.get("/api/getoffers/", async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page as string) || 0;
    const limit = parseInt(req.query.limit as string) || 15;
    const organization = (req.query.org as string) || "";

    const response = await JobOfferService.GetJobOffersList(
      search as string,
      organization as string,
      page,
      limit
    );
    res.send(response);
  } catch (error) {
    res.status(500).send({ error: "Server error appeared" });
  }
});

JobOfferRouter.get("/api/offer/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const response = await JobOfferService.GetJobOfferDetails(id);

    if (response) {
      res.send(response);
    } else {
      res.status(404).send({ error: "Offer not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Server error appeared" });
  }
});

export default JobOfferRouter;
