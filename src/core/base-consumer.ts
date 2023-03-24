import Bull from 'bull';
import { BASE_QUEUE_OPTIONS } from '../constants';
import Logger from '../utils/logger';
import version from '../version';

export default abstract class BaseConsumer {

  protected queueName: string;
  protected queue: Bull.Queue;
  protected options: Bull.QueueOptions;

  constructor(
    queueName: string,
    opts?: Bull.QueueOptions,
  ) {
    this.queueName = queueName;
    this.options = opts ? opts : BASE_QUEUE_OPTIONS;

    this.queue = new Bull(
      this.queueName,
      this.options
    );
  }

  #onError(error: Error) {
    Logger.error('[bull:error]:' + error);
  }

  #onFailed(job: Bull.Job, error: Error) {
    Logger.error('[bull:failed]: ' + error);
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
