import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import winston from 'winston';
import 'winston-daily-rotate-file';

let logDirectory = join(__dirname, "../../logs")

existsSync(logDirectory) || mkdirSync(logDirectory);

const log = winston.createLogger({
  levels: winston.config.npm.levels,
  format: winston.format.json(),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: logDirectory + "/%DATE%-error.log",
      maxFiles: '14d'
    })
  ]
});

export class Logger {
  static info(message: string) {
    log.info(message);
  }

  static error(message: string, stack?: any) {
    log.error(message, stack);
  }

  static warn(message: string) {
    log.warn(message)
  }

  static debug(message: string) {
    log.debug(message)
  }
}
