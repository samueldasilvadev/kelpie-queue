import { getConsumer } from "../../src/consumers";
import BaseConsumer from "../../src/consumers/base-consumer";
import TestConsumer from "../../src/consumers/test-consumer";

describe('getConsumer', () => {
  test('get test consumer', () => {
    const queueName = 'test';
    const c = getConsumer(queueName);
    expect(c).toBeInstanceOf(BaseConsumer);
    expect(c).toBeInstanceOf(TestConsumer);
  });
});
