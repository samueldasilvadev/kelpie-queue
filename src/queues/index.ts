import { IProcessQueue } from "../types/IProcessQueue";
import SampleWorker from "../application/workers/sample-worker";

type Queue = (queueName: string) => IProcessQueue;

export const queues: Record<string, Queue | undefined> = {
  'sample': (queueName: string) => new SampleWorker(queueName)
}
