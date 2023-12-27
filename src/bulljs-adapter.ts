import Bull from 'bull';
import Logger from './utils/logger';
import version from './version';
import redisConfig from './config/redis';

export default abstract class BullJSAdapter implements ProcessQueue<Bull.ProcessCallbackFunction<any>> {
  protected queueName: string;
  protected queue: Bull.Queue;
  protected options: Bull.QueueOptions;

  constructor(
    queueName: string,
    opts?: Bull.QueueOptions
  ) {
    this.queueName = queueName;
    this.options = opts || redisConfig;

    this.queue = new Bull(
      this.queueName,
      this.options
    );
  }

  protected onError(error: Error): void {
    Logger.error('[job:error]: ' + error.stack);
  }

  protected onFailed(job: Bull.Job, error: Error): void {
    Logger.error('[job:failed]: ' + error);
    Logger.info(`Attempt: ${job.attemptsMade}`);
    if (job.attemptsMade == job.opts.attempts) {
      throw Error('Job exceeded attempts limit');
    }
  }

  protected listeners(): void {
    this.queue.on('error', this.onError);
    this.queue.on('failed', this.onFailed);
  }

  async startup(callback: Bull.ProcessCallbackFunction<any>): Promise<void> {
    Logger.info(`Version: ${version}`);
    Logger.info('Queue consumer is running...');
    this.listeners();
    this.queue.process(callback);
  }
}
