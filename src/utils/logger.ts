import 'winston-daily-rotate-file';
import { createLogger, format, transports } from 'winston';
//Internal app

const { colorize, combine, json, label, printf, simple, splat, timestamp, uncolorize } = format;
const levels = { error: 0, warn: 1, debug: 2, info: 3 };
const timeZone = process.env.TIMEZONE ?? 'America/Lima';
const logFile = process.env.LOG_FILE ?? 'OFF';
const maxFiles = process.env.MAX_FIES ?? '60d';

function writeLog() {
  const appUser = null;
  const dateFormat = () => {
    const now = new Date(),
      year = now.getFullYear(),
      month = now.toLocaleString('es-Es', {
        month: '2-digit',
        timeZone,
      }),
      day = now.toLocaleString('es-Es', {
        day: '2-digit',
        timeZone,
      }),
      time = now.toLocaleString('es-Es', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone,
      });

    return `${[year, month, day].join('-')} ${time}`;
  };

  const consoleTransport = new transports.Console();

  const printFormat = printf(({ level, label, timestamp, message }) => {
    const output = {
      message: `${label}:${level} - ${timestamp} --> ${message}`,
    };

    if (appUser) output.message = `${label}:${level} - ${timestamp} --> [${appUser}] ${message}`;

    return output.message;
  });

  const logger = createLogger({
    levels,
    level: 'info',
    format: combine(
      json(),
      colorize({ all: true }),
      label({ label: process.env.WEB_ENV }),
      splat(),
      simple(),
      timestamp({
        format: dateFormat,
      }),
      printFormat
    ),
    defaultMeta: { service: 'user-service' },
    transports: [consoleTransport],
  });

  if (logFile === 'ON') {
    const fileTransport = new transports.DailyRotateFile({
      filename: `logs/log-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles,
      format: uncolorize(),
    });

    logger.add(fileTransport);
  }

  return logger;
}

export default writeLog();
