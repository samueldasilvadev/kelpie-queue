import type { Job } from "bull";

import BaseBusiness from "../base-consumer";
import Logger from "../../utils/logger";

interface JobData {
  name: string;
  email: string;
}

export default class SampleBusiness extends BaseBusiness {
  public async process({ data }: Job<JobData>): Promise<void> {
    Logger.info('Test Queue Process');
    try {
      Logger.info(data);
    } catch (error) {
      Logger.error(error);
    }
  }
}
