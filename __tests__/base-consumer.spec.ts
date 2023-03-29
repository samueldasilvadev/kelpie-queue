import BaseConsumer from "../src/consumers/base-consumer";

class BaseConsumerImpl extends BaseConsumer {
  getQueueName() {
    return this.queueName;
  }
}

describe('Test base-consumer', () => {
  const queueName = 'test';
  const c = new BaseConsumerImpl(queueName);
  expect(c.getQueueName()).toBe(queueName);
});
