import Bull from 'bull';
import { argv, exit } from 'process';
import { BASE_QUEUE_OPTIONS } from '../constants';
import Logger from '../utils/logger';
import testSampleData  from './sample-data/test.json';

const params = {
  queueName: argv[2],
  jobs: (Number.parseInt(argv[3])) > 0 ? Number.parseInt(argv[3]) : 1,
};

const sampleData: Record<string, unknown> = {
  'test': testSampleData
}

const data = sampleData[params.queueName];
if (typeof data === 'undefined') {
  Logger.error(`Sample data not found for '${params.queueName}' queue`);
  exit(1);
}

const producer = new Bull(params.queueName, BASE_QUEUE_OPTIONS);
for (let i = 0; i < params.jobs; i++) {
  producer.add(data).finally(() => {
    Logger.info(`${params.jobs} jobs added in queue ${params.queueName}`);
    Logger.info({ jobData: data });
    exit(0);
  });
}
