import Bull from 'bull';
import { baseQueueOptions } from '../constants';
import Logger from '../utils/logger';

export default abstract class BaseConsumer {

  protected queueName: string;
  protected queue: Bull.Queue;
  protected options: Bull.QueueOptions;

  constructor(
    queueName: string,
    opts?: Bull.QueueOptions,
  ) {
    this.queueName = queueName;
    this.options = opts ? opts : baseQueueOptions;

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
    Logger.info('Worker ir running: (•_•) ( •_•)>⌐■-■ (⌐■_■)>c[_]');
    this.listeners();
    this.queue.process(this.process);
  }
}
