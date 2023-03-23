import { Job } from "bull";
import { ITestJobData } from "../../types/ITestJobData";
import BaseConsumer from "../../core/base-consumer";
import { logger } from "../../start";

export default class TestConsumer extends BaseConsumer {
  public async process(job: Job<ITestJobData>): Promise<void> {
    logger.info('Test Queue Process');
    logger.debug(job.data);
  }
}
