import { argv, exit} from 'process';
import { getConsumer } from './consumers';
import Logger from './utils/logger';

const params = {
  queueName: argv[2],
  cluster: Number.parseInt(argv[3]) || 1
};

const start = async () => {
  try {
    const consumer = getConsumer(params.queueName);
    if (typeof consumer === 'undefined') {
      Logger.error('Consumer not found');
      exit(1);
    }
    consumer.start();
  } catch (e) {
    Logger.error(e);
    exit(1);
  }
};

start();
