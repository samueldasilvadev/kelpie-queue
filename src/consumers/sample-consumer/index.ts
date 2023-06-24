import Bull, { Job } from "bull";
import BaseConsumer from "../base-consumer";
import Logger from "../../utils/logger";
import { pid } from "process";

export default class SampleConsumer extends BaseConsumer {
  constructor (queueName: string) {
    super(queueName);
  }
  public async process(job: Job): Promise<void> {
    Logger.info(`Worker PID: ${pid}`);
    Logger.info('Test Queue Process');

    console.log('>>>>>>>');
    const { data } = job;
    throw Error('1');
    try {
      Logger.info(data);
    } catch (error) {
      Logger.error(error);
    }
  }
}
