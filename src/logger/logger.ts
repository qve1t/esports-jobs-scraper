import { createLogger, format, transports } from "winston";
import { join } from "path";

export const infoLogger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    process.env.ENV === "development"
      ? new transports.Console({
          level: "info",
        })
      : new transports.File({
          filename: join(__dirname, "../../logs/info.log"),
          level: "info",
          maxsize: 5242880, //5MB
          maxFiles: 10,
        }),
  ],
});

export const errorLogger = createLogger({
  level: "error",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    process.env.ENV === "development"
      ? new transports.Console({
          level: "info",
        })
      : new transports.File({
          filename: join(__dirname, "../../logs/error.log"),
          level: "error",
          maxsize: 5242880, //5MB
          maxFiles: 10,
        }),
  ],
});
