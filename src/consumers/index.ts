import type BaseConsumer from "./base-consumer";
import SampleConsumer from "./sample-consumer";

export const getConsumer = (queueName: string): BaseConsumer | undefined => {
  const consumers: Record<string, BaseConsumer | undefined> = {
    'sample': new SampleConsumer(queueName),
  }
  return consumers[queueName];
}
