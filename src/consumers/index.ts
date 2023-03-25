import type BaseConsumer from "./base-consumer";
import TestConsumer from "./test-consumer";

export const getConsumer = (queueName: string) => {
  const consumers: Record<string, BaseConsumer | undefined> = {
    'test': new TestConsumer(queueName),
  }
  return consumers[queueName];
}
