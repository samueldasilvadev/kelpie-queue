import Bull from 'bull';
import Logger from '../../utils/logger';
import version from '../../version';

import {
  BASE_QUEUE_OPTIONS
} from '../../constants';

export default abstract class BaseConsumer {

  protected queueName: string;
  protected queue: Bull.Queue;
  protected options: Bull.QueueOptions;
  protected attempts: number;

  constructor(
    queueName: string,
    opts?: Bull.QueueOptions,
  ) {
    this.queueName = queueName;
    this.options = opts || BASE_QUEUE_OPTIONS;
    this.attempts = 3;

    this.queue = new Bull(
      this.queueName,
      this.options
    );
  }

  #onError(error: Error) {
    Logger.error('[bull:error]: ' + error.stack);
  }

  #onFailed(job: Bull.Job, error: Error) {
    Logger.error('[bull:failed]: ' + error);
    if (job.attemptsMade + 1 <= 3) {
      console.log(job.attemptsMade + 1);
      job.retry();
      return;
    }
    throw Error('Retry failed');
  }

  protected listeners(): void {
    this.queue.on('error', this.#onError);
    this.queue.on('failed', this.#onFailed);
  }

  public async process(job: Bull.Job): Promise<void> {}

  public async start(): Promise<void> {
    Logger.info(`Version: ${version}`);
    Logger.info('Queue consumer is running...');
    this.listeners();
    this.queue.process(this.process);
  }
}
