import Bull from 'bull';
import { baseQueueOptions } from '../../constants';

export default abstract class BaseConsumer {

  protected queueName: string;
  protected queue: Bull.Queue;
  protected options: Bull.QueueOptions;

  constructor(queueName: string, opts?: Bull.QueueOptions) {
    this.queueName = queueName;
    this.options = opts ? opts : baseQueueOptions;
    this.queue = new Bull(
      this.queueName,
      this.options
    );
  }

  protected onError(error: Error) {
    console.log('[bull:error]:' + error);
  }

  protected onFailed(job: Bull.Job, error: Error) {
    console.log('[bull:failed]: ' + error);
  }

  protected listeners(): void {
    console.log('Set base listeners...');
    this.queue.on('error', this.onError);
    this.queue.on('failed', this.onFailed);
  }

  public async process(job: Bull.Job): Promise<void> { }

  public async start(): Promise<void> {
    this.listeners();
    this.queue.process(this.process);
  }
}
