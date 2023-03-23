import Bull from 'bull';
import { baseQueueOptions } from '../constants';
import { logger } from '../start';

export default abstract class BaseConsumer {

  protected queueName: string;
  protected queue: Bull.Queue;
  protected options: Bull.QueueOptions;

  constructor(
    queueName: string,
    options: {
      opts?: Bull.QueueOptions,
      debugMode: boolean
    }
  ) {
    this.queueName = queueName;
    this.options = options.opts ? options.opts : baseQueueOptions;

    this.queue = new Bull(
      this.queueName,
      this.options
    );
  }

  #onError(error: Error) {
    logger.error('[bull:error]:' + error);
  }

  #onFailed(job: Bull.Job, error: Error) {
    logger.error('[bull:failed]: ' + error);
  }

  protected listeners(): void {
    this.queue.on('error', this.#onError);
    this.queue.on('failed', this.#onFailed);
  }

  public async process(job: Bull.Job): Promise<void> {}

  public async start(): Promise<void> {
    logger.debug('Running in debug mode (•_•) ( •_•)>⌐■-■ (⌐■_■)>c[_]');
    this.listeners();
    this.queue.process(this.process);
  }
}
