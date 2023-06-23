import TestConsumer from "../../src/consumers/test-consumer";

describe('TestConsumer', () => {
  test('instance of itself', () => {
    const queueName = 'test';
    const t = new TestConsumer(queueName);
  })
});

describe('test', () => {
  test('tets', async () => {
    const queueName = 'test2';
    const t = new TestConsumer(queueName);
  });
});
