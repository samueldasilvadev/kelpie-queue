import { argv } from 'process';
import { getConsumer } from './consumers';
import DateTime from './utils/date-time';
import Logger from './utils/logger';

const params = {
  queueName: argv[2],
  debugMode: Boolean(argv[3]),
};

const dataTime = new DateTime();
export const logger = new Logger(dataTime, params.debugMode);

const start = async () => {
  try {
    const consumer = getConsumer(params.queueName, params.debugMode);
    if (typeof consumer === 'undefined') {
      logger.error('Consumer not found');
      process.exit(1);
    }
    consumer.start();
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
};

start();
