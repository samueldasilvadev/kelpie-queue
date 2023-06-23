import BaseConsumer from "../../src/consumers/base-consumer";

class BaseConsumerImpl extends BaseConsumer {
  getQueueName() {
    return this.queueName;
  }
}
// const mockBull = jest.fn(() => {});
// jest.mock('bull', () => {
//   Bull: () => mockBull
// });
// expect(mockBull).toBeCalledTimes(1);
// expect(mockBull).toBeCalled()

describe('Test base-consumer', () => {
  test('instance of', () => {
    jest.mock('bull', () => jest.fn());
    const queueName = 'test';
    const c = new BaseConsumerImpl(queueName);
    expect(c.getQueueName()).toBe(queueName);
  });
});
