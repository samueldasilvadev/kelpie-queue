import { Job } from "bull";
import BullJSAdapter from "../../adapters/bulljs";
import Logger from "../../utils/logger";

export default class SampleWorker extends BullJSAdapter {
  async process({ data }: Job<any>): Promise<void> {
    Logger.info('Test Queue Process');
    try {
      Logger.info(data);
    } catch (error) {
      Logger.error(error);
    }
  }
}
