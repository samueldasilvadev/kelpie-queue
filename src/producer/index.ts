import Bull from 'bull';
import { argv, exit } from 'process';
import redisConfig from '../config/redis';
import Logger from '../utils/logger';
import Colors from '../types/enums/EColors';

const params = {
  queueName: argv[2],
  jobs: (Number.parseInt(argv[3])) > 0 ? Number.parseInt(argv[3]) : 1,
  data: argv[4] || '',
};

let data = {};
try {
  data = JSON.parse(params.data);
} catch (error) {
  Logger.log(Colors.bgyellow, 'Invalid input, data should be an valid json string');
  Logger.error(error);
  exit(1);
}

if (Object.keys(data).length === 0) {
  Logger.log(Colors.bgyellow, `Empty producer data for '${params.queueName}' queue`);
  exit(1);
}

const producer = new Bull(
  params.queueName,
  {
    ...redisConfig,
    defaultJobOptions: {
      attempts: 3,
      removeOnComplete: true,
    },
  }
);

for (let i = 0; i < params.jobs; i++) {
  producer.add(data).finally(() => {
    Logger.info(`${params.jobs} jobs added in queue ${params.queueName}`);
    Logger.info({ jobData: params.data });
    exit(0);
  });
}
