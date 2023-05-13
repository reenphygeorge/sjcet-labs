// eslint-disable-next-line import/no-extraneous-dependencies
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

// eslint-disable-next-line @typescript-eslint/no-shadow
const myFormat = printf(({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`);

const logger = createLogger({
  level: 'debug',
  transports: [
    new transports.Console({
      format: combine(format.colorize(), timestamp({ format: 'HH:mm:ss' }), myFormat),
    }),
    new transports.File({
      filename: 'logs/error.log',
      format: combine(timestamp({ format: 'HH:mm:ss' }), format.json()),
      level: 'error',
    }),
    new transports.File({
      filename: 'logs/combined.log',
      format: combine(timestamp({ format: 'HH:mm:ss' }), format.json()),
    }),
  ],
});

export default logger;
