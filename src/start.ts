import { argv } from 'process';
import { getConsumer } from './consumers';

const queueName = argv[2];

const start = async () => {
  try {
    const consumer = getConsumer(queueName);
    if (typeof consumer === 'undefined') {
      throw new Error('Consumer not found')
    }
    consumer.start();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

start();
