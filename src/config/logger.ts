import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import winston from 'winston';
import 'winston-daily-rotate-file';

let logDirectory = join(__dirname, "../../logs")

existsSync(logDirectory) || mkdirSync(logDirectory);

export const LOGGER = winston.createLogger({
  levels: winston.config.npm.levels,
  format: winston.format.json(),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: logDirectory + "/%DATE%-error.log",
      maxFiles: '14d'
    })
  ]
});
