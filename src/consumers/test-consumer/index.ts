import { Job } from "bull";
import BaseConsumer from "../base-consumer";

interface TestJobData {
  message: string;
}

export default class TestConsumer extends BaseConsumer {
  public async process(job: Job<TestJobData>): Promise<void> {
    console.log('Test Queue Process');
    console.log(job.data);
  }
}
