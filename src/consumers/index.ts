import TestConsumer from "./test-consumer";

export const getConsumer = (queueName: string) => {
  switch (queueName) {
    case 'test':
      return new TestConsumer(queueName)

    default:
      return;
  }
}
