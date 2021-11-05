import { createConnection } from "typeorm";

const connectDB = async (): Promise<void> => {
  await createConnection({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "scraper",
    entities: ["src/entity/*.ts"],
    bigNumberStrings: false,
    logging: false,
    synchronize: true,
  });

  console.log("[database]: Connected");
};

export default connectDB;
