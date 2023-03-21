import type { Job } from "bull";
import type { SimpleQueueJobData } from "./job.data";

const process = async (job: Job<SimpleQueueJobData>) => {
  console.log('Simple Queue...');
  console.log(job.data);
};

export = { process };
