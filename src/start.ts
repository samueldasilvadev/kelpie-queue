import { argv } from 'process';
import { getConsumer } from './consumers';
import Logger from './utils/logger';

const params = {
  queueName: argv[2],
};

const start = async () => {
  try {
    const consumer = getConsumer(params.queueName);
    if (typeof consumer === 'undefined') {
      Logger.error('Consumer not found');
      process.exit(1);
    }
    consumer.start();
  } catch (e) {
    Logger.error(e);
    process.exit(1);
  }
};

start();
