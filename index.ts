import express from "express";

import { G2Company } from "./src/scrapers/g2";
import { FnaticCompany } from "./src/scrapers/fnatic";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Express + TypeScript Server"));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);

  // const G2 = new G2Company();
  // G2.scrapeAllJobOffers();
  const Fnatic = new FnaticCompany();
  Fnatic.scrapeAllJobOffers();
});
