import { Job } from "bull";
import { ITestJobData } from "../../types/ITestJobData";
import BaseConsumer from "../../core/base-consumer";
import Logger from "../../utils/logger";

export default class TestConsumer extends BaseConsumer {
  public async process(job: Job<ITestJobData>): Promise<void> {
    Logger.info('Test Queue Process');
    Logger.info(job.data);
  }
}
