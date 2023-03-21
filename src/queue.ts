import Bull, { Job } from 'bull';
import { argv } from 'process';

const queueName = argv[2];

const start = async () => {
  const consumer: {
    process: (job: Job) => Promise<void>
  } = await import (`./consumers/${queueName}/index`)
    .then(consumer => consumer)
    .catch(error => {
      console.log(error);
      process.exit(1);
  });
  const queue = new Bull(queueName);
  queue.process(async (job) => {
    return consumer.process(job);
  });
};

start();
