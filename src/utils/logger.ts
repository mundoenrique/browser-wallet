const winston = require('winston');
const { printf } = winston.format;
const DailyRotateFile = require('winston-daily-rotate-file');
//Internal app
import { LogData } from '@/interfaces';

export {};

/**
 * Set the geographic time
 */
const timezoned = () => {
  let d = new Date(),
    year = d.getFullYear(),
    month = d.toLocaleString('es-Es', {
      month: '2-digit',
      timeZone: process.env.TIMEZONE,
    }),
    day = d.toLocaleString('es-Es', {
      day: '2-digit',
      timeZone: process.env.TIMEZONE,
    }),
    time = d.toLocaleString('es-Es', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: process.env.TIMEZONE,
    });

  return `${[year, month, day].join('-')} ${time}`;
};

/**
 * Config structure log output
 */
const myFormat = printf(({ level, message, user, ip, timestamp }: LogData) => {
  if (user) {
    return `${level} - ${timestamp} --> [${user}] IP: ${ip}, ${message}`;
  } else {
    return `${level} - ${timestamp} --> ${message}`;
  }
});

/**
 * Config bot log in single files date
 */
const opts = {
  filename: `${process.env.LOG_PATH}log-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  myFormat,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
    winston.format.timestamp({ format: timezoned }),
    myFormat
  ),
};

/**
 * Create new instance of winston logger
 */
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  defaultMeta: {
    service: 'user-service',
  },
  transports: [new DailyRotateFile(opts)],
});

/**
 * Create default console log when node_env is not production
 */
logger.enviromentLogs = function () {
  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        level: 'silly',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
          winston.format.timestamp({ format: timezoned }),
          myFormat
        ),
      })
    );
    return true;
  } else {
    return false;
  }
};

logger.enviromentLogs();

module.exports = logger;
