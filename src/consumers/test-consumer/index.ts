import { Job } from "bull";
import { TestJobData } from "../../types/TestJobData";
import BaseConsumer from "../../core/base-consumer";

export default class TestConsumer extends BaseConsumer {
  public async process(job: Job<TestJobData>): Promise<void> {
    console.log('Test Queue Process');
    console.log(job.data);
  }
}
