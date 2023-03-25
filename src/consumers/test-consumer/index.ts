import { Job } from "bull";
import ITestJobData from "../../types/ITestJobData";
import BaseConsumer from "../base-consumer/";
import Logger from "../../utils/logger";
import { pid } from "process";

export default class TestConsumer extends BaseConsumer {
  public async process(job: Job<ITestJobData>): Promise<void> {
    Logger.info(`Worker PID: ${pid}`);
    Logger.info('Test Queue Process');
    Logger.info(job.data);
  }
}
