import type BaseConsumer from "./base-consumer";
import SampleBusiness from "./sample-business";

type BusinessContructor = (queueName: string) => BaseConsumer;

export const consumers: Record<string, BusinessContructor | undefined> = {
  'sample': (queueName: string) => new SampleBusiness(queueName)
}
